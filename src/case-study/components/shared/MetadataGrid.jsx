export function MetadataGrid({ items, caption = 'Metadata' }) {
	return (
		<figure className="m-0">
			{caption ? (
				<figcaption className="cs-kicker mb-2">{caption}</figcaption>
			) : null}
			<table className="cs-spec-table">
				<tbody>
					{items.map(({ label, value }) => (
						<tr key={label}>
							<th scope="row">{label}</th>
							<td>{value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</figure>
	)
}
