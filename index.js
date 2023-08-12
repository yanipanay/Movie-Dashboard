const keyInput = document.getElementById("api_key");
const searchString = document.getElementById("search");

async function getData(key, name) {
  try {
    const data = await fetch(
      `https://www.omdbapi.com/?s=${name}&apikey=${key}`
    );
    const movies = await data.json();

    // console.log(movies.Response);

    if (movies.Response === "True") {
      showMovieCards(movies.Search);
    } else throw movies;
  } catch (error) {
    showError(error);
  }
}

// getData();

function showMovieCards(movies) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const movie = movies[i];
    const poster = movie.Poster;
    const title = movie.Title;
    const year = movie.Year;
    const imdb = movie.imdbID;

    card.innerHTML = `<div class="image">
    <img
      src=${poster}
      alt="poster"
      width="250px"
    />
  </div>
  <div class="details">
    <div class="title">${title}</div>
    <div class="year">${year}</div>
    <a href="https://www.imdb.com/title/${imdb}/" class="imdb">More Details</a>
  </div>`;

    container.appendChild(card);
  }
}

function showError(movies) {
  const message = movies.Error;
  const container = document.getElementById("container");
  container.innerHTML = "";
  const errorCard = document.createElement("div");
  errorCard.className = "error";

  errorCard.innerHTML = `Unable to fetch the data
  <div class="errorMessage">${message}</div>`;

  container.appendChild(errorCard);
}

function showLoading() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  const loadingCard = document.createElement("div");
  loadingCard.className = "loading";
  container.appendChild(loadingCard);
}

function searchMovies() {
  const key = keyInput.value;
  const name = searchString.value;

  if (key == "" || name == "") return;
  showLoading();
  getData(key, name);

  keyInput.value = "";
  searchString.value = "";
}
