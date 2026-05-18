import { scroll, motionValue, springValue } from 'motion'

import { getVisibleWorkItemsByCategory } from './data/workItems.js'

const LAYER_PATTERNS = [
	{ x: -30, y: 24, z: 32, tiltY: 1.2, tiltX: -0.35, tiltZ: -1.8, scale: 0.06 },
	{ x: -8, y: 10, z: 20, tiltY: 0.3, tiltX: -0.1, tiltZ: -0.9, scale: 0.035 },
	{ x: 10, y: 0, z: 10, tiltY: -0.2, tiltX: 0.1, tiltZ: -0.25, scale: 0.02 },
	{ x: 24, y: -12, z: 0, tiltY: 0.25, tiltX: 0.05, tiltZ: 0.4, scale: 0.01 },
	{ x: 40, y: -26, z: -10, tiltY: -0.45, tiltX: -0.15, tiltZ: 0.8, scale: -0.005 },
	{ x: 56, y: -40, z: -20, tiltY: 0.15, tiltX: -0.25, tiltZ: 1.2, scale: -0.02 },
]

/**
 * Layered 3D work gallery — used on the playground page for motion / photo / video pieces.
 *
 * @param {{ trackId?: string, category?: string }} [options]
 */
export function initWorkGallery(options = {}) {
	const { trackId = 'playground-gallery-track', category = 'playground' } = options
	const track = document.getElementById(trackId)
	if (!track) return

	const items = getVisibleWorkItemsByCategory(category)
	const frag = document.createDocumentFragment()

	for (let i = 0; i < items.length; i++) {
		frag.appendChild(createWorkCard(items[i], i))
	}

	track.appendChild(frag)

	track.querySelectorAll('video.work-gallery__cover--video').forEach((v) => {
		v.play().catch(() => {})
	})

	attachWorkGalleryScrollVelocity(track)
}

function attachWorkGalleryScrollVelocity(track) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	const rawVelY = motionValue(0)
	const smoothVelY = springValue(rawVelY, {
		stiffness: 320,
		damping: 34,
		mass: 0.55,
	})

	const maxTiltY = 5.5
	const maxTiltX = 2.2
	const maxLift = 7
	const vToDeg = 0.017
	const vToPx = 0.011

	const apply = (/** @type {number} */ v) => {
		const tiltY = Math.max(-maxTiltY, Math.min(maxTiltY, v * vToDeg))
		const tiltX = Math.max(-maxTiltX, Math.min(maxTiltX, v * vToDeg * 0.38))
		const lift = Math.max(-maxLift, Math.min(maxLift, v * vToPx))
		track.style.setProperty('--wg-vel-tilt-y', `${tiltY}deg`)
		track.style.setProperty('--wg-vel-tilt-x', `${tiltX}deg`)
		track.style.setProperty('--wg-vel-lift', `${lift}px`)
	}

	const unsubSpring = smoothVelY.on('change', apply)

	const cancelScroll = scroll((_progress, info) => {
		rawVelY.set(info.y.velocity)
	})

	window.addEventListener(
		'pagehide',
		() => {
			cancelScroll()
			unsubSpring()
		},
		{ once: true }
	)
}

function createWorkCard(item, index) {
	const isMedia = item.kind === 'media'
	const layerPattern = LAYER_PATTERNS[index % LAYER_PATTERNS.length]
	const el = document.createElement(isMedia ? 'button' : 'a')
	el.className = isMedia
		? 'work-gallery__card work-gallery__card--media'
		: 'work-gallery__card work-gallery__card--link'
	el.style.setProperty('--i', String(index))
	el.style.setProperty('--wg-layer-nudge-x', `${layerPattern.x}px`)
	el.style.setProperty('--wg-layer-nudge-y', `${layerPattern.y}px`)
	el.style.setProperty('--wg-layer-depth-offset', `${layerPattern.z}px`)
	el.style.setProperty('--wg-tilt-y', `${layerPattern.tiltY}deg`)
	el.style.setProperty('--wg-tilt-x', `${layerPattern.tiltX}deg`)
	el.style.setProperty('--wg-tilt-z', `${layerPattern.tiltZ}deg`)
	el.style.setProperty('--wg-scale-bias', String(layerPattern.scale))
	if (item.category) el.dataset.category = item.category

	if (!isMedia) {
		el.setAttribute('href', item.href ?? '#')
		if (item.externalTab) {
			el.setAttribute('target', '_blank')
			el.setAttribute('rel', 'noopener noreferrer')
		}
		const label = item.description ? `${item.title} — ${item.description}` : item.title
		el.setAttribute('aria-label', label)
	} else {
		el.setAttribute('type', 'button')
		el.setAttribute('aria-label', `${item.title} (preview opens in a later update)`)
	}

	const panel = document.createElement('span')
	panel.className = 'work-gallery__panel'

	const inner = document.createElement('span')
	inner.className = 'work-gallery__panel-inner'
	inner.setAttribute('aria-hidden', 'true')

	if (item.thumbKind === 'video') {
		const v = document.createElement('video')
		v.className = 'work-gallery__cover work-gallery__cover--video'
		v.src = item.thumb
		v.muted = true
		v.defaultMuted = true
		v.loop = true
		v.playsInline = true
		v.setAttribute('playsinline', '')
		v.preload = 'metadata'
		v.setAttribute('aria-hidden', 'true')
		inner.appendChild(v)
	} else {
		const img = document.createElement('img')
		img.className = 'work-gallery__cover'
		img.src = item.thumb
		img.alt = ''
		img.decoding = 'async'
		inner.appendChild(img)
	}

	panel.appendChild(inner)
	el.append(panel)

	return el
}
