const BASE_URL = 'http://localhost:3001/api';

export async function getTimesheets() {
	const response = await fetch(`${BASE_URL}/Timesheets/GetTimesheets`);
	return response.json();
}

export async function logHours(timesheetModel: any) {
	const putMethod = 
	{
		method: 'PUT', // Method itself
		headers: {
		 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
		},
		body:timesheetModel
	}
	const response = await fetch(`${BASE_URL}/Timesheets/LogHours`,putMethod);
	
	return response.json();
}

export async function addProject(timesheetModel: any) {
	const postMethod = 
	{
		method: 'POST', // Method itself
		headers: {
		 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
		},
		body:timesheetModel
	}
	debugger;
	const response = await fetch(`${BASE_URL}/Timesheets/AddProject`,postMethod);
	
	return response.json();
}
