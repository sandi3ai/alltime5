$(document).ready(function() {
    $("#succesInput").hide();

    appendAllPlayersToDivs();

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
                appendAllPlayersToDivs();
            },
        });
    });
});

function appendAllPlayersToDivs() {
    // v sekcijo players vstavi podatke z igralci

    document.getElementById("playersContainer").innerHTML = "";
    prev = "";
    $.ajax({
        type: "post",
        url: "fetch.php",
        data: {},
        dataType: "json",
        success: function(data) {
            if (data.length > 0) {
                $.each(data, function(i) {
                    if (data[i].position != prev) {
                        //če igralčeva pozicija ni enaka prejšnjemu igralcu izpišem blok z napisi pozicij:
                        switch (data[i].position) {
                            case "1":
                                pripniIgralcem(
                                    "<p id='positions'>Point guards <i style='font-size:24px' class='fas'>&#xf138;</i></p>"
                                );
                                break;
                            case "2":
                                pripniIgralcem(
                                    "<p id='positions'>Shooting guards <i style='font-size:24px' class='fas'>&#xf138;</i></p>"
                                );
                                break;
                            case "3":
                                pripniIgralcem(
                                    "<p id='positions'>Small forwards <i style='font-size:24px' class='fas'>&#xf138;</i></p>"
                                );
                                break;
                            case "4":
                                pripniIgralcem(
                                    "<p id='positions'>Power forwards <i style='font-size:24px' class='fas'>&#xf138;</i></p>"
                                );
                                break;
                            case "5":
                                pripniIgralcem(
                                    "<p id='positions'>Centers <i style='font-size:24px' class='fas'>&#xf138;</i></p>"
                                );
                                break;
                        }
                    }
                    players =
                        "<div class='col mb-4'><div class='card flex-fill'> " +
                        "<img class='card-img-top' src='" +
                        data[i].image +
                        "' class='card-img-top' alt='alternative'>" +
                        "<div class='card-body'><button class='btn btn-small'>SELECT</button><h5 class='card-title'>" +
                        data[i].name +
                        "</h5>" +
                        "<p class='card-text'>" +
                        data[i].team +
                        "</br>position: " +
                        data[i].position +
                        " </p></div></div></div>";
                    prev = data[i].position;
                    pripniIgralcem(players);
                });
            }
        },
        error: function(xhr, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        },
    });
}

function pripniIgralcem(string) {
    $("div#playersContainer").append(string);
}