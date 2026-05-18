/**
 * Placeholder content — operational / systems documentation tone.
 */
export const dummyCaseStudy = {
	doc: {
		id: 'IDD-EST-2024',
		type: 'Interaction design documentation',
		status: 'Pilot complete',
	},
	hero: {
		title: 'AI estimate verification for construction estimators',
		description:
			'Documentation of interaction architecture, workflow integration, and human–model handoff patterns for a B2B estimating tool.',
		positioning:
			'Design objective: make machine-generated outputs inspectable, correctable, and accountable within existing operational workflows.',
		metadata: [
			{ label: 'Role', value: 'Lead interaction designer' },
			{ label: 'Team', value: 'Product · Engineering · Research' },
			{ label: 'Timeline', value: '14 weeks' },
			{ label: 'Environment', value: 'Enterprise SaaS · AI-assisted estimating' },
			{ label: 'Users', value: 'Professional estimators (power users)' },
			{ label: 'Deliverables', value: 'Interaction model · Workflow specs · Pilot UI' },
		],
	},
	media: {
		hero: 'Primary workflow — suggestion review surface',
		thesis: 'Context — estimate assembly in operational tooling',
	},
	thesis: {
		label: '§ 01 · Problem definition',
		title: 'Trust failures are modeled as interaction failures',
		narrative:
			'Users did not reject AI because of brand or novelty. They rejected outputs that could not be verified against site logic, scope boundaries, or edit lineage. The design work reframed “accuracy” as an operational property of the interface — not a model metric alone.',
		tags: ['verification UX', 'workflow integration', 'AI mediation', 'operational tooling'],
	},
	interactionModel: {
		label: '§ 02 · Interaction model',
		title: 'Inspectable reasoning over black-box suggestions',
		lead: 'Pattern specifications. Each entry documents behavior, system rules, and interface specimens for review.',
		rows: [
			{
				title: 'Values and scale nodes',
				body: 'Decompose outputs into discrete, inspectable units. Validation occurs at the node level before commitment to a composite estimate.',
				note: 'Rule: composite lock until all child nodes pass verification.',
				mediaLabel: 'Specimen — node hierarchy & verification states',
				mediaCaption: 'Fig. 2.1 — Node tree with independent review gates.',
				annotations: [
					{ label: 'Scale node', position: 'top-left', detail: 'Atomic review unit' },
					{ label: 'Composite lock', position: 'bottom-right', detail: 'Blocked until children pass' },
				],
			},
			{
				title: 'Spatial awareness & logic',
				body: 'Spatial relationships are first-class in the UI. The system must support the same traversal sequence estimators use on site.',
				note: 'Rule: no spatial claim without a visible anchor on the artifact.',
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
				note: 'Rule: human sign-off required above confidence threshold.',
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
		title: 'Framework for AI-mediated professional work',
		lead: 'Principles applied across workflows — not campaign messaging.',
		cards: [
			{
				id: 'PR-01',
				title: 'Legible seams between human and model',
				insight: 'Expose boundaries of automated inference so operators know what they own vs. what the system asserts.',
				principle: 'Accountability boundary',
			},
			{
				id: 'PR-02',
				title: 'Correction speed over step reduction',
				insight: 'Experts optimize for recovery when the model is wrong — not for fewer clicks on happy paths.',
				principle: 'Verification-first',
			},
			{
				id: 'PR-03',
				title: 'Feedback mutates visible system state',
				insight: 'Corrections must update downstream logic in the UI — not vanish into logging only.',
				principle: 'Closed feedback loop',
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
