
import React, { useContext, useEffect, useRef ,useState } from 'react';

import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from './context/notes/noteContext';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes,  getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      
        getNotes()
      
    }
        else{
      history.push("/login")
    }
  
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
    

  }

  const handleClick =(e)=>{
    console.log("updating the note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    

    
}
const onChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value})

}
  return (
    <>
      <AddNote/>



      <button disp type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={ref}>
        Launch static backdrop modal
      </button>


      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" ref={ref} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>

               
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button ref={refClose} onClick={handleClick} type="button" class="btn btn-primary" data-bs-dismiss="modal">Update Changes</button>
            </div>
          </div>
        </div>
      </div>


      <div className="row my-2">
        <h1>Your notes :</h1>
        <div className='container mx-2'>
          {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote}  note={note} />

        })}
      </div>
    </>
  )
}


export default Notes