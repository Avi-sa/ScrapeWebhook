// Importing the express module
const express = require('express'); 
// calling the express function
const app = express(); 

// Creating a "/home" route for sending "Hello World!😎😎" to the clientSide(Browser)
app.get("/home", (req, res)=>{
    res.status(200).send("<h1>Hello World!😎😎</h1>")
})

// declaring our Port number variable
const PORT = 4000 || process.env.PORT;

console.log(PORT)

// Creating a server with the PORT variable declared above
app.listen(PORT, ()=>{
    console.log(`Listening to Port ${PORT}`)
});

