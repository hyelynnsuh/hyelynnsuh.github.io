import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { InsightCard } from './InsightCard.jsx'

/**
 * Operating principles — responsive card grid (Figma layout).
 */
export function InsightCards({ label, title, lead, cards }) {
	return (
		<Section id="operating-principles" spacing="default">
			<Container>
				<EditorialHeading label={label} title={title} lead={lead} />
				<div className="cs-insight-grid" role="list">
					{cards.map((card, index) => (
						<InsightCard key={card.title} {...card} index={index} />
					))}
				</div>
			</Container>
		</Section>
	)
}
