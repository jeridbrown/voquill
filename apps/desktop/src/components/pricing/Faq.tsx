import { FormattedMessage } from "react-intl";
import { AccordionItem } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils/cn";

export type FaqProps = {
  className?: string;
};

export const Faq = ({ className }: FaqProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className={cn("flex flex-col items-stretch p-8 gap-4 max-w-[800px]", className)}>
        <Badge variant="secondary" className="self-center">
          <FormattedMessage defaultMessage="FAQ" />
        </Badge>
        <h2 className="text-2xl font-bold mb-4 text-center">
          <FormattedMessage defaultMessage="Frequently asked questions" />
        </h2>
        <AccordionItem
          title={
            <FormattedMessage defaultMessage="How does the voice activation work?" />
          }
        >
          <FormattedMessage defaultMessage="Simply click the microphone bubble that appears in any text input field. Start speaking and watch as your voice is converted to text in real-time." />
        </AccordionItem>
        <AccordionItem
          title={
            <FormattedMessage defaultMessage="What websites does it work on?" />
          }
        >
          <FormattedMessage defaultMessage="Voquill works on virtually any website with text input fields - email clients, social media, forms, documents, and more." />
        </AccordionItem>
        <AccordionItem
          title={
            <FormattedMessage defaultMessage="Is my voice data secure?" />
          }
        >
          <FormattedMessage defaultMessage="Absolutely. Our code is open-source, so you can see for yourself. You can even choose to process your voice entirely on-device." />
        </AccordionItem>
      </div>
    </div>
  );
};
