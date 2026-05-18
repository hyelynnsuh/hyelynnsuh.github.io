import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { Reveal } from '../motion/Reveal.jsx'

function PrincipleRow({ id, title, insight, principle, index }) {
	return (
		<Reveal delay={index * 0.03} className="cs-principle-row">
			<span className="cs-principle-row__id">{id}</span>
			<h3 className="cs-principle-row__title">{title}</h3>
			<p className="cs-principle-row__body">{insight}</p>
			<p className="cs-principle-row__rule">{principle}</p>
		</Reveal>
	)
}

/**
 * Operating principles for AI-mediated workflows — register layout, not feature cards.
 */
export function InsightCards({ label, title, lead, cards }) {
	return (
		<Section id="operating-principles" spacing="default">
			<Container>
				<EditorialHeading label={label} title={title} lead={lead} />
				<div className="mt-10 border border-cs-line bg-cs-paper px-4 sm:px-6" role="list">
					{cards.map((card, index) => (
						<PrincipleRow
							key={card.title}
							id={card.id ?? `PR-${String(index + 1).padStart(2, '0')}`}
							{...card}
							index={index}
						/>
					))}
				</div>
			</Container>
		</Section>
	)
}
