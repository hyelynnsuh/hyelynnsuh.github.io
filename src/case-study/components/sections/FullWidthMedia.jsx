import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { PlaceholderMedia } from '../shared/PlaceholderMedia.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * Full-width interface artifact with documentation header.
 */
export function FullWidthMedia({
	refId,
	label,
	aspect = 'wide',
	spacing = 'tight',
}) {
	return (
		<Section spacing={spacing} className="!py-6 sm:!py-8">
			<Container>
				<Reveal>
					<figure className="cs-artifact m-0">
						<figcaption className="cs-artifact__header">
							<span>{refId ?? 'Artifact'}</span>
							<span className="text-cs-subtle">Interface specimen</span>
						</figcaption>
						<PlaceholderMedia
							label={label}
							aspect={aspect}
							className="border-0 bg-transparent bg-none"
						/>
					</figure>
				</Reveal>
			</Container>
		</Section>
	)
}
