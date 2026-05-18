import { Reveal } from '../motion/Reveal.jsx'

/** Section heading for product / interaction documentation. */
export function EditorialHeading({ label, title, lead, titleId, className = '' }) {
	return (
		<Reveal className={`max-w-2xl ${className}`.trim()}>
			{label ? <p className="cs-kicker mb-3">{label}</p> : null}
			{title ? (
				<h2 id={titleId} className="cs-section-title">
					{title}
				</h2>
			) : null}
			{lead ? <p className="cs-spec-lead mt-4">{lead}</p> : null}
		</Reveal>
	)
}
