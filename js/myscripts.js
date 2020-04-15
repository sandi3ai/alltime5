$(document).ready(function(){

    $("#succesInput").hide();




    $("#addButton").click(function(){
        var name=$("#inputName").val() + " " + $("#inputSurname").val();
        var team=$("#inputTeam").val();
        var position=$("#inputPosition").val();
        var image=$("#inputImage").val();

        //Vnos iz forme preko ajaxa na php
        $.ajax({
            url:'insert.php',
            method:'POST',
            data:{
                name:name,
                team:team,
                position:position,
                image:image
            },
            success:function(data){
                $('#inputName').val("");
                $('#inputSurname').val("");
                $('#inputTeam').val("");
                $('#inputPosition').val("");
                $('#inputImage').val("");
                $('#succesInput').show("slow");
            }
        });

    });


});

