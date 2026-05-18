/**
 * Canonical list of portfolio work — homepage sections and playground gallery.
 * `kind` drives behavior: case-study → navigate; external → open URL; media → modal.
 *
 * @typedef {'case-study' | 'media' | 'external'} WorkKind
 *
 * @typedef {Object} MediaSlide
 * @property {'image' | 'video'} type
 * @property {string} src — path under site root (e.g. `/assets/photo.jpg`)
 * @property {string} [mime] — for video, e.g. `video/mp4`
 * @property {string} [alt]
 *
 * @typedef {Object} WorkItem
 * @property {string} id — stable slug (URLs, analytics, tests)
 * @property {string} title
 * @property {string} thumb — card preview src (`image` or video file path)
 * @property {'image' | 'video'} [thumbKind] — how to render `thumb` on the card (default `image`). Use `video` when `thumb` is an `.mp4`
 * @property {WorkKind} kind
 * @property {string} [href] — case-study or external destination
 * @property {boolean} [externalTab] — open `href` in a new tab (default true for `external`, false for `case-study`)
 * @property {MediaSlide[]} [media] — when `kind === 'media'`, shown in a modal (gallery = multiple slides)
 * @property {string} [category] — loose grouping: product | visual | playground
 * @property {string[]} [types] — e.g. `['product design', 'web design']`
 * @property {string} [description] — short line under the title on cards
 * @property {boolean} [hidden] — omit from UI until you are ready (optional)
 */

/** @type {WorkItem[]} */
export const WORK_ITEMS = [
	// ——— Product design ———
	{
		id: 'posty',
		title: 'Posty',
		thumb: '/assets/posty-preview.png',
		kind: 'case-study',
		href: '/projects/posty.html',
		externalTab: false,
		category: 'product',
		types: ['1st place design hackathon'],
		description: 'an AI-powered compost companion paired with its own feedback app',
	},
	{
		id: 'depop-styled-by-you',
		title: 'Depop: Styled by You',
		thumb: '/assets/depop.png',
		kind: 'case-study',
		href: '/projects/depop.html',
		externalTab: false,
		category: 'product',
		types: ['feature integration'],
		description: "integrating user customization within Depop's existing design system",
	},
	{
		id: 'basketbuddies',
		title: 'BasketBuddies',
		thumb: '/assets/basketbuddies.png',
		kind: 'case-study',
		href: '/projects/basketbuddies.html',
		externalTab: false,
		category: 'product',
		types: ['capstone'],
		description: 'a collaborative grocery shopping service for friends',
		hidden: true,
	},
	{
		id: 'ferra',
		title: 'Ferra',
		thumb: '/assets/ferra-preview.png',
		kind: 'case-study',
		href: '/projects/ferra.html',
		externalTab: false,
		category: 'product',
		types: ['product design'],
		description: 'interaction design for AI-mediated professional workflows',
		hidden: true,
	},
	{
		id: 'what-should-hye-lynn-eat',
		title: 'What should Hye Lynn eat?',
		thumb: '/assets/proj5 copy.png',
		kind: 'external',
		href: 'https://hyelynnsuh.github.io/functions/',
		externalTab: true,
		category: 'product',
		types: ['web design', 'creative coding'],
		description: 'an interactive web app that helps users decide what to eat by filtering through a curated list of meals',
	},
	{
		id: 'links',
		title: 'Links',
		thumb: '/assets/links.png',
		kind: 'external',
		href: 'https://hyelynnsuh.github.io/links/',
		externalTab: true,
		category: 'product',
		types: ['web design', 'creative coding'],
		description: 'a responsive website of a collection of push buttons in media',
	},

	// ——— Visual design (currently external / social) ———
	{
		id: 'gasp-spotify-zine',
		title: 'GASP × Spotify',
		thumb: '/assets/ZINE_WHITE.gif',
		kind: 'external',
		href: 'https://www.instagram.com/p/C4L_6y1yfLA/',
		externalTab: true,
		category: 'visual',
		types: ['print design', 'motion graphics'],
		description: "collaborated with Spotify Frequency to create a zine celebrating artists of color for Black History Month",
	},
	{
		id: 'gasp-dermalogica',
		title: 'GASP × Dermalogica',
		thumb: '/assets/GASPxDerm.png',
		kind: 'external',
		href: 'https://www.instagram.com/p/CzUhuhgSC3E/',
		externalTab: true,
		category: 'visual',
		types: ['branding'],
		description: 'collaborated with Dermalogica to create a skincare × art gallery',
	},
	{
		id: 'gasp-zine-12',
		title: 'GASP Zine Ed. 12',
		thumb: '/assets/a.png',
		kind: 'external',
		href: 'https://www.instagram.com/p/ChFcZoSJCv3/',
		externalTab: true,
		category: 'visual',
		types: ['print design', 'motion graphics'],
		description: "collaborated with David Lachapelle to create GASP's 14th edition",
	},
	{
		id: 'gasp-nike-women',
		title: 'GASP × Nike Women',
		thumb: '/assets/gaspxnike02.png',
		kind: 'external',
		href: 'https://www.instagram.com/p/C1u9LjRS9Ol/',
		externalTab: true,
		category: 'visual',
		types: ['branding', 'print design'],
		description: "collaborated with Nike Women for Nike's Style Studio, curating a day of style, dance, and creative exploration",
	},

	// ——— Playground (3D gallery on playground page) ———
	{
		id: 'playground-seoul-02',
		title: 'Seoul (clip 2)',
		thumb: '/assets/SEOULDBOUND02.mp4',
		thumbKind: 'video',
		kind: 'media',
		category: 'playground',
		types: ['motion', 'video'],
		description: 'Short motion study',
		media: [{ type: 'video', src: '/assets/SEOULDBOUND02.mp4', mime: 'video/mp4', alt: 'Seoul motion clip' }],
	},
	{
		id: 'playground-jazz',
		title: 'Jazz club',
		thumb: '/assets/jazz01.JPG',
		kind: 'media',
		category: 'playground',
		types: ['photography'],
		description: 'Photography',
		media: [{ type: 'image', src: '/assets/jazz01.JPG', alt: 'Jazz club photograph' }],
	},
	{
		id: 'playground-pandora-1',
		title: 'Pandora event',
		thumb: '/assets/pandora.JPG',
		kind: 'media',
		category: 'playground',
		types: ['photography'],
		description: 'Event photograph',
		media: [{ type: 'image', src: '/assets/pandora.JPG', alt: 'Pandora event photograph' }],
	},
	{
		id: 'playground-pandora-2',
		title: 'Pandora event II',
		thumb: '/assets/pandora2.JPG',
		kind: 'media',
		category: 'playground',
		types: ['photography'],
		description: 'Event photograph',
		media: [{ type: 'image', src: '/assets/pandora2.JPG', alt: 'Pandora event photograph' }],
	},
	{
		id: 'playground-lexo',
		title: 'LEXO',
		thumb: '/assets/lexo.JPG',
		kind: 'media',
		category: 'playground',
		types: ['photography'],
		description: 'Photography',
		media: [{ type: 'image', src: '/assets/lexo.JPG', alt: 'LEXO photograph' }],
	},
	{
		id: 'playground-hands',
		title: 'Hands',
		thumb: '/assets/hands.JPG',
		kind: 'media',
		category: 'playground',
		types: ['photography'],
		description: 'Photography',
		media: [{ type: 'image', src: '/assets/hands.JPG', alt: 'Hands photograph' }],
	},
	{
		id: 'playground-seoul-01',
		title: 'Seoul (clip 1)',
		thumb: '/assets/SEOULBOUND1mp4.mp4',
		thumbKind: 'video',
		kind: 'media',
		category: 'playground',
		types: ['motion', 'video'],
		description: 'Short motion study',
		media: [{ type: 'video', src: '/assets/SEOULBOUND1mp4.mp4', mime: 'video/mp4', alt: 'Seoul motion clip' }],
	},
	{
		id: 'playground-seoul-03',
		title: 'Seoul (clip 3)',
		thumb: '/assets/SEOULBOUND03.mp4',
		thumbKind: 'video',
		kind: 'media',
		category: 'playground',
		types: ['motion', 'video'],
		description: 'Short motion study',
		media: [{ type: 'video', src: '/assets/SEOULBOUND03.mp4', mime: 'video/mp4', alt: 'Seoul motion clip' }],
	},
	{
		id: 'playground-globe',
		title: 'Globe',
		thumb: '/assets/globe.mp4',
		thumbKind: 'video',
		kind: 'media',
		category: 'playground',
		types: ['motion', 'video'],
		description: 'Motion study',
		media: [{ type: 'video', src: '/assets/globe.mp4', mime: 'video/mp4', alt: 'Globe motion study' }],
	},
	{
		id: 'playground-sandwich',
		title: 'Sandwich',
		thumb: '/assets/sandwich.mp4',
		thumbKind: 'video',
		kind: 'media',
		category: 'playground',
		types: ['motion', 'video'],
		description: 'Motion clip',
		media: [{ type: 'video', src: '/assets/sandwich.mp4', mime: 'video/mp4', alt: 'Sandwich motion clip' }],
	},
]

/**
 * Items intended for the gallery UI (respects `hidden`).
 * @returns {WorkItem[]}
 */
export function getVisibleWorkItems() {
	return WORK_ITEMS.filter((item) => !item.hidden)
}

/**
 * Visible items in a category (`product`, `visual`, `playground`).
 * @param {string} category
 * @returns {WorkItem[]}
 */
export function getVisibleWorkItemsByCategory(category) {
	return getVisibleWorkItems().filter((item) => item.category === category)
}
