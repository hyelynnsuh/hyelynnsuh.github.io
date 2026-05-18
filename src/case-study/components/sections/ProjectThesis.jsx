import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { TagChip } from '../shared/TagChip.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/** Scope section — domain tags replace section kicker; title + narrative follow. */
export function ProjectThesis({ title, narrative, tags = [] }) {
	const paragraphs = Array.isArray(narrative) ? narrative : [narrative]

	return (
		<Section id="scope" ariaLabelledby="scope-heading" spacing="default">
			<Container>
				{tags.length > 0 ? (
					<Reveal className="mb-5 flex flex-wrap gap-2">
						{tags.map((tag) => (
							<TagChip key={tag}>{tag}</TagChip>
						))}
					</Reveal>
				) : null}
				<EditorialHeading title={title} titleId="scope-heading" />
				<Reveal className="mt-8 max-w-2xl space-y-5" delay={0.04}>
					{paragraphs.map((paragraph, index) => (
						<p key={index} className="cs-body">
							{paragraph}
						</p>
					))}
				</Reveal>
			</Container>
		</Section>
	)
}
