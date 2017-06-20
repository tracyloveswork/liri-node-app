// Packages needed
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// fs is a core Node package for reading and writing files
var fs = require("fs");

// Load Keys
var keys = require("./keys.js");

// Variable for new Spotify object
var spotify = new Spotify(keys.spotifyKeys);

// Load Twitter Keys
var client = new Twitter(keys.twitterKeys);

// Load OMDB URL with Key
var omdb = keys.omdb;

// Variable for command argument
var input = process.argv[2];

// String from additional arguments after command
var searchName = "";
for (i=3;i<process.argv.length;i++){
			searchName += (process.argv[i] + " ");
		};
searchName = searchName.trim();


// Twitter function
function myTweets() {
	client.get('favorites/list', {count: 20, screen_name: "tracyx4755"}, function(error, tweets, response) {
  if(error) throw error;
  for (i=0;i<tweets.length;i++) {
	  console.log("Tweet: " + tweets[i].text + "\nCreated at: " + tweets[i].created_at); 
	  console.log("==============") ;
	 };
  // console.log(response);   
});
}; // End of myTweets function

// Spotify function
function spotifySong() {
	if (searchName == "") {
		searchName = "The Sign Ace of Base";
	};

console.log("Search String: " + searchName);

spotify.search(
	{ type: 'track', 
	query: searchName
	})
  .then(function(response) {
  	var result = response.tracks.items[0];
    // console.log(result);
    console.log("==============") ;

  	// Get artists
  	console.log("Artist(s): " + result.artists[0].name);

  	// Get song name
  	console.log("Track: " + result.name);

  	// Preview link
  	console.log("Preview: " + result.preview_url);

  	// Album
  	console.log("Album: " + result.album.name);
  	console.log("==============") ;

  })
  .catch(function(err) {
    console.log(error);
  });
}; // End of spotifySong function

// OMDB wtih request function
function movieThis() {
	if (searchName == "") {
		searchName = "Mr. Nobody";
	}

console.log("Search String: " + searchName);

var queryURL = omdb + "&t=" + searchName;

var options = {
  url: queryURL,
  headers: {
    'User-Agent': 'request'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(info);
    console.log("==============") ;
    // Title
    console.log("Title: " + info.Title);
    // Year
    console.log("Year: " + info.Year);
    // IMDB rating
    console.log("IMDB Rating: " + info.imdbRating);
    // Country
    console.log("Country: " + info.Country);
    // Language
    console.log("Language: " + info.Language);
    // Plot
    console.log("Plot: " + info.Plot);
    // Actors
    console.log("Actors: " + info.Actors);
    // Rotten Tomatoes
    console.log("Rotten Tomatoes URL: Not Available");
    console.log("==============") ;
  	};
	};	 
	request(options, callback);
}; // End of movieThis function

// fs function
function doWhatItSays () {

	fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  // Place data into an array
  var dataArr = data.split(",");

  searchName = dataArr[1];

  var command = dataArr[0];

  switch(command) {
  	case "my-tweets": 
  	myTweets();
  	break;
  	case "spotify-this-song": 
  	spotifySong();
  	break;
  	case "movie-this": 
  	movieThis();
  	break;
  	console.log("Not a valid command.");
  }
	
});
}; // End of fs function

// Take in command and run

  if (input == "my-tweets") {

  	myTweets();

} else if (input == "spotify-this-song"){ 

		spotifySong();

} else if (input == "movie-this"){ 

		movieThis();

} else if (input == "do-what-it-says"){ 

		doWhatItSays();

} else {

	console.log("That is not a valid command. \nPlease choose one of the following: my-tweets, spotify-this-song, movie-this or do-what-it-says.");

};


