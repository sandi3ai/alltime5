$(document).ready(function() {
    $("#succesInput").hide();

    // v sekcijo players vstavi podatke z igralci
    var players = "";
    $.ajax({
        type: "post",
        url: "fetch.php",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                $.each(data, function(i, item) {
                    players +=
                        "<div class='col mb-4'><div class='card'> " +
                        "<img src='" +
                        data[i].image +
                        "' class='card-img-top' alt='alternative'>" +
                        "<div class='card-body'><h5 class='card-title'>" +
                        data[i].name +
                        "</h5>" +
                        "<p class='card-text'>" +
                        data[i].team +
                        "</br>position: " +
                        data[i].position +
                        " </p>" +
                        "</div></div></div>";
                });
            }
            $("div#playersContainer").append(players);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        },
    });

    //add a player - pošiljanje input podatkov na insert.php
    $("#addButton").click(function() {
        var name = $("#inputName").val() + " " + $("#inputSurname").val();
        var team = $("#inputTeam").val();
        var position = $("#inputPosition").val();

        let formData = new FormData();
        let image = $("#inputImage")[0].files[0];
        formData.append("image", image);
        formData.append("name", name);
        formData.append("team", team);
        formData.append("position", position);
        $.ajax({
            url: "insert.php",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function() {
                $("#inputName").val("");
                $("#inputSurname").val("");
                $("#inputTeam").val("");
                $("#inputPosition").val("");
                $("#inputImage").val("");
                $("#succesInput").show("slow");
            },
        });
    });
    /*
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
                            success: function() {
                                //počistim input in izpišem succesInput
                            },
                        });
                    });*/
});