// Initial array of animals
var topics = ["Badger", "Dog", "Giraffe", "Elephant"];

// displaygiphyInfo function re-renders the HTML to display the appropriate content
function displaygiphyInfo() {

  var animalChosen = $(this).attr("data-name");
  var apiKey = "WCHN2qn2SF0CSj3127OzqiC8YPm0oUXl"
  var q = animalChosen;

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey + "&limit=10"


  // Creating an AJAX call for the specific giphy button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    //TODO delete this later
    console.log(response);

    // Creating a div to hold the giphy
    var giphyDiv = $("<div class='giphy'>");

    // Storing the rating data
    var rating = response.data[0].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    giphyDiv.append(pOne);

    // Retrieving the URL for the image
    var imgURL = response.data[0].images["480w_still"].url;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    giphyDiv.append(image);

    // Putting the entire giphy above the previous giphys
    $("#buttons-view").prepend(giphyDiv);
  });

}

// Function for displaying giphy data
function renderButtons() {

  // Deleting the giphys prior to adding new giphys
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of giphys
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of giphy-btn to our button
    a.addClass("giphy-btn");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a giphy button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var giphy = $("#giphy-input").val().trim();

  // Adding giphy from the textbox to our array
  topics.push(giphy);

  // Calling renderButtons which handles the processing of our giphy array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "giphy-btn"
$(document).on("click", ".giphy-btn", displaygiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();