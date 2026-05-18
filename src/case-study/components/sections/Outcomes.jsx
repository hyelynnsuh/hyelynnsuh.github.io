import { Section } from '../layout/Section.jsx'
import { Container } from '../layout/Container.jsx'
import { EditorialHeading } from '../shared/EditorialHeading.jsx'

/** Operational outcomes — pilot metrics and workflow effects. */
export function Outcomes({ label, title, lead, rows }) {
	return (
		<Section id="outcomes" spacing="default">
			<Container>
				<EditorialHeading label={label} title={title} lead={lead} />
				<div className="mt-8 overflow-hidden border border-cs-line bg-cs-paper">
					<table className="cs-spec-table cs-spec-table--stacked">
						<tbody>
							{rows.map((row) => (
								<tr key={row.label}>
									<th scope="row">{row.label}</th>
									<td>{row.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Container>
		</Section>
	)
}
