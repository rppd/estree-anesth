var socket = io();

socket.on("update", function(data) {
    $("#"+data.cell).val(data.value);
});

socket.on("init", function(db) {
    console.log(db)
    var keys = Object.keys(db);
    keys.forEach(function(key) {
        $("#"+key).val(db[key])
    });
});

$("input").change(function(event) {
    console.log(event.target.value);
    socket.emit("edit", {cell : event.target.id, value : event.target.value})
});