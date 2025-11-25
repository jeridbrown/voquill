import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-4 min-h-full pb-8 md:pb-16">
      <div className="p-4 sm:p-8 shadow-xl rounded-lg border bg-card w-full md:w-[520px] max-w-full overflow-hidden">
        <LoginForm />
      </div>
    </div>
  );
}
