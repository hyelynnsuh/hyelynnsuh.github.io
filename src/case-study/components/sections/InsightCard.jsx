import { PlaceholderMedia } from '../shared/PlaceholderMedia.jsx'
import { TagChip } from '../shared/TagChip.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * Operating principle card — image specimen, title, tag pills (Figma layout).
 */
export function InsightCard({
	title,
	tags = [],
	mediaLabel,
	imageSrc,
	imageAlt,
	index = 0,
}) {
	const ariaLabel = mediaLabel ?? `${title} — interface specimen`

	return (
		<Reveal delay={index * 0.05} className="h-full">
			<article className="cs-insight-card">
			<div className="cs-insight-card__media">
				{imageSrc ? (
					<img
						src={imageSrc}
						alt={imageAlt ?? ariaLabel}
						className="cs-insight-card__img"
					/>
				) : (
					<PlaceholderMedia
						label={ariaLabel}
						aspect="card"
						showLabel={false}
						className="cs-insight-card__placeholder !border-0"
					/>
				)}
			</div>
			<div className="cs-insight-card__body">
				<h3 className="cs-insight-card__title">{title}</h3>
				{tags.length > 0 ? (
					<ul className="cs-insight-card__tags">
						{tags.map((tag) => (
							<li key={tag}>
								<TagChip variant="insight">{tag}</TagChip>
							</li>
						))}
					</ul>
				) : null}
			</div>
			</article>
		</Reveal>
	)
}
