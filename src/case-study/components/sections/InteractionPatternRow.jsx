import { AnnotatedMedia } from '../shared/AnnotatedMedia.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * One pattern in an interaction model — balanced media / specification columns.
 */
export function InteractionPatternRow({
	index,
	title,
	body,
	mediaLabel,
	mediaCaption,
	annotations,
	note,
	reversed = false,
}) {
	const indexLabel = String(index + 1).padStart(2, '0')

	const mediaColumn = (
		<div className="interaction-pattern__media lg:col-span-6">
			<Reveal delay={index * 0.03}>
				<AnnotatedMedia
					label={mediaLabel}
					aspect="landscape"
					caption={mediaCaption}
					annotations={annotations}
				/>
			</Reveal>
		</div>
	)

	const specColumn = (
		<div
			className={`interaction-pattern__spec lg:col-span-6 ${
				reversed ? 'interaction-pattern__spec--reversed' : ''
			}`}
		>
			<Reveal delay={index * 0.03 + 0.04}>
				<p className="cs-pattern-index" aria-hidden="true">
					{indexLabel}
				</p>
				<h3 id={`pattern-${indexLabel}`} className="cs-pattern-title">
					{title}
				</h3>
				<p className="cs-spec-body">{body}</p>
				{note ? <p className="cs-spec-note">{note}</p> : null}
			</Reveal>
		</div>
	)

	return (
		<article
			className="interaction-pattern"
			role="listitem"
			aria-labelledby={`pattern-${indexLabel}`}
		>
			<div className="interaction-pattern__rule" aria-hidden="true" />
			<div
				className={`interaction-pattern__grid cs-grid-12 ${reversed ? 'interaction-pattern__grid--reversed' : ''}`}
			>
				{reversed ? (
					<>
						{specColumn}
						{mediaColumn}
					</>
				) : (
					<>
						{mediaColumn}
						{specColumn}
					</>
				)}
			</div>
		</article>
	)
}
