import React, { useState } from 'react';
import { getTimesheets } from '../api/projects';
import ProjectModal from '../components/Modal/ProjectModal';
import Modal from '../components/Modal/TimesheetModal';
import Table from '../components/Table';

export default function Projects() {

	const [projects, setProjects] = React.useState([]);
	const [timesheetModalState, setTimesheetModalState] = useState(false);
	const [projectModalState, setProjectModalState] = useState(false);
	const [timesheetGridRefresh, setTimesheetGridRefresh] = useState(false);
	
	const toggleModal = () => {
		setTimesheetModalState(!timesheetModalState);
	};

	const toggleProjectModal = () => {
		setProjectModalState(!projectModalState);
	};


	const toggleTimesheetGridRefresh = () => {
		setTimesheetGridRefresh(!timesheetGridRefresh);
	};

	React.useEffect(() => {
		getTimesheets()
		.then(data => {
			setProjects(data);
		});
	  }, [timesheetGridRefresh]);

	if(timesheetModalState || projectModalState) {
		document.body.classList.add('active-modal')
	} else {
		document.body.classList.remove('active-modal')
	}

	return (
		<>
			<div className="flex items-center my-6">
				<div className="w-1/2">
					<button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Hours</button>
					<button onClick={toggleProjectModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Project</button>
				</div>
			</div>

			{timesheetModalState && (
				<Modal toggleModal={toggleModal} toggleGrid={toggleTimesheetGridRefresh} data={projects}/>
			)}

			{projectModalState && (
				<ProjectModal toggleModal={toggleProjectModal} toggleGrid={toggleTimesheetGridRefresh}/>
			)}


			<Table data={projects} setData={setProjects}/>
		</>
	);
}