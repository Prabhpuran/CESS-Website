import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { externalFormUrl } from "@/lib/content";

export function EventRegistrationAction({
  url,
  className,
}: {
  url?: string;
  className?: string;
}) {
  const destination = externalFormUrl(url);
  if (!destination) return null;

  return (
    <Button asChild className={className}>
      <a href={destination} target="_blank" rel="noopener noreferrer">
        Register via Google Form
        <ArrowUpRight />
      </a>
    </Button>
  );
}
