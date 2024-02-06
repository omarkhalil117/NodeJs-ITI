const fs = require('fs')
const path = require('path')

const readFile = (filename) => {
    const oldContent = fs.readFileSync(path.join(__dirname, filename))
    return JSON.parse(oldContent)
}

const writIntoFile = (filename, content) => {
    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(content))
}


const editList = (filename, id, newTitle) => {

    // check if there is any missing parametar
    if (!id || !newTitle) {
        console.log("There is missing parametar ?")
        return
    }

    // read content
    const parsed = readFile(filename)

    // find index
    const elementToEdit = parsed.find(el => el.id == id)

    if (!elementToEdit) {
        console.log("id not found ?")
        return
    }

    // update title
    elementToEdit.title = newTitle

    // override file content
    writIntoFile(filename, parsed)

    console.log("Edited Successfully")


}

function deleteFromList(filename, id) {

    // check if id is missing
    if (!id) {
        console.log("There is no id to delete")
        return
    }

    // read data 
    const parsed = readFile(filename)

    // find the deleted object index
    const newList = parsed.filter(el => el.id != id)

    // check if there is deleted item 
    if (parsed.length === newList.length) {
        console.log("Id not found ?")
    }

    // write new Array
    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(newList))

}


function addIntoList(filename, title) {

    // check if title is missing
    if (!title) {
        console.log("No content to add")
        return
    }

    // read content
    const parsed = readFile(filename)

    // add content and write into file
    parsed.push({ "title": title, "Status": false, "id": parsed[parsed.length - 1].id + 1 })

    // override file content
    writIntoFile(filename, parsed);

    console.log("Action Inserted")

}


function editStatus(filename, id, newStatus) {

    // check for missing parameters
    if (!id || !newStatus) {
        console.log("There is missing parametar ?")
        return
    }

    // read content
    const parsed = readFile(filename)

    // find index
    const elementToEdit = parsed.find(el => el.id == id)

    // check if id not found
    if (!elementToEdit) {
        console.log("id not found ?")
        return
    }

    if (["in-progress", "todo", "done"].includes(newStatus)) {
        // update title
        elementToEdit.Status = newStatus

        // override file content
        writIntoFile(filename, parsed)

        console.log("Edited Successfully")
        return
    }

    console.log("Status is not correct")
    console.log("Status is either in-progress , todo , done")

}



module.exports = { readFile, writIntoFile, editList, deleteFromList, addIntoList, editStatus }