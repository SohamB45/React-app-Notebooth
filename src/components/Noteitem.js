import React,{useContext} from 'react'
import noteContext from './context/notes/noteContext';

const Noteitem = (props) => {
  const context =useContext(noteContext);
const {note,updateNote}=props;
const {deleteNote}=context;

  return (
          
  <div className="col-md-4">
    <div className="card my-3">
 
  <div className="card-body" >
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{note.description}</h6>
    <i className="fa-solid fa-trash-can mx-2 "onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{updateNote(note)}}></i>
    
    </div>
  </div>
</div>
    
 

    
  )
}

export default Noteitem