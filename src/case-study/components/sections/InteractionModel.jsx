import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { Reveal } from '../motion/Reveal.jsx'
import { InteractionPatternRow } from './InteractionPatternRow.jsx'

/**
 * Interaction model — systems document layout (balanced media + specification).
 */
export function InteractionModel({ label, title, lead, rows }) {
	return (
		<Section
			id="interaction-model"
			spacing="loose"
			className="interaction-model"
			ariaLabelledby="interaction-heading"
		>
			<Container>
				<header className="interaction-model__intro max-w-2xl">
					<Reveal>
						{label ? <p className="cs-label mb-5">{label}</p> : null}
						<h2 id="interaction-heading" className="cs-section-title text-[clamp(1.5rem,3.2vw,2.25rem)]">
							{title}
						</h2>
						{lead ? <p className="cs-spec-lead mt-6">{lead}</p> : null}
					</Reveal>
				</header>

				<div className="interaction-model__patterns" role="list">
					{rows.map((row, index) => (
						<InteractionPatternRow
							key={row.title}
							index={index}
							reversed={index % 2 === 1}
							{...row}
						/>
					))}
				</div>
			</Container>
		</Section>
	)
}
