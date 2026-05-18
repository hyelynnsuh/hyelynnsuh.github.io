import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { Reveal } from '../motion/Reveal.jsx'

function ConstraintRow({ id, title, tradeoff, index }) {
	return (
		<Reveal delay={index * 0.03} className="cs-constraint-row">
			<span className="cs-constraint-row__id">{id}</span>
			<p className="cs-constraint-row__name">{title}</p>
			<p className="cs-constraint-row__effect">{tradeoff}</p>
		</Reveal>
	)
}

/** Design constraint register — how limits shaped interaction architecture. */
export function ConstraintCards({ label, title, lead, items }) {
	return (
		<Section id="constraints" spacing="default">
			<Container>
				<EditorialHeading label={label} title={title} lead={lead} />
				<div className="mt-8 border border-cs-line bg-cs-paper px-3 py-1 sm:mt-10 sm:px-6" role="list">
					{items.map((item, index) => (
						<ConstraintRow
							key={item.title}
							id={item.id ?? `C-${String(index + 1).padStart(2, '0')}`}
							{...item}
							index={index}
						/>
					))}
				</div>
			</Container>
		</Section>
	)
}
