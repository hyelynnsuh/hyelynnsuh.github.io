/**
 * Site-wide nav — matches templates/case-study.html and other portfolio pages.
 * Paths assume HTML entry lives under /projects/.
 */
export function PortfolioNavbar({
	homeHref = '../index.html',
	workHref = '../index.html#product-design',
	playgroundHref = '../pages/playground.html',
	aboutHref = '../pages/about.html',
}) {
	return (
		<div className="portfolio-chrome">
		<header className="navbar">
			<a href={homeHref} className="logo" aria-label="Hye Lynn Suh — home">
				<img src="/assets/black-logo.gif" alt="" width="120" height="36" />
			</a>
			<input className="side-menu" type="checkbox" id="side-menu" aria-controls="site-nav" />
			<label className="hamb" htmlFor="side-menu">
				<span className="visually-hidden">Open menu</span>
				<span className="hamb-line" aria-hidden="true" />
			</label>
			<nav className="nav" id="site-nav" aria-label="Primary">
				<ul className="menu">
					<li>
						<a href={workHref}>work</a>
					</li>
					<li>
						<a href={playgroundHref}>playground</a>
					</li>
					<li>
						<a href={aboutHref}>about</a>
					</li>
				</ul>
			</nav>
		</header>
		</div>
	)
}
