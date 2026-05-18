/**
 * Vertical rhythm wrapper for narrative blocks.
 */
export function Section({
	id,
	children,
	className = '',
	spacing = 'default',
	ariaLabelledby,
}) {
	const spacingClass =
		spacing === 'tight'
			? 'py-8 sm:py-10'
			: spacing === 'loose'
				? 'py-[var(--spacing-cs-section-lg)]'
				: 'py-[var(--spacing-cs-section)]'

	return (
		<section
			id={id}
			className={`${spacingClass} ${className}`.trim()}
			aria-labelledby={ariaLabelledby}
		>
			{children}
		</section>
	)
}
