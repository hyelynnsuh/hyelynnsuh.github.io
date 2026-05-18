import { PlaceholderMedia } from './PlaceholderMedia.jsx'

const POSITION_CLASS = {
	'top-left': 'top-[12%] left-[10%] items-start text-left',
	'top-right': 'top-[12%] right-[10%] items-end text-right',
	'bottom-left': 'bottom-[12%] left-[10%] items-start text-left',
	'bottom-right': 'bottom-[14%] right-[10%] items-end text-right',
	'center-left': 'top-1/2 left-[8%] -translate-y-1/2 items-start text-left',
	'center-right': 'top-1/2 right-[8%] -translate-y-1/2 items-end text-right',
}

/**
 * Media block with optional specification callouts (interaction systems doc).
 *
 * @param {{ label: string, aspect?: string, caption?: string, annotations?: Array<{ label: string, position?: keyof typeof POSITION_CLASS, detail?: string }> }} props
 */
export function AnnotatedMedia({ label, aspect = 'landscape', caption, annotations = [] }) {
	return (
		<figure className="m-0">
			<div className="relative bg-cs-surface">
				<PlaceholderMedia
					label={label}
					aspect={aspect}
					className="border-0 bg-cs-placeholder"
				/>
				{annotations.length > 0 ? (
					<ul className="pointer-events-none absolute inset-0" aria-hidden="true">
						{annotations.map((item) => {
							const pos = item.position ?? 'top-left'
							const posClass = POSITION_CLASS[pos] ?? POSITION_CLASS['top-left']
							return (
								<li
									key={`${item.label}-${pos}`}
									className={`absolute flex max-w-[9rem] flex-col gap-1 sm:max-w-[10.5rem] ${posClass}`}
								>
									<span className="cs-annotation">{item.label}</span>
									{item.detail ? (
										<span className="cs-annotation-detail">{item.detail}</span>
									) : null}
								</li>
							)
						})}
					</ul>
				) : null}
			</div>
			{caption ? <figcaption className="cs-figure-caption">{caption}</figcaption> : null}
		</figure>
	)
}
