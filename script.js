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

	// SCROLL UP 1200PX 
	const slideUpButton = document.getElementById('slideUp')
	const targetSection = document.querySelector('.super-turn')

	slideUpButton.addEventListener('click', () => {
		targetSection.scrollIntoView({
			behavior: 'smooth'
		})
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


// PROGRESS BAR SCROLL
const scrollProgress = document.getElementById('scroll-progress')
const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

window.addEventListener('scroll', () => {
	const scrollUp = document.body.scrollUp || document.documentElement.scrollUp
	scrollProgress.style.width = '${(scrollUp / height) * 100}%'
})


// SLIDESHOW
let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
	showSlides(slideIndex += n)
}

function currentSlide(n) {
	showSlides(slideIndex = n)
}

function showSlides(n) {
	let i
	let slides = document.getElementsByClassName('user-slide')
	let dots = document.getElementsByClassName('dot')
	if (n > slides.length) {
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none'
		dots[i].className = dots[i].className.replace(' active', '')
	}
	slides[slideIndex-1].style.display = 'block'
	dots[slideIndex-1].className += ' active'
}


// HIFI SLIDESHOW
let hifiIndex = 1
showHifi(hifiIndex)

function plusHifi(n) {
	showHifi(hifiIndex += n)
}

function currentHifiSlide(n) {
	showHifi(hifiIndex = n)
}

function showHifi(n) {
	let i
	let hifi = document.getElementsByClassName('hifi-slide')
	let hifidots = document.getElementsByClassName('hifi-dots')
	if (n > hifi.length) {
		hifiIndex = 1
	}
	if (n < 1) {
		hifiIndex = hifi.length
	}
	for (i = 0; i < hifi.length; i++) {
		hifi[i].style.display = 'none'
		hifidots[i].className = hifidots[i].className.replace(' active', '')
	}
	hifi[hifiIndex-1].style.display = 'block'
	dots[hifiIndex-1].className += ' active'
}
