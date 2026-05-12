import { getVisibleWorkItems } from './data/workItems.js'

/**
 * Work gallery — layered 3D stack (CSS perspective + translateZ), data-driven.
 * Scroll-driven motion can update `--wg-scroll-shift` / `--wg-parallax-depth` on `#work-gallery-track`.
 */
export function initHomeGallery() {
	const track = document.getElementById('work-gallery-track')
	if (!track) return

	const items = getVisibleWorkItems()
	const frag = document.createDocumentFragment()

	for (let i = 0; i < items.length; i++) {
		frag.appendChild(createWorkCard(items[i], i))
	}

	track.appendChild(frag)

	track.querySelectorAll('video.work-gallery__cover--video').forEach((v) => {
		v.play().catch(() => {})
	})
}

function createWorkCard(item, index) {
	const isMedia = item.kind === 'media'
	const el = document.createElement(isMedia ? 'button' : 'a')
	el.className = isMedia
		? 'work-gallery__card work-gallery__card--media'
		: 'work-gallery__card work-gallery__card--link'
	el.style.setProperty('--i', String(index))

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
	panel.setAttribute('aria-hidden', 'true')

	const inner = document.createElement('span')
	inner.className = 'work-gallery__panel-inner'

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

	const meta = document.createElement('span')
	meta.className = 'work-gallery__meta'

	const typesEl = document.createElement('span')
	typesEl.className = 'work-gallery__types'
	typesEl.textContent = item.types?.length ? item.types.join(' · ') : ''

	const titleEl = document.createElement('span')
	titleEl.className = 'work-gallery__title'
	titleEl.textContent = item.title

	meta.append(typesEl, titleEl)

	el.append(panel, meta)

	return el
}
