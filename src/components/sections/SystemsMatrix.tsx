import type { Matrix } from "@/types/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatrixGrid } from "./MatrixGrid";

export function SystemsMatrix({ matrix }: { matrix: Matrix }) {
  return (
    <section id="matrix" aria-labelledby="matrix-title" className="py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          id="matrix"
          marker={matrix.marker}
          eyebrow={matrix.eyebrow}
          title={matrix.title}
          description={matrix.description}
        />
        <Reveal className="mt-12 md:mt-16">
          <MatrixGrid matrix={matrix} />
        </Reveal>
      </div>
    </section>
  );
}
