/**
 * Site entry — global CSS layers + shared behavior.
 */
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/motion.css'

import { initMotion } from './utils/motion.js'

initMotion()

/**
 * Global scripts — guarded so pages without slideshow/progress/nav bits do not throw.
 */

document.addEventListener('DOMContentLoaded', function () {
	const navbar = document.querySelector('.navbar')
	if (navbar) {
		let lastScrollTop = 0
		window.addEventListener('scroll', function () {
			const scrollTop = window.scrollY || document.documentElement.scrollTop
			if (scrollTop > lastScrollTop) {
				navbar.style.transform = 'translateY(-100%)'
			} else {
				navbar.style.transform = 'translateY(0)'
			}
			lastScrollTop = scrollTop
		})
	}

	const slideUpButton = document.getElementById('slideUp')
	const targetSection = document.querySelector('.super-turn')
	if (slideUpButton && targetSection) {
		slideUpButton.addEventListener('click', () => {
			targetSection.scrollIntoView({ behavior: 'smooth' })
		})
	}

	const scrollProgress = document.getElementById('scroll-progress')
	if (scrollProgress) {
		const updateProgress = () => {
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
			const scrollTop = window.scrollY || document.documentElement.scrollTop
			const pct = height > 0 ? (scrollTop / height) * 100 : 0
			scrollProgress.style.width = `${pct}%`
		}
		window.addEventListener('scroll', updateProgress, { passive: true })
		window.addEventListener('resize', updateProgress)
		updateProgress()
	}
})

// ——— Card stack (case study pages) ———
let expandedCard = null

function expandCard(card) {
	if (expandedCard === card) {
		card.classList.remove('expanded')
		expandedCard = null
		return
	}

	document.querySelectorAll('.card').forEach((c) => c.classList.remove('expanded'))

	card.classList.add('expanded')
	expandedCard = card
}

document.addEventListener('click', (event) => {
	if (!event.target.closest('.card')) {
		document.querySelectorAll('.card').forEach((c) => c.classList.remove('expanded'))
		expandedCard = null
	}
})

// ——— User research slideshow (BasketBuddies) ———
let slideIndex = 1

function plusSlides(n) {
	showSlides((slideIndex += n))
}

function currentSlide(n) {
	showSlides((slideIndex = n))
}

function showSlides(n) {
	const slides = document.getElementsByClassName('user-slide')
	const dots = document.getElementsByClassName('dot')
	if (!slides.length) return

	let i
	if (n > slides.length) slideIndex = 1
	if (n < 1) slideIndex = slides.length

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none'
		if (dots[i]) dots[i].className = dots[i].className.replace(' active', '')
	}
	const idx = slideIndex - 1
	slides[idx].style.display = 'block'
	if (dots[idx]) dots[idx].className += ' active'
}

document.addEventListener('DOMContentLoaded', function () {
	if (document.getElementsByClassName('user-slide').length) {
		showSlides(slideIndex)
	}
})

// ——— Hi-fi slideshow (BasketBuddies) ———
let hifiIndex = 1

function plusHifi(n) {
	showHifi((hifiIndex += n))
}

function currentHifiSlide(n) {
	showHifi((hifiIndex = n))
}

function showHifi(n) {
	const hifi = document.getElementsByClassName('hifi-slide')
	const hifidots = document.getElementsByClassName('hifi-dots')
	if (!hifi.length) return

	let i
	if (n > hifi.length) hifiIndex = 1
	if (n < 1) hifiIndex = hifi.length

	for (i = 0; i < hifi.length; i++) {
		hifi[i].style.display = 'none'
		if (hifidots[i]) hifidots[i].className = hifidots[i].className.replace(' active', '')
	}
	const idx = hifiIndex - 1
	hifi[idx].style.display = 'block'
	if (hifidots[idx]) hifidots[idx].className += ' active'
}

document.addEventListener('DOMContentLoaded', function () {
	if (document.getElementsByClassName('hifi-slide').length) {
		showHifi(hifiIndex)
	}
})

Object.assign(window, {
	expandCard,
	plusSlides,
	currentSlide,
	plusHifi,
	currentHifiSlide,
})
