import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/geist-sans/400.css'
import '../siteChrome.js'
import { CaseStudyApp } from '../CaseStudyApp.jsx'
import { ferraCaseStudy } from '../data/ferra.js'
import '../styles/case-study.css'

const rootEl = document.getElementById('case-study-root')
if (rootEl) {
	createRoot(rootEl).render(
		<StrictMode>
			<CaseStudyApp content={ferraCaseStudy} />
		</StrictMode>
	)
}
