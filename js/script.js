//OMDB API
const OMDB_API = "https://www.omdbapi.com/?apikey=bcc3ca35";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//function to fetch data from OMDB API
let prevval="";
async function getMovies(val) {
  if (val.length > 2) {
    //if input val is not changed, do not fetch data
    if(val==prevval){
      return;
    }
    prevval = val;
    const res = await fetch(`${OMDB_API}&s=${val}`);
    let data = await res.json();
    const movieslist = document.getElementById("movies-list");
    movieslist.innerHTML = "";
    //loop through the data and display the results
    for (let i = 0; i < data.Search.length; i++) {
      const movie = data.Search[i];
      //check if movie is not repeated
      if (!document.getElementById(movie.imdbID)) {
        const movieDetail = await fetch(`${OMDB_API}&i=${movie.imdbID}`);
        const movieDetailData = await movieDetail.json();
        if (
          movieDetailData.Poster == "N/A" ||
          movieDetailData.Plot == "N/A" ||
          movieDetailData.imdbRating == "N/A"
        ) {
          continue;
        }
        //create a div for each movie
        const moviedom = `
        <div class="col mb-4 ">
            <div class="card bg-dark" style="width: 15rem;" id="${movie.imdbID}">
            <img src="${movie.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text m-0">${movie.Year}</p>
            <p class="card-text rating">${movieDetailData.imdbRating}</p>
            <p class="card-text">${movieDetailData.Plot}</p>
            <a href="info.html"  class="btn btn-primary bg-success info-btn">Get Details</a>
            <a href="javascript:void(0)" class="btn btn-primary bg-warning add-fav" >Add To <i class="fas fa-heart"></i></a>
            </div>
            </div>
        </div>`;
        //append the movie to the movies list
        movieslist.innerHTML += moviedom;
      }
    }
    //Add to favorties list
    const favBtn = document.querySelectorAll(".add-fav");
    favBtn.forEach((btn) => {
      //add event listener to each button
      btn.addEventListener("click", () => {
        //get all the data of the movie from the card
        const movie = {
          id: btn.parentElement.parentElement.id,
          title: btn.parentElement.children[0].textContent,
          year: btn.parentElement.children[1].textContent,
          rating: btn.parentElement.children[2].textContent,
          plot: btn.parentElement.children[3].textContent,
          poster: btn.parentElement.parentElement.children[0].src,
        };
        let movies = JSON.parse(localStorage.getItem("movies"));
        if (movies == null) {
          movies = [];
        }
        //Check if movie is already in the list
        const movieExist = movies.find((m) => m.id == movie.id);
        if (movieExist) {
          alert("Movie is already in the list");
        } else {
          movies.push(movie);
          //this will add the movie to the local storage
          localStorage.setItem("movies", JSON.stringify(movies));
          alert("Movie added to the list");
          btn.innerHTML = "Added <i class='fas fa-heart'></i>";
        }
      });
    });

    //For details page
    const infoBtn = document.querySelectorAll(".info-btn");
    infoBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const movieId = e.target.parentElement.parentElement.id;
        console.log(movieId);
        //storing the movie id in the local storage
        localStorage.setItem("movie-details", movieId);
      });
    });
  }
}
// Event listener for search field
window.addEventListener("load", () => {
  searchInput.addEventListener("keyup", (e) => {
    //Check if values are characters
    getMovies(searchInput.value);
  });

  searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value;
    if (searchValue) {
      getMovies(searchValue);
    }
  });
});
