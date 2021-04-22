let db = require("./db/db.json")
const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 

// creates req.body as json object
app.use(express.json()); 

// connects css file 
app.use(express.static(path.join(__dirname, 'public')));

// routes to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.resolve("./public/notes.html"))
}); 
// sends content from db.json file 
app.get("/api/notes", (req, res) => {
    res.json(db)
}); 

// adds note 
app.post("/api/notes", (req, res) => {
    const data = req.body; 
    // adds unique id to note
    db.push({...data, id: uniqid()}); 

    fs.writeFileSync("./db/db.json", JSON.stringify(db)); 
    // terminates request
    res.json(db)
})
// deletes note 
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id; 
    db = db.filter((note) => {
        return note.id !== id; 
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(db)); 
    // terminates request
    res.json(db)
})

// other routes direct to homepage 
app.get("*", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
}); 

// starts the server 
app.listen(port, () => console.log(`running on port ${port}`)); 