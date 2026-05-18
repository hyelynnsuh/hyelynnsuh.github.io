import { Container } from '../layout/Container.jsx'
import { MetadataGrid } from '../shared/MetadataGrid.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * Document front matter — system / project record, not marketing hero.
 */
export function Hero({ title, description, metadata }) {
	return (
		<header className="border-b border-cs-line bg-cs-paper">
			<Container className="py-8 sm:py-12">
				<Reveal>
					<h1 className="cs-doc-title max-w-3xl">{title}</h1>
					<p className="mt-5 max-w-2xl cs-doc-lead">{description}</p>
				</Reveal>
				<Reveal className="mt-8 sm:mt-10" delay={0.06}>
					<MetadataGrid items={metadata} />
				</Reveal>
			</Container>
		</header>
	)
}
