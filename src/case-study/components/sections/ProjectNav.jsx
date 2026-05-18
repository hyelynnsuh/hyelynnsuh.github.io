import { Container } from '../layout/Container.jsx'

function DocNavLink({ direction, title, href, refId }) {
	const label = direction === 'prev' ? 'Previous document' : 'Next document'
	return (
		<a href={href} className="cs-doc-nav__link">
			<span className="cs-kicker">
				{label}
				{refId ? ` · ${refId}` : ''}
			</span>
			<span className="cs-doc-nav__title">{title}</span>
		</a>
	)
}

export function ProjectNav({ previous, next }) {
	return (
		<footer className="border-t border-cs-line bg-cs-surface py-12 sm:py-14">
			<Container>
				<p className="cs-kicker mb-4">Document index</p>
				<div className="grid gap-3 sm:grid-cols-2">
					<DocNavLink direction="prev" {...previous} />
					<DocNavLink direction="next" {...next} />
				</div>
			</Container>
		</footer>
	)
}
