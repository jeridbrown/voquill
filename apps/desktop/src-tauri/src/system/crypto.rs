use base64::{engine::general_purpose, Engine as _};
use chacha20poly1305::{
    aead::{Aead, KeyInit, OsRng},
    ChaCha20Poly1305, Nonce,
};
use rand::RngCore;
use sha2::{Digest, Sha256};
use std::sync::OnceLock;

const SECRET_ENV: &str = "VOQUILL_API_KEY_SECRET";
const DEFAULT_SECRET: &str = "voquill-default-secret";
static RUNTIME_SECRET: OnceLock<Vec<u8>> = OnceLock::new();
static LOGGED_FALLBACK: OnceLock<()> = OnceLock::new();

const SALT_SIZE: usize = 16;
const NONCE_SIZE: usize = 12;

pub struct ProtectedApiKey {
    pub salt_b64: String,
    pub hash_b64: String,
    pub ciphertext_b64: String,
    pub key_suffix: Option<String>,
}

pub fn runtime_secret() -> &'static [u8] {
    RUNTIME_SECRET
        .get_or_init(|| match std::env::var(SECRET_ENV) {
            Ok(value) if !value.is_empty() => value.into_bytes(),
            _ => {
                LOGGED_FALLBACK.get_or_init(|| {
                    eprintln!(
                        "{SECRET_ENV} not set; falling back to default secret. Set this \
                         environment variable to secure stored API keys."
                    );
                });
                DEFAULT_SECRET.as_bytes().to_vec()
            }
        })
        .as_slice()
}

pub fn protect_api_key(key: &str) -> ProtectedApiKey {
    let secret = runtime_secret();
    let salt = generate_salt();
    let salt_b64 = general_purpose::STANDARD.encode(salt);
    let hash = hash_key(secret, &salt, key.as_bytes());
    let ciphertext = encrypt_key(secret, &salt, key.as_bytes());

    ProtectedApiKey {
        salt_b64,
        hash_b64: general_purpose::STANDARD.encode(hash),
        ciphertext_b64: general_purpose::STANDARD.encode(ciphertext),
        key_suffix: compute_key_suffix(key),
    }
}

pub fn reveal_api_key(salt_b64: &str, ciphertext_b64: &str) -> Result<String, CryptoError> {
    let salt = general_purpose::STANDARD
        .decode(salt_b64)
        .map_err(|err| CryptoError::Base64(err.to_string()))?;
    let ciphertext = general_purpose::STANDARD
        .decode(ciphertext_b64)
        .map_err(|err| CryptoError::Base64(err.to_string()))?;

    if salt.len() != SALT_SIZE {
        return Err(CryptoError::InvalidData("Invalid salt length".to_string()));
    }

    let secret = runtime_secret();
    let plaintext = decrypt_key(secret, &salt, &ciphertext)?;
    String::from_utf8(plaintext).map_err(|err| CryptoError::InvalidUtf8(err.to_string()))
}

#[derive(Debug, thiserror::Error)]
pub enum CryptoError {
    #[error("invalid base64 data: {0}")]
    Base64(String),
    #[error("stored API key is not valid UTF-8: {0}")]
    InvalidUtf8(String),
    #[error("decryption failed: {0}")]
    DecryptionFailed(String),
    #[error("invalid data: {0}")]
    InvalidData(String),
}

fn generate_salt() -> [u8; SALT_SIZE] {
    let mut salt = [0u8; SALT_SIZE];
    OsRng.fill_bytes(&mut salt);
    salt
}

fn hash_key(secret: &[u8], salt: &[u8], key: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(secret);
    hasher.update(salt);
    hasher.update(key);
    hasher.finalize().into()
}

fn derive_encryption_key(secret: &[u8], salt: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(b"voquill-encryption-key-v1");
    hasher.update(secret);
    hasher.update(salt);
    hasher.finalize().into()
}

fn encrypt_key(secret: &[u8], salt: &[u8], plaintext: &[u8]) -> Vec<u8> {
    let encryption_key = derive_encryption_key(secret, salt);
    let cipher = ChaCha20Poly1305::new(&encryption_key.into());

    let mut nonce_bytes = [0u8; NONCE_SIZE];
    OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = Nonce::from_slice(&nonce_bytes);

    let ciphertext = cipher
        .encrypt(nonce, plaintext)
        .expect("encryption should not fail");

    let mut result = Vec::with_capacity(NONCE_SIZE + ciphertext.len());
    result.extend_from_slice(&nonce_bytes);
    result.extend_from_slice(&ciphertext);
    result
}

fn decrypt_key(secret: &[u8], salt: &[u8], data: &[u8]) -> Result<Vec<u8>, CryptoError> {
    if data.len() < NONCE_SIZE {
        return Err(CryptoError::InvalidData(
            "Ciphertext too short".to_string(),
        ));
    }

    let (nonce_bytes, ciphertext) = data.split_at(NONCE_SIZE);
    let nonce = Nonce::from_slice(nonce_bytes);

    let encryption_key = derive_encryption_key(secret, salt);
    let cipher = ChaCha20Poly1305::new(&encryption_key.into());

    cipher
        .decrypt(nonce, ciphertext)
        .map_err(|err| CryptoError::DecryptionFailed(err.to_string()))
}

fn compute_key_suffix(key: &str) -> Option<String> {
    let mut chars = key.chars();
    let mut buffer = Vec::new();

    while let Some(ch) = chars.next_back() {
        buffer.push(ch);
        if buffer.len() == 4 {
            break;
        }
    }

    if buffer.is_empty() {
        None
    } else {
        buffer.reverse();
        Some(buffer.into_iter().collect())
    }
}
