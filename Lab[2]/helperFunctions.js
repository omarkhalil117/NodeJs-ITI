const fs = require("fs");
const path = require('path');

const addStyle = (response)=>{

  // read CSS file
  const readStyle = fs.createReadStream(path.join(__dirname,"style.css") , 'utf-8')
  let styles = ``;
  
  // concat styles string on getting chunk of data
  readStyle.on('data' , (data) => {
      styles+= data;
  })

  // after reading file add the content to html page
  readStyle.on('end',()=>{
    response.write(`<style> 
    ${styles}
    </style>`)
  })
  
}

const mainRoute = (response)=>{
  response.write("<h1>Main Page</h1>")

    let content = ``;
    const readStream = fs.createReadStream(path.join(__dirname,"todoList.json"),'utf-8')

    // get data 
    readStream.on('data' , data =>{
      content+=data
      console.log(typeof content)
    })

    // add html tags 
    readStream.on("end" , ()=>{

      let todos = JSON.parse(content)

      todos = todos.map(element => {
         return `<li>Title : ${element.title}  Status : ${element.Status} </li>`
      });
      
      response.write(todos.join(''))

      return response.end();
    })
}

const astronomyRoute = (response)=>{
  response.write("<h1> astronomy </h1>")


  fs.readFile(path.join(__dirname,"img.jpg"),(err,data)=>{
    
    if(!err)
    {
      // convert the image to base64 string
      const imgBuffer = Buffer.from(data).toString('base64');

      // add it to img tag
      const imgTag = `<img src="data:image/jpeg;base64,${imgBuffer}">`;
  
      // send the html as a response
      response.write(imgTag);
      return response.end()
    }
    
    response.write("<h1> Error fetching the image </h1>")
  })

}

module.exports = {mainRoute , astronomyRoute , addStyle}