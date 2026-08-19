import { socialLinks } from "@/data/social";

interface SocialIconsProps {
  className?: string;
  size?: number;
}

export default function SocialIcons({ className, size = 20 }: SocialIconsProps) {
  return (
    <ul className={`flex items-center gap-4 ${className ?? ""}`}>
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="block text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
