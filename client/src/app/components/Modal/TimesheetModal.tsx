import React from "react";
import { logHours } from "../../api/projects";
import "./Modal.css";

interface IModal {
  toggleModal: () =>void;
  toggleGrid: () => void;
  data: any[];
}

export default function Modal(props : IModal) {
  
  const submitEvent = () => {

    var ddl:any  = document.getElementById("SelectedProjectDropdown");
    var log:any  = document.getElementById("Loggedhours")

    var timesheetModel = '{"id":' + ddl.selectedOptions[0].value+',"name":"'+ddl.selectedOptions[0].text+'","loggedHours":'+log.value+'}';
    
    logHours(timesheetModel)
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
                   <a className="navbar-brand" href="/">Log hours</a>
                   <button className="close-modal" onClick={props.toggleModal}>
                      X
                   </button>
                </div>
            </header>
          <div className="row">
            <div className="column" >
              <h2>Project Name</h2>
              <h2>Logged hours(m.)</h2>
              
            </div>
            <div className="column">
            
                <select id="SelectedProjectDropdown">
                  {	props.data.map(
                      (item)=>{
                        return(
                          <option value={item.id}>{item.name}</option>
                        )
                      }
                    )
                  }
                </select>  
              
              <input id="Loggedhours" className="border rounded-full py-2 px-4" type="search" placeholder="Logged hours(minutes)"/>
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