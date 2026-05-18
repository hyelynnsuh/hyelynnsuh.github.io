/**
 * Interface specimen placeholder — wireframe artifact, not portfolio imagery.
 */
export function PlaceholderMedia({
	label = 'Interface specimen',
	aspect = 'video',
	className = '',
	showLabel = true,
}) {
	const aspectClass =
		aspect === 'square'
			? 'aspect-square'
			: aspect === 'portrait'
				? 'aspect-[3/4]'
				: aspect === 'wide'
					? 'aspect-[21/9]'
					: aspect === 'landscape'
						? 'aspect-[4/3]'
						: aspect === 'card'
							? 'aspect-[331/236]'
							: 'aspect-video'

	return (
		<div
			className={`relative flex items-center justify-center bg-cs-placeholder ${showLabel ? 'border border-cs-line bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-size-[12px_12px]' : ''} ${aspectClass} ${className}`.trim()}
			role="img"
			aria-label={label}
		>
			{showLabel ? (
				<span className="max-w-[16rem] border border-cs-line bg-cs-paper/90 px-3 py-2 text-center font-body text-[0.625rem] font-normal leading-relaxed text-cs-muted">
					{label}
				</span>
			) : null}
		</div>
	)
}
