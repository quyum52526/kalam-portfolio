export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Kalam. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="mailto:hello@example.com" className="hover:opacity-70">
            Email
          </a>
          <a href="#" className="hover:opacity-70">
            Instagram
          </a>
          <a href="#" className="hover:opacity-70">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
