const fs = require('fs')
const path = require('path')

const command = process.argv[2]


function readFile(filename)
{
    const oldContent = fs.readFileSync(path.join(__dirname,filename))
    return JSON.parse(oldContent)
}


function writIntoFile(filename , content)
{
    fs.writeFileSync(path.join(__dirname,filename),JSON.stringify(content))
}


function editList(filename , id , newTitle)
{
    if(!id || !newTitle)
    {
        console.log("There is missing parametar ?")
    }
    else
    {
        // read content
        const parsed = readFile(filename)
       
        // find index
        const elementToEdit = parsed.find( el => el.id == id)

        
        if(!elementToEdit)
        {
            console.log("id not found ?")
        }
        else
        {
            // update title
            elementToEdit.title = newTitle

            // override file content
            writIntoFile(filename,parsed)

            console.log("Edited Successfully")
        }
    }
}


function deleteFromList(filename, id)
{
    if(!id)
    {
        console.log("There is no id to delete")
    }
    else
    {
        // read data 
        const parsed = readFile(filename)
      
        // find the deleted object index
        const newList = parsed.filter( el => el.id != id)

        // check if there is deleted item 
        if(parsed.length === newList.length)
        {
            console.log("Id not found ?")
        }

        // write new Array
        fs.writeFileSync(path.join(__dirname,filename),JSON.stringify(newList))
    }
}


function addIntoList(filename , title)
{
    if(!title) 
    {
        console.log("No content to add")
    }
    else
    {
        // read content
        const parsed = readFile(filename)

        // add content and write into file
        parsed.push({"title":title , "Status":false , "id": parsed[parsed.length-1].id+1})

        // override file content
        writIntoFile(filename,parsed);

        console.log("Action Inserted")
    }
}



switch (command)
{
    // no command entered
    case undefined :
        console.log("no command to execute");
        break;

    //////////////////////////////////////////////////////////////////

    // list all file content
    case "add" :
        const todo = process.argv[3] ? process.argv[3].trim() : undefined
        
        addIntoList("todoList.json",todo)

        break;    

    ///////////////////////////////////////////////////////////////////

    // list all file content
    case "list" :

        // read file content
        const parsed = readFile("todoList.json")
        
        parsed.map(el => {
            console.log(`ID: ${el.id} ${el.title} Status: ${el.Status}`)
        });

        break;
    
    //////////////////////////////////////////////////////////////////

    // update title
    case "edit" :
        const editId = process.argv[3]
        const newTitle = process.argv[4].trim() ? process.argv[4].trim() : undefined
       
        editList("todoList.json",editId,newTitle);

        break;

    //////////////////////////////////////////////////////////////////////////

    case "delete" :

        const deleteId = process.argv[3]
       
        deleteFromList("todoList.json",deleteId)

        break;

    ///////////////////////////////////////////////////////////////////////

    // anything else
    default:
        console.log("Unknown Command !")
        break;

}


