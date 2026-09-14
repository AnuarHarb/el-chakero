import { CANAL_WHATSAPP } from "@/lib/site";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function EnlaceCanal({ children, className }: Props) {
  return (
    <a
      className={className}
      href={CANAL_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
