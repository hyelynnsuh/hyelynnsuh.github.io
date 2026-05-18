/**
 * Motion (https://motion.dev) — light UX polish; disabled when prefers-reduced-motion is set.
 */
import { animate, inView } from 'motion'

/** @type {[number, number, number, number]} */
const easeOut = [0.22, 1, 0.36, 1]

export function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function attachPointerMicroInteractions() {
	const targets = document.querySelectorAll(
		'a.project, button.enter, button#slideUp, .see-hifi, .jump-button'
	)

	targets.forEach((el) => {
		const animOpts = { duration: 0.2, ease: easeOut }

		el.addEventListener(
			'pointerenter',
			() => {
				animate(el, { scale: 1.012 }, animOpts)
			},
			{ passive: true }
		)

		el.addEventListener(
			'pointerleave',
			() => {
				animate(el, { scale: 1 }, animOpts)
			},
			{ passive: true }
		)

		el.addEventListener(
			'pointerdown',
			() => {
				animate(el, { scale: 0.994 }, { duration: 0.1, ease: easeOut })
			},
			{ passive: true }
		)

		el.addEventListener(
			'pointerup',
			() => {
				animate(el, { scale: 1.012 }, { duration: 0.15, ease: easeOut })
			},
			{ passive: true }
		)

		el.addEventListener(
			'pointercancel',
			() => {
				animate(el, { scale: 1 }, animOpts)
			},
			{ passive: true }
		)
	})
}

function runPageEntrance(main) {
	/* Opacity only on <main> so nested section transforms are not double-stacked */
	animate(main, { opacity: [0, 1] }, { duration: 0.4, ease: easeOut })
}

function runScrollReveals() {
	const revealOnce = (selector, yShift, opacityFrom) => {
		inView(
			selector,
			(el) => {
				if (el.dataset.motionReveal) return
				el.dataset.motionReveal = '1'
				animate(
					el,
					{ y: [yShift, 0], opacity: [opacityFrom, 1] },
					{ duration: 0.42, ease: easeOut }
				)
			},
			{ margin: '-12% 0px -10% 0px' }
		)
	}

	revealOnce('main section:not(#super-power)', 18, 0.94)
	revealOnce('main .content-flex', 14, 0.96)
}

export function initMotion() {
	if (prefersReducedMotion()) {
		document.documentElement.classList.add('motion-prefers-reduced')
		return
	}

	const start = () => {
		const main = document.querySelector('main')
		if (!main) return

		runPageEntrance(main)
		runScrollReveals()
		attachPointerMicroInteractions()
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start, { once: true })
	} else {
		start()
	}
}
