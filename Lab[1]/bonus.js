const fs = require('fs')
const path = require('path')
const {Command} = require('commander')


const program = new Command()

program.option('-s , --status <TYPE> ' , 'set status')
       .option('-id <TYPE>' , 'get id')
       .option('-t <TYPE>')

program.parse()


if(program.opts().status && program.opts().Id)
{
    editStatus("todoList.json" , program.opts().Id , program.opts().status)
}


if(program.opts().t && program.opts().Id)
{
    editList("todoList.json" , program.opts().Id , program.opts().t)
}


// console.log(program.opts())

// if(!program.opts().status)
// {
//     console.log("No arguments added ?")
// }
// else
// {
//     console.log(`Status is ${program.opts().status}`)
// }



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

            console.log("Status Updated Successfully")
        }
    }
}

function editStatus(filename , id , newStatus)
{
    if(!id || !newStatus)
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
            if(["in-progress","todo","done"].includes(newStatus))
            {
                // update title
                elementToEdit.Status = newStatus
    
                // override file content
                writIntoFile(filename,parsed)
    
                console.log("Edited Successfully")
            }
            else
            {
                console.log("Status is not correct")
                console.log("Status is either in-progress , todo , done")

            }
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


