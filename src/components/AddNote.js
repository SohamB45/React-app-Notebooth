import React,{useContext,useState} from 'react'
import noteContext from './context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        

    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})

    }
  return (


    <div className='container my-3'>
    <div><h1>Add a note  <i class="fa-solid fa-square-plus fa-xs"></i></h1>
<form> 
  <div className="mb-3 my-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} autoFocus/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
  </div>
 <div>
  <button class="button "type="submit" className="btn btn-success" onClick={handleClick}><i class="fa-solid fa-note-sticky"></i> Add Note</button>
  
  </div>
</form>
</div>
</div>

  )
}

export default AddNote