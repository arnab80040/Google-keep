
const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea")  // all so that all notes can be stored in local storage
    const notes = []

    textAreaData.forEach((note) => {
        return notes.push(note.value)
        
    })
    localStorage.setItem("notes", JSON.stringify(notes))
}

const addButton = document.querySelector("#add")

const addNewNote = (text = "") => {
    const note = document.createElement('div')
    note.classList.add("note")
    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `
    note.insertAdjacentHTML("afterbegin", htmlData)   //faster than .innerhtml
    

    //getting the references
    const editButton = note.querySelector(".edit") //since the element is inside the div tag, note
    const deleteButton = note.querySelector(".delete")
    const mainDiv = note.querySelector(".main")
    const textArea = note.querySelector("textarea")

    //deleteing the note
    deleteButton.addEventListener("click", () => {
        note.remove()
        updateLSData()
    })
    
    textArea.value = text
    mainDiv.innerHTML = text
    
    //toggle using edit button, .hidden class display in clone.css has been set to none
    editButton.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    textArea.addEventListener("change", (event) => {  //events- event object - parent object of all events.
        
        const textNew = event.target.value
        
        mainDiv.innerHTML = textNew
        updateLSData()
    })



    document.body.appendChild(note)  //it appends a node as the last child of a node

}


//getting data back from local storage
const notes = JSON.parse(localStorage.getItem("notes"))
if(notes){notes.forEach((note) => {
    addNewNote(note)
})}

addButton.addEventListener("click", () => {
    addNewNote()
})

