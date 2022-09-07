const OMDB_API = "https://www.omdbapi.com/?apikey=bcc3ca35";
const moviesInfo = document.getElementById("detail");
async function info() {
  //get the id of the movie from the url
  const movieid = localStorage.getItem("movie-details");
  //fetch the movie details from the api by id
  const movieinfo = await fetch(`${OMDB_API}&i=${movieid}`);
  const moviedata = await movieinfo.json();
  const moviem = `
  <div class="movie_card" id="bright">
   <div class="info_section">
    <div class="movie_header">
      <img class="locandina" src="${moviedata.Poster}"/>
      <h1>${moviedata.Title}</h1>
      <h4>${moviedata.Year}, ${moviedata.Actors}</h4>
      <span class="minutes">${moviedata.Runtime} </span>
      <span class="minutes">${moviedata.imdbRating} </span>
      <p class="type">${moviedata.Genre}</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        ${moviedata.Plot}
      </p>
    </div>
    <div class="movie_social">
      <ul>
        <li><i class="fa-solid fa-share-from-square"></i></li>
        <li><i class="fa-solid fa-heart"></i></li>
        <li><i class="fa-solid fa-comment"></i></li>
      </ul>
    </div>
    </div>
    <div class="blur_back bright_back" id="background_img"></div>
    </div>
  `;
  moviesInfo.innerHTML = moviem;
  //for the background image
  var background_img = document.getElementById("background_img");
  background_img.style.backgroundImage = `url(${moviedata.Poster})`;
}
info();
