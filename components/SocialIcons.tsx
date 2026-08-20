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
          {/* h-11 w-11 (44x44) is the real tappable area, icon centered inside at
              its original `size`; -m-3 cancels the added space in the margin box so
              the row's spacing looks the same as when this was a bare 20x20 icon. */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="-m-3 flex h-11 w-11 items-center justify-center text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
