import { pillars } from "@/lib/content";
import { TechCard } from "@/components/ui/TechCard";

export function Positioning() {
  return (
    <section
      id="about"
      className="border-t border-border-glass bg-page-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-text-muted">
            About FED Labs
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            The engineering arm of{" "}
            <span className="text-gradient">FED Society</span>
          </h2>
          <div className="section-heading-line mt-4" />
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            We are not a generic dev shop - we build for real founder communities,
            with live event data, real startups, and real execution constraints
            in mind.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <TechCard key={pillar.title} as="article" innerClassName="p-6">
              <h3 className="text-xl font-bold text-text-primary">
                {pillar.title}{" "}
                <span className="text-gradient">{pillar.highlight}</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {pillar.description}
              </p>
            </TechCard>
          ))}
        </div>
      </div>
    </section>
  );
}
