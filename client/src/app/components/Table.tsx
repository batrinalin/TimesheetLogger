import React from 'react';

interface ITable {
	data: any[];
	setData: any;
  }

export default function Table(props: ITable) {
	const [order, setOrder] = React.useState("ASC");
	const sorting = (col: string) => 
	{
		if(order === "ASC")
		{
			var sorted = [...props.data].sort((a,b)=>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			props.setData(sorted);
			setOrder("DSC")
		}
		else if (order === "DSC")
		{
			const sorted = [...props.data].sort((a,b)=>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			props.setData(sorted);
			setOrder("ASC")
		}
	}

	return (
		<table className="table-fixed w-full">
			<thead className="bg-gray-200">
				<tr>
					<th className="border px-4 py-2 w-12">#</th>
					<th className="border px-4 py-2">Project Name</th>
					<th className="border px-4 py-2">Logged Hours(h.)</th>
					<th className="border px-4 py-2" onClick={()=> sorting("deadLine")}>Dead line</th>
					
				</tr>
			</thead>
			<tbody>

			{	props.data.map(
					(item)=>{
						return(
							<tr>
								<td className="border px-4 py-2 w-12">{item.id}</td>
								<td className="border px-4 py-2">{item.name}</td>
								<td className="border px-4 py-2">{item.loggedHours}</td>
								<td className="border px-4 py-2">{item.deadLine}</td>
							</tr>
						)
					}
				)
			}
			</tbody>
		</table>
	);
}