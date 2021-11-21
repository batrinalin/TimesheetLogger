import React from "react";
import { addProject } from "../../api/projects";
import "./Modal.css";

interface IProjectModal {
    toggleModal: () =>void;
    toggleGrid: () => void;
  }

  export default function ProjectModal(props : IProjectModal) {
  
    const submitEvent = () => {
            
        var projectNameInput:any  = document.getElementById("ProjectName");
        var loggedHoursInput:any  = document.getElementById("Loggedhours")
        var deadLineInput:any  = document.getElementById("DeadLine")

        var timesheetModel = '{"name":"' + projectNameInput.value+'","loggedHours":'+ loggedHoursInput.value +',"deadLine":"'+ deadLineInput.value +'"}';
    
        addProject(timesheetModel)
        .then(data => {
            if(data)
            {
            props.toggleModal()
            props.toggleGrid();
            }  
        });
    };
  
    return (
      <>
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
            <header className="bg-blue-500 text-white flex items-center h-12 w-full">
                  <div className="container mx-auto">
                     <a className="navbar-brand" href="/">Add Project</a>
                     <button className="close-modal" onClick={props.toggleModal}>
                        X
                     </button>
                  </div>
              </header>
            <div className="row">
              <div className="column" >
                <h2>Project Name</h2>
                <h2>Logged hours(m.)</h2>
                <h2>Dead Line</h2>
              </div>
              <div className="column">
              
                <input id="ProjectName" className="border rounded-full py-2 px-4" type="search" placeholder="Project Name"/>
                <input id="Loggedhours" className="border rounded-full py-2 px-4" type="search" placeholder="Logged hours(minutes)"/>
                <input id="DeadLine" className="border rounded-full py-2 px-4" type="search" placeholder="Dead Line: mm/dd/yy"/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={submitEvent}>
                  Submit
                </button>
              </div>
            </div>
  
            </div>
          </div>
      </>
    );
  }