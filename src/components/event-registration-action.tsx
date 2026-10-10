import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { externalFormUrl } from "@/lib/content";

export function EventRegistrationAction({
  url,
  eventName,
  className,
}: {
  url?: string;
  eventName?: string;
  className?: string;
}) {
  const destination = externalFormUrl(url);
  if (!destination) return null;

  return (
    <Button asChild className={className}>
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={eventName ? `Register for ${eventName}` : "Register now"}
      >
        Register now
        <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  );
}
