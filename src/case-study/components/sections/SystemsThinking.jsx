import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'
import { PlaceholderMedia } from '../shared/PlaceholderMedia.jsx'
import { Reveal } from '../motion/Reveal.jsx'

export function SystemsThinking({ label, title, lead, diagramLabel, diagramRef, points }) {
	return (
		<Section id="workflow-architecture" spacing="default">
			<Container>
				<div className="cs-grid-12 gap-y-8">
					<div className="lg:col-span-4">
						<EditorialHeading label={label} title={title} lead={lead} />
					</div>
					<div className="lg:col-span-8">
						<Reveal>
							<figure className="cs-architecture__diagram m-0">
								<figcaption className="cs-artifact__header">
									<span>{diagramRef ?? 'ARCH-01'}</span>
									<span>Workflow & logic diagram</span>
								</figcaption>
								<PlaceholderMedia
									label={diagramLabel}
									aspect="landscape"
									className="border-0 bg-transparent bg-none"
								/>
							</figure>
						</Reveal>
					</div>
					<div className="lg:col-span-12 lg:col-start-1">
						<div className="border border-cs-line bg-cs-paper px-4 py-2 sm:px-6">
							{points.map((point, index) => (
								<Reveal key={point.title} delay={index * 0.04} className="cs-architecture__point py-5">
									<div className="cs-grid-12 gap-y-2">
										<p className="cs-kicker lg:col-span-2">{point.label}</p>
										<h3 className="cs-subhead lg:col-span-3">{point.title}</h3>
										<p className="cs-body lg:col-span-7">{point.body}</p>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</Container>
		</Section>
	)
}
