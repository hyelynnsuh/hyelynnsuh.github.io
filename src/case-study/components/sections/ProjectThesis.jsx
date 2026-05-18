import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { TagChip } from '../shared/TagChip.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/** Problem definition / scope — not a marketing thesis block. */
export function ProjectThesis({ label, title, narrative, tags = [] }) {
	return (
		<Section id="scope" ariaLabelledby="scope-heading" spacing="default">
			<Container>
				<EditorialHeading label={label} title={title} titleId="scope-heading" />
				<Reveal className="mt-8 max-w-2xl" delay={0.04}>
					<p className="cs-body">{narrative}</p>
				</Reveal>
				{tags.length > 0 ? (
					<Reveal className="mt-6 flex flex-wrap gap-2" delay={0.08}>
						<span className="sr-only">System domains</span>
						{tags.map((tag) => (
							<TagChip key={tag}>{tag}</TagChip>
						))}
					</Reveal>
				) : null}
			</Container>
		</Section>
	)
}
