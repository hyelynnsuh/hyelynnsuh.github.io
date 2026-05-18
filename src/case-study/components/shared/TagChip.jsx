export function TagChip({ children, variant = 'system' }) {
	const className = variant === 'insight' ? 'cs-insight-tag' : 'cs-system-tag'
	return <span className={className}>{children}</span>
}
