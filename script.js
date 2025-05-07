document.addEventListener('DOMContentLoaded', function () {
	
	// SCROLL NAVBAR
	let lastScrollTop = 0
	const navbar = document.querySelector('.navbar')

	window.addEventListener('scroll', function () {
		let scrollTop = window.scrollY || document.documentElement.scrollTop
		
		if (scrollTop > lastScrollTop) {
			navbar.style.transform = 'translateY(-100%)'
		} else {
			navbar.style.transform = 'translateY(0)'
		}

		lastScrollTop = scrollTop
	})
})


