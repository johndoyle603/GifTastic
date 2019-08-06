$(document).ready(function() {

    let displayedButtons = ["Tony Soprano", "Christopher Moltisanti", "Silvio Dante", "Paulie Walnuts", "Uncle Junior", "Carmela Soprano", "Adriana La Cerva", "Meadow Soprano", "Furio Guinta", "Johnny Sack", "Livia Soprano", "Jennifer Melfi"];

    function displayImg() {

        $("#display-images").empty();
        let input = $(this).attr("data-name");
        let limit = 10;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            for (let j = 0; j < limit; j++) {

                let displayDiv = $("<div>");
                displayDiv.addClass("holder");

                let image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                let rating = response.data[j].rating;
                console.log(response);
                let pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderButtons() {

        $("#display-buttons").empty();

        for (let i = 0; i < displayedButtons.length; i++) {

            let newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("data-name", displayedButtons[i]);
            newButton.text(displayedButtons[i]);
            $("#display-buttons").append(newButton);
        }
    }

    function imageChangeState() {

        let state = $(this).attr("data-state");
        let animateImage = $(this).attr("data-animate");
        let stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitPress").on("click", function() {

        let input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});