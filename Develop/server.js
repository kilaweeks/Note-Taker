const db = require("./db/db.json")
const fs = require("fs");
const path = require("path");
const util = require("util");

const express = require("express");
const app = express();
const port = 3000; 

// converts json to javascript
app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.get("/notes", (req, res) => {
    res.sendFile(path.resolve("./public/notes.html"))
}); 

app.get("/api/notes", (req, res) => {
    res.json(db)
}); 

app.post("/api/notes", (req, res) => {
    const data = req.body; 
    db.push(data); 

    fs.writeFileSync("./db/db.json", JSON.stringify(db)); 
    // terminates request
    res.json(db)
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
}); 




app.listen(port, () => console.log(`running on port ${port}`)); 
