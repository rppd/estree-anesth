var socket = io();

socket.on("update", function(data) {
    document.getElementById(data.cell).value = data.value;
});

socket.on("init", function(db) {
    console.log(db)
    var keys = Object.keys(db);
    keys.forEach(function(key) {
        element = document.getElementById(key)
        if (element != undefined) {
            element.value = db[key];
        }
    });
});

document.querySelectorAll("input").forEach(function(input) {
    console.log(input);
    input.oninput = function(event) {
        console.log(event.target.value);
        socket.emit("edit", {cell : event.target.id, value : event.target.value});
    }
});