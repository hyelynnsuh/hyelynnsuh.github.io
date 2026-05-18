import { PlaceholderMedia } from '../shared/PlaceholderMedia.jsx'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * Image + explanation row. Alternates layout when `reversed` is true.
 */
export function FeatureRow({ title, body, mediaLabel, reversed = false, index = 0 }) {
	return (
		<article className="cs-grid-12 items-center gap-y-8 border-t border-cs-line py-14 first:border-t-0 first:pt-0 sm:py-16">
			<Reveal
				delay={index * 0.04}
				className={`lg:col-span-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
			>
				<PlaceholderMedia label={mediaLabel} aspect="video" />
			</Reveal>
			<Reveal
				delay={index * 0.04 + 0.05}
				className={`flex flex-col justify-center lg:col-span-6 lg:sticky lg:top-28 lg:self-start ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
			>
				<h3 className="text-xl font-semibold tracking-[-0.02em] text-cs-ink sm:text-2xl">{title}</h3>
				<p className="mt-4 cs-body">{body}</p>
			</Reveal>
		</article>
	)
}
