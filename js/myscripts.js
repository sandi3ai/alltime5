$(document).ready(function() {
    $("#succesInput").hide();

    $(function() {
        //read from database
        $.ajax({
            url: "fetch.php",
            method: "POST",
            data: {}, //you can insert url argumnets here to pass to fetch.php - for example "id=5&parent=6"
            dataType: "JSON",
            success: function(data) {
                data.forEach(function(user) {
                    document.getElementById("name").innerHTML = player.name;
                });
            },
        });
    });

    //add a player - pošiljanje input podatkov na insert.php
    $("#addButton").click(function() {
        var name = $("#inputName").val() + " " + $("#inputSurname").val();
        var team = $("#inputTeam").val();
        var position = $("#inputPosition").val();
        var image = $("#inputImage").val();
        console.log("Add Button clicked");

        vsebina = name + ", " + team + ", " + position + ", " + image;
        console.log("vsebina: " + vsebina);

        //Vnos iz forme preko ajaxa na php
        $.ajax({
            url: "insert.php",
            method: "POST",
            data: {
                name: name,
                team: team,
                position: position,
                image: image,
            },
            success: function(data) {
                //počistim input in izpišem succesInput
                $("#inputName").val("");
                $("#inputSurname").val("");
                $("#inputTeam").val("");
                $("#inputPosition").val("");
                $("#inputImage").val("");
                $("#succesInput").show("slow");
            },
        });
    });
});