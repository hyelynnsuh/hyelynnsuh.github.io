export function Container({ children, className = '', as: Tag = 'div' }) {
	return <Tag className={`cs-container ${className}`.trim()}>{children}</Tag>
}
