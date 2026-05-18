import { PortfolioNavbar } from './components/layout/PortfolioNavbar.jsx'
import { Hero } from './components/sections/Hero.jsx'
import { FullWidthMedia } from './components/sections/FullWidthMedia.jsx'
import { ProjectThesis } from './components/sections/ProjectThesis.jsx'
import { InteractionModel } from './components/sections/InteractionModel.jsx'
import { InsightCards } from './components/sections/InsightCards.jsx'
import { ConstraintCards } from './components/sections/ConstraintCards.jsx'
import { SystemsThinking } from './components/sections/SystemsThinking.jsx'
import { Outcomes } from './components/sections/Outcomes.jsx'
import { ProjectNav } from './components/sections/ProjectNav.jsx'
import { dummyCaseStudy } from './data/dummyContent.js'

/**
 * Product systems documentation page — compose sections from data.
 */
export function CaseStudyApp({ content = dummyCaseStudy }) {
	const { hero, media } = content

	return (
		<>
			<a className="skip-link" href="#main-content">
				Skip to main content
			</a>
			<PortfolioNavbar />
			<div className="cs-doc">
				<div className="cs-doc__paper mx-auto w-full min-w-0 max-w-[68rem]">
					<main id="main-content">
					<Hero {...hero} />
					<FullWidthMedia
						refId="ART-00"
						label={media.hero}
						aspect="wide"
					/>
					<ProjectThesis {...content.thesis} />
					<FullWidthMedia
						refId="ART-01"
						label={media.thesis}
						aspect="landscape"
						spacing="default"
					/>
					<InteractionModel {...content.interactionModel} />
					<InsightCards {...content.insightCards} />
					<ConstraintCards {...content.constraints} />
					<SystemsThinking {...content.systemsThinking} />
					<Outcomes {...content.outcomes} />
					</main>
					<ProjectNav {...content.navigation} />
				</div>
			</div>
		</>
	)
}
