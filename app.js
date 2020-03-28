const express = require("express");
const http = require("http");
const fs = require("fs");
const socket_io = require("socket.io");

var app = express();
var server = http.createServer(app);
var db = init_db();
var io =  socket_io(server);

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.static("static"));

app.get("/", function(req, res) {
    res.render("index.ejs");
})

app.get("/db", function(req, res) {
    res.end(JSON.stringify(db));
})

io.on("connection", function(socket) {
    console.log("connection");
    
    socket.emit("init", db);

    socket.on("edit", function(data) {
        console.log("Edited " + data.cell + " as " + data.value)
        socket.broadcast.emit("update", data);
        db[data.cell] = data.value;
        save_db();
    });

    socket.on("disconnect", function() {
        console.log("disconnect");
    });
});

server.listen(80);

function init_db() {
    return JSON.parse(fs.readFileSync("db.json"));
}

function save_db() {
    fs.writeFile("db.json", JSON.stringify(db), function(err) {
        if (err) throw err;
    });
}