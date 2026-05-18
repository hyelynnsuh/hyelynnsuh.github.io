import { getVisibleWorkItemsByCategory } from './data/workItems.js'

/** @param {import('./data/workItems.js').WorkItem} item */
function workHref(item) {
	return item.href ?? '#'
}

/** @param {import('./data/workItems.js').WorkItem} item */
function opensInNewTab(item) {
	if (item.externalTab != null) return item.externalTab
	return item.kind === 'external'
}

/** @param {import('./data/workItems.js').WorkItem} item */
function linkLabel(item) {
	return item.description ? `${item.title} — ${item.description}` : item.title
}

/**
 * Homepage work sections — product case studies (list layout) and visual design (grid).
 */
export function initHomeWork() {
	initProductDesign()
	initVisualDesign()
}

function initProductDesign() {
	const list = document.getElementById('product-design-list')
	if (!list) return

	const items = getVisibleWorkItemsByCategory('product')
	const frag = document.createDocumentFragment()

	for (const item of items) {
		frag.appendChild(createCaseStudyRow(item))
	}

	list.appendChild(frag)
}

function initVisualDesign() {
	const grid = document.getElementById('visual-design-grid')
	if (!grid) return

	const items = getVisibleWorkItemsByCategory('visual')
	const frag = document.createDocumentFragment()

	for (const item of items) {
		frag.appendChild(createVisualProjectCard(item))
	}

	grid.appendChild(frag)
}

/** @param {import('./data/workItems.js').WorkItem} item */
function createCaseStudyRow(item) {
	const li = document.createElement('li')
	li.className = 'case-study'

	const link = document.createElement('a')
	link.className = 'case-study__link'
	link.href = workHref(item)
	link.setAttribute('aria-label', linkLabel(item))
	if (opensInNewTab(item)) {
		link.target = '_blank'
		link.rel = 'noopener noreferrer'
	}

	const thumb = document.createElement('img')
	thumb.className = 'case-study__thumb'
	if (item.id === 'posty') thumb.classList.add('case-study__thumb--posty')
	thumb.src = item.thumb
	thumb.alt = ''
	thumb.decoding = 'async'

	const body = document.createElement('div')
	body.className = 'case-study__body'

	const types = document.createElement('div')
	types.className = 'case-study__types'
	for (const type of item.types ?? []) {
		const tag = document.createElement('span')
		tag.className = 'case-study__type'
		tag.textContent = type
		types.appendChild(tag)
	}

	const title = document.createElement('h3')
	title.className = 'case-study__title'
	title.textContent = item.title

	body.append(types, title)
	if (item.description) {
		const desc = document.createElement('p')
		desc.className = 'case-study__desc'
		desc.textContent = item.description
		body.appendChild(desc)
	}

	link.append(thumb, body)
	li.appendChild(link)
	return li
}

/** @param {import('./data/workItems.js').WorkItem} item */
function createVisualProjectCard(item) {
	const li = document.createElement('li')
	li.className = 'visual-project'

	const link = document.createElement('a')
	link.className = 'project'
	link.href = workHref(item)
	link.setAttribute('aria-label', linkLabel(item))
	if (opensInNewTab(item)) {
		link.target = '_blank'
		link.rel = 'noopener noreferrer'
	}

	const img = document.createElement('img')
	img.className = 'pre-cover'
	if (item.id === 'gasp-spotify-zine') {
		img.id = 'spotify'
	}
	img.src = item.thumb
	img.alt = ''

	const preview = document.createElement('div')
	preview.className = 'proj-preview'

	const typesWrap = document.createElement('div')
	typesWrap.className = item.types && item.types.length > 1 ? 'mult-types' : ''
	for (const type of item.types ?? []) {
		const tag = document.createElement('p')
		tag.className = 'proj-type'
		tag.textContent = type
		typesWrap.appendChild(tag)
	}

	const title = document.createElement('h3')
	title.className = 'proj-name'
	title.textContent = item.title

	preview.append(typesWrap, title)
	if (item.description) {
		const desc = document.createElement('p')
		desc.className = 'preview-desc'
		desc.textContent = item.description
		preview.appendChild(desc)
	}

	link.append(img, preview)
	li.appendChild(link)
	return li
}
