import { BrandMark } from "@/components/layout/BrandMark";
import {
  footerExploreLinks,
  siteConfig,
  socialLinks,
} from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-border-glass bg-surface-deep hero-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-4">
            <BrandMark logoSize={48} />
            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {siteConfig.tagline}. The product studio of FED Society - built for
              founders who need to ship and grow.
            </p>
            <a
              href={siteConfig.fedMainUrl}
              className="inline-flex w-fit text-sm font-medium text-accent-orange hover:underline"
            >
              Visit main FED site →
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
                Explore
              </h4>
              <ul className="flex flex-col gap-2">
                {footerExploreLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
                Community
              </h4>
              <ul className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
                Get in touch
              </h4>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-glass pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            Made with care by FED Engineering · © {year} FED Society
          </p>
          <p className="text-xs text-text-muted/80">
            FED Labs · Product studio
          </p>
        </div>
      </div>
    </footer>
  );
}
