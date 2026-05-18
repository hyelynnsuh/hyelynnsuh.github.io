/**
 * 12-column editorial grid (collapses to 4 on mobile).
 */
export function Grid({ children, className = '' }) {
	return <div className={`cs-grid-12 ${className}`.trim()}>{children}</div>
}
