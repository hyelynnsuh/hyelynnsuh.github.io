/**
 * Ferra case study content — replace placeholder copy as the project is documented.
 */
export const ferraCaseStudy = {
	doc: {
		id: 'IDD-FERRA-2025',
		type: 'Interaction design documentation',
		status: 'In progress',
	},
	hero: {
		title: 'Ferra',
		description:
			'Ferra is an AI-powered estimation platform for structural steel contractors. I designed interaction systems that transformed AI outputs from opaque guesses into traceable, navigable workflows.',
		metadata: [
			{ label: 'Role', value: 'Lead interaction designer' },
			{ label: 'Team', value: 'Product · Engineering · Research' },
			{ label: 'Timeline', value: '14 weeks' },
		],
	},
	media: {
		hero: 'Primary workflow — suggestion review surface',
		thesis: 'Context — estimate assembly in operational tooling',
	},
	thesis: {
		title: 'designing ai outputs that estimators could actually trust',
		narrative: [
			'Structural steel estimators work across fragmented drawing sets where accuracy and accountability are critical. Early AI outputs created a trust gap: users could see generated quantities, but not how the system arrived at them.',
			'The challenge became designing an interaction model that allowed users to verify outputs quickly, maintain spatial context, and navigate uncertainty without interrupting workflow.',
		],
		tags: ['verification UX', 'workflow integration', 'AI mediation', 'operational tooling'],
	},
	interactionModel: {
		label: '§ 02 · Interaction model',
		title: 'the interaction model',
		lead: 'Structural steel estimators work across fragmented drawing sets where accuracy and accountability are critical. Early AI outputs created a trust gap: users could see generated quantities, but not how the system arrived at them.',
		rows: [
			{
				title: 'column schedule maker',
				body: [
					'Estimators often build column schedules manually by cross-referencing scattered drawings, schedules, and detail callouts.',
					'I designed the Column Schedule Maker as an AI-assisted workflow system that transformed fragmented drawing information into structured, editable schedules.',
					'The interaction model focused on contextual verification, editability, and workflow flexibility. Generated schedules remained linked to source drawings and supporting evidence, allowing users to quickly inspect, refine, and validate outputs without rebuilding schedules manually.',
				],
				mediaLabel: 'Specimen — node hierarchy & verification states',
				mediaCaption: 'Fig. 2.1 — Node tree with independent review gates.',
				annotations: [
					{ label: 'Scale node', position: 'top-left', detail: 'Atomic review unit' },
					{ label: 'Composite lock', position: 'bottom-right', detail: 'Blocked until children pass' },
				],
			},
			{
				title: 'revision aware navigation',
				body: [
					'Estimators constantly work across evolving drawing revisions. I introduced persistent revision states and comparison workflows inspired by existing industry behaviors.',
					'The system surfaces drawing deltas, quantity changes, and contextual overlays while preserving navigational continuity.',
				],
				mediaLabel: 'Specimen — spatial annotation layer',
				mediaCaption: 'Fig. 2.2 — Site logic mapped to coordinate space.',
				annotations: [
					{ label: 'Anchor', position: 'center-left' },
					{ label: 'Derived scope', position: 'top-right', detail: 'Read-only until confirmed' },
				],
			},
			{
				title: 'Contextual logic & provenance',
				body: 'Each value exposes source material, confidence band, and edit lineage. Reasoning remains legible across sessions and role handoffs.',
				mediaLabel: 'Specimen — provenance & confidence states',
				mediaCaption: 'Fig. 2.3 — State machine: suggest → inspect → commit.',
				annotations: [
					{ label: 'Provenance', position: 'bottom-left' },
					{ label: 'Confidence', position: 'center-right', detail: 'Drives disclosure depth' },
				],
			},
		],
	},
	insightCards: {
		label: '§ 03 · Operating principles',
		title: 'designing for imperfect ai',
		lead: 'When we first started testing, the system could not rely on perfect AI accuracy. Instead of hiding uncertainty, the interaction model was designed to make system confidence legible and navigable.',
		cards: [
			{
				title: 'progressive trust',
				tags: ['evidence → automation', 'verification → confirmation'],
				mediaLabel: 'Progressive trust — interface specimen',
			},
			{
				title: 'system visibility',
				tags: ['processing feedback', 'contextual reasoning'],
				mediaLabel: 'Correction speed — interface specimen',
			},
			{
				title: 'human-in-the-loop',
				tags: ['editable workflows', 'user-controlled validation'],
				mediaLabel: 'Feedback loop — interface specimen',
			},
		],
	},
	constraints: {
		label: '§ 04 · Constraint register',
		title: 'How system limits shaped interaction design',
		lead: 'Documented tradeoffs — inputs to architecture decisions.',
		items: [
			{
				id: 'C-01',
				title: 'Verification-first latency',
				tradeoff: 'Slower first-pass output vs. fewer downstream change orders and dispute cycles.',
			},
			{
				id: 'C-02',
				title: 'Information density budget',
				tradeoff: 'Higher visual complexity tuned for under 2s state scanning by expert users.',
			},
			{
				id: 'C-03',
				title: 'Role-based disclosure',
				tradeoff: 'No simplified “demo mode” — daily operational clarity over stakeholder walkthrough aesthetics.',
			},
		],
	},
	systemsThinking: {
		label: '§ 05 · Workflow architecture',
		title: 'Composition of patterns into product workflows',
		lead: 'End-to-end flows built from reusable interaction logic.',
		diagramRef: 'ARCH-01',
		diagramLabel: 'Interaction flow · logic gates · handoff surfaces',
		points: [
			{
				label: 'Pattern',
				title: 'Verification loop',
				body: 'Suggest → inspect → correct → commit. Reused across estimate types without redesigning chrome.',
			},
			{
				label: 'Workflow',
				title: 'Handoff artifacts',
				body: 'Exports preserve provenance for PM and subcontractor review chains.',
			},
			{
				label: 'Contract',
				title: 'Model ↔ UI boundary',
				body: 'Interface encodes what the model may assert autonomously vs. what requires human sign-off.',
			},
		],
	},
	outcomes: {
		label: '§ 06 · Operational outcomes',
		title: 'Pilot metrics & workflow effects',
		lead: 'Observed during moderated sessions and pilot deployment — not marketing projections.',
		rows: [
			{
				label: 'Time to first verified estimate',
				value: '−34% vs. baseline workflow in moderated tasks (n=12).',
			},
			{
				label: 'Edit-and-accept rate',
				value: 'Increased partial acceptance of AI suggestions when provenance UI was enabled.',
			},
			{
				label: 'Revision cycles',
				value: 'Pilot teams reported fewer ambiguity-driven revisions on submitted bids.',
			},
		],
	},
	navigation: {
		previous: { title: 'Posty — compost feedback system', href: '/projects/posty.html', refId: 'IDD-POSTY' },
		next: { title: 'Depop — feature integration', href: '/projects/depop.html', refId: 'IDD-DEPOP' },
	},
}
