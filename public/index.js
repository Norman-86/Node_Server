var textElement = document.getElementById("note")

function getNoteId() {
    let noteObject = getExistingNotes()
    if (!noteObject) {
        return 1
    }
    const keysArray = Object.keys(noteObject)
    const numberKeys = keysArray.map((key) => Number(key))
    return Math.max(...numberKeys) + 1
};

function getExistingNotes() {
    let notes = localStorage.getItem('notes')
    if (!notes) {
        return null
    }
    let n = JSON.parse(notes)
    console.log(n)
    return n
}

function saveNote() {
    if (textElement.value.trim().length === 0) {
        alert('Text is Empty')
    } else {
        const id = getNoteId()
        let noteObject = getExistingNotes()
        if (!noteObject) {
            noteObject = {}
        }
        noteObject[id] = textElement.value
        localStorage.setItem('notes', JSON.stringify(noteObject))
        alert('Note Saved')
        // alert(noteObject, localStorage)
    }
}

(function getNotes() {
    let notes = getExistingNotes()
    let notesArray = Object.values(notes)
    let orderedList = document.getElementById('notes-list')
    notesArray.forEach(note => {
        let listItem = document.createElement('li')
        listItem.innerHTML = note
        orderedList.appendChild(listItem)
    });
})()