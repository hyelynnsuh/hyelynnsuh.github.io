import { Container } from '../layout/Container.jsx'
import { MetadataGrid } from '../shared/MetadataGrid.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * Document front matter — system / project record, not marketing hero.
 */
export function Hero({
	docId,
	docType,
	status,
	title,
	description,
	positioning,
	metadata,
}) {
	return (
		<header className="border-b border-cs-line bg-cs-paper">
			<Container className="py-10 sm:py-12">
				<Reveal>
					<div className="mb-6 flex flex-wrap items-center gap-3">
						{docType ? <p className="cs-kicker">{docType}</p> : null}
						{status ? <span className="cs-status">{status}</span> : null}
						{docId ? <span className="cs-ref">{docId}</span> : null}
					</div>
					<h1 className="cs-doc-title max-w-3xl">{title}</h1>
					<p className="mt-5 max-w-2xl cs-doc-lead">{description}</p>
					{positioning ? (
						<p className="mt-6 max-w-xl border-l-2 border-cs-line-strong pl-3 cs-spec-body text-cs-ink">
							{positioning}
						</p>
					) : null}
				</Reveal>
				<Reveal className="mt-10" delay={0.06}>
					<MetadataGrid items={metadata} caption="Project record" />
				</Reveal>
			</Container>
		</header>
	)
}
