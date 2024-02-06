const fs = require('fs')
const path = require('path')
const { readFile , editList , deleteFromList , addIntoList} = require('./helperFunctions')

const command = process.argv[2]

switch (command) {
    // no command entered
    case undefined:
        console.log("no command to execute");
        break;

    //////////////////////////////////////////////////////////////////

    // list all file content
    case "add":
        const todo = process.argv[3] ? process.argv[3].trim() : undefined

        addIntoList("todoList.json", todo)

        break;

    ///////////////////////////////////////////////////////////////////

    // list all file content
    case "list":

        // read file content
        const parsed = readFile("todoList.json")

        parsed.map(el => {
            console.log(`ID: ${el.id} ${el.title} Status: ${el.Status}`)
        });

        break;

    //////////////////////////////////////////////////////////////////

    // update title
    case "edit":
        const editId = process.argv[3]
        const newTitle = process.argv[4] ? process.argv[4].trim() : undefined

        editList("todoList.json", editId, newTitle);

        break;

    //////////////////////////////////////////////////////////////////////////

    case "delete":

        const deleteId = process.argv[3]

        deleteFromList("todoList.json", deleteId)

        break;

    ///////////////////////////////////////////////////////////////////////

    // anything else
    default:
        console.log("Unknown Command !")
        break;

}


