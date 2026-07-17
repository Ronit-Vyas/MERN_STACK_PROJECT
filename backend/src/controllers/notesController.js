import Note from "../models/Note.js"

export async function getAllNotes(req, res) {

    try{
        const notes=await Note.find().sort({createdAt : -1});
        res.json(notes)
    }
    catch(error){
        console.log("Error to get all Notes",error)
        res.json(500).json({message : "Internal Server Error"});
    }
    
}


export async function getNoteById(req,res) {
    try{
        const note=await Note.findById(req.params.id)
        if(!note) res.status(404).json({message : "Note not found"})
        else res.status(200).json(note) 
    }catch(error){
        console.log(error)
        res.json(500).json({message : "Note not created"});
    }
    
}

export async function createNote(req, res) {
    try
    {
       const {title,content} = req.body
       const newNote = new Note({title,content})

       await newNote.save()
      
    }
    catch(error)
    {
         res.status(500).json({message : "Internal server Error"})
    }
}

export async function updateNote(req, res) {
    try{
    const {title,content} =  req.body
    const updatedNote = await Note.findByIdAndUpdate(req.params.id , {title,content} , {new:true})
    if(!updatedNote) res.status(404).json({message : "Note not found"})
    res.status(200).json({message:"Note updated Successfully"})
    }catch(error){
    res.status(500).json({message: "Internal server error"})
    }

}

export async function deleteNote(req, res) {
     try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote) res.status(404).json({message : "No such record found !!"})
        else 
        res.status(200).json({message : "Deleted note successfully!!"})
     }
     catch(error)
     {
        console.log(error)
       res.status(500).json({message: "Internal server error"})
     }
}
