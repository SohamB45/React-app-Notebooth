
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host ="http://localhost:5000"
  const notesInitial = []
  // const [notes, setNotes] = useState(notesInitial)
  
//get all notes 
const getNotes = async () =>{  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET", // *GET, POST, PUT, DELETE, etc.

  headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
   
  },
});
const json=await response.json();
setNotes(json)
 console.log(json);

}
  //Add note
  const addNote = async (title, description, tag) => {

    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
       
      },
  
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    
    
    
    const note=await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note))

    

  }

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
       
      },
  
       // body data type must match "Content-Type" header
    });
   const json=response.json();
   console.log(json)


    console.log("deleting note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  //edit note
  const editNote = async (id,title,description,tag) => {

 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
       
      },
  
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
   const json= await response.json(); // parses JSON response into native JavaScript objects

  let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }

    }
    setNotes(newNotes)

  }
  const [notes, setNotes] = useState(notesInitial)

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}} >
      {props.children}
    </noteContext.Provider>

  )

}

export default NoteState;