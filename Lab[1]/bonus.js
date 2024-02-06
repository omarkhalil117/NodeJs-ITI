const fs = require('fs')
const path = require('path')
const {Command} = require('commander')
const { readFile , editList , deleteFromList , addIntoList , editStatus} = require('./helperFunctions')

const program = new Command()

program.option('-s , --status <TYPE> ' , 'set status')
       .option('-id <TYPE>' , 'get id')
       .option('-t <TYPE>')

program.parse()


const command = process.argv[2]


if(["add","edit","list","delete",undefined].includes(command))
{
    switch (command)
    {
        // no command 
        case undefined :
            console.log("No commands to execute")
            break;
        
        /////////////////////////////////////////////////////////////////////
        
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
}
else
{

    if(program.opts().status && program.opts().Id)
    {
        editStatus("todoList.json" , program.opts().Id , program.opts().status)
    }
    
    
    if(program.opts().t && program.opts().Id)
    {
        editList("todoList.json" , program.opts().Id , program.opts().t)
    }
    
}




