import { Container } from "./container";

const socialLinks = [
  { href: "https://instagram.com/bodyssnatchers", label: "Instagram" },
  { href: "https://behance.net/tanniasilva", label: "Behance" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface py-12">
      {/* Film strip decoration at the top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-2/20 to-transparent" />

      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-text-dim">
              <a
                href="mailto:hello@tanniasilva.com"
                className="transition-all duration-200 hover:text-accent-2 hover:underline hover:decoration-accent-2"
              >
                hello@tanniasilva.com
              </a>
            </p>
            <p className="text-sm text-text-dim">Santiago, Chile</p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-dim transition-all duration-200 hover:text-accent-2 hover:underline hover:decoration-accent-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="ornament-divider my-8">
          <span className="relative z-10 bg-surface px-4 text-xs tracking-widest text-text-dim">
            ◆
          </span>
        </div>

        <p className="credits text-center font-serif text-xs tracking-wider">
          © {new Date().getFullYear()} Tannia Silva · Todos los derechos
          reservados
        </p>
      </Container>
    </footer>
  );
}
