/**
 * Portfolio nav chrome for React case studies (scoped CSS + scroll behavior).
 */
import './styles/portfolio-nav.css'

function initNavbarScroll() {
	const navbar = document.querySelector('.navbar')
	if (!navbar) return

	let lastScrollTop = 0
	window.addEventListener(
		'scroll',
		() => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop
			if (scrollTop > lastScrollTop) {
				navbar.style.transform = 'translateY(-100%)'
			} else {
				navbar.style.transform = 'translateY(0)'
			}
			lastScrollTop = scrollTop
		},
		{ passive: true }
	)
}

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initNavbarScroll)
	} else {
		initNavbarScroll()
	}
}
