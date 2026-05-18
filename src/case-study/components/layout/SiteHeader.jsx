import { Container } from './Container.jsx'

/**
 * Documentation chrome — not portfolio marketing nav.
 */
export function SiteHeader({ docType = 'Interaction design documentation', docId }) {
	return (
		<header className="border-b border-cs-line bg-cs-paper">
			<Container className="flex flex-wrap items-center justify-between gap-3 py-3">
				<div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-body text-[0.8125rem] text-cs-muted">
					<a href="../index.html#product-design" className="text-cs-muted no-underline hover:text-cs-ink">
						Index
					</a>
					<span className="text-cs-line-strong" aria-hidden="true">
						/
					</span>
					<span className="truncate text-cs-ink">{docType}</span>
					{docId ? (
						<>
							<span className="text-cs-line-strong" aria-hidden="true">
								·
							</span>
							<span className="text-cs-subtle">{docId}</span>
						</>
					) : null}
				</div>
				<nav className="cs-kicker flex gap-4" aria-label="Document">
					<a href="#interaction-model" className="text-cs-muted no-underline hover:text-cs-ink">
						Interaction model
					</a>
					<a href="#outcomes" className="text-cs-muted no-underline hover:text-cs-ink">
						Outcomes
					</a>
				</nav>
			</Container>
		</header>
	)
}
