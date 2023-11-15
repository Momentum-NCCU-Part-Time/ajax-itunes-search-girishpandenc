const iTuneUrl = "https://itunes.apple.com/search?term=";
const previewUrl = "https://geo.itunes.apple.com/us/album/";
let searchForm = document.getElementById("searchForm");
let searchTerm = document.getElementById("searchField");
let button = document.getElementById("searchButton");
let results = document.getElementById("results");
let container = document.getElementById("container");
let playPreview = document.getElementById("previewUrl");
let songTitle = document.getElementById("trackName");


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let term = searchTerm.value;

  document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
     })

     while (container.firstChild) {
      container.removeChild(container.firstChild);
  }

  fetch(iTuneUrl + term + "&media=music").then((response)=> {
    if (response.status === 200) {
      return response.json();
    } else {
         let errorMsg = document.createElement ('h2');
         errorMsg.innerText = "API call fialed, please try again.";
         results.appendChild(errorMsg);
    }
  }).then((parsedJsonResponse) => {
      console.log(parsedJsonResponse);
      const songs = parsedJsonResponse.results;
      return songs.map(results => {
          const songTile = document.createElement("div"),
          artist = document.createElement('h2'),
          song = document.createElement('h2'),
          img = document.createElement('img'),
          playButton = document.createElement('button')
          
          playButton.innerText = "Play Preview"

          playButton.addEventListener('click', (event) => {
            event.preventDefault();
            playPreview.src = results.previewUrl;
            songTitle.innerText += " " + results.trackName;
          })

          artist.innerHTML = results.artistName;
          song.innerHTML = results.trackName;
          img.src = results.artworkUrl100;
          

          songTile.appendChild(img);
          songTile.appendChild(song);
          songTile.appendChild(artist);
          songTile.appendChild(playButton);

          container.appendChild(songTile);
      })
  })
})