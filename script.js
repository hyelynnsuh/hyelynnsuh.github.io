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


//CARD STACK
let expandedCard = null
	
function expandCard(card) {
	if (expandedCard === card) {
		card.classList.remove('expanded')
		expandedCard = null
		return
	}

	document.querySelectorAll('.card').forEach(c => c.classList.remove('expanded'))

	card.classList.add('expanded')
	expandedCard = card
}

document.addEventListener('click', (event) => {
	if (!event.target.closest('.card')) {
		document.querySelectorAll('.card').forEach(c => c.classList.remove('expanded'))
		expandedCard = null
	}
})



