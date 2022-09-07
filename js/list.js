async function favouritelist() {
  //get movies data from local storage
  const movies = JSON.parse(localStorage.getItem("movies"));
  const favouritelist = document.getElementById("favourte-list");
  favouritelist.innerHTML = "";

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    //check if movie is not repeated
    if (!document.getElementById(movie.id)) {
      //create a div for each movie
      const moviedom = `
        <div class="col mb-4">
                <div class="card bg-dark" style="width: 15rem;" id="${movie.id}">
                <img src="${movie.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text my-1">${movie.year}</p>
                <p class="card-text my-1 rating">${movie.rating}</p>
                <p class="card-text">${movie.plot}</p>
                <a href="info.html"  class="btn btn-primary info-btn">Get Details</a>
                <a href="list.html" class="btn btn-primary remove-fav" > <i class="fas fa-trash"></i></a>
                </div>
                </div>
        </div>`;
      //append the movie to the movies list
      favouritelist.innerHTML += moviedom;
    }
  }
  //Remove from favorties list
  const removeBtn = document.querySelectorAll(".remove-fav");
  removeBtn.forEach((btn) => {
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
      //find the movie in the local storage and update list and save it back to local storage
      let movies = JSON.parse(localStorage.getItem("movies"));
      movies.forEach((movie, index) => {
        if (movie.id == btn.parentElement.parentElement.id) {
          movies.splice(index, 1);
        }
      });
      localStorage.setItem("movies", JSON.stringify(movies));
    });
  });
  //get details of the movie
  const infoBtn = document.querySelectorAll(".info-btn");
  infoBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const movieId = e.target.parentElement.parentElement.id;
      console.log(movieId);
      localStorage.setItem("movie-details", movieId);
    });
  });
}
favouritelist();
