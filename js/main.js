const cardSection = document.querySelector(".card__section");

fetch("https://www.omdbapi.com/?apikey=8e8c30a0&s=spider-man")
  .then((resp) => resp.json())
  .then((resp) => {
    const movie = resp.Search;
    let cardHome = "";

    movie.forEach((mov) => {
      cardHome += cardsMovie2(mov);

      cardSection.innerHTML = cardHome;
    });
  })
  .catch((err) => console.log(err.message));

const inputSearch = document.querySelector(".search__input");
const formControl = document.querySelector(".form__control");

formControl.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(`https://www.omdbapi.com/?apikey=8e8c30a0&s=${inputSearch.value}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const movie = resp.Search;
      let searchCard = "";

      movie.forEach((mov) => {
        searchCard += cardsMovie(mov);
        cardSection.innerHTML = searchCard;
      });

      const cardButton = document.querySelectorAll(".card__button");
      cardButton.forEach(function (card) {
        card.addEventListener("click", function () {
          fetch(
            `https://www.omdbapi.com/?apikey=8e8c30a0&i=${this.dataset.imdb}`
          )
            .then((resp) => resp.json())
            .then((resp) => {
              const detailsMovie = movieDetails(resp);
              const modalDetails = document.querySelector(".modal__details");

              modalDetails.innerHTML = detailsMovie;
            })
            .catch((err) => console.log(err.message));
        });
      });
    })
    .catch((err) => console.log(err.message));
  inputSearch.value = "";
});

function cardsMovie(m) {
  return `<div class="col-sm-6 col-md-3 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top card__image" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-danger card__button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdb="${m.imdbID}">Details</a>
            </div>
          </div>
        </div>`;
}

function cardsMovie2(m) {
  return `<div class="col-sm-6 col-md-3 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top card__image" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            </div>
          </div>
        </div>`;
}

function movieDetails(d) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${d.Poster}" alt="" class="img-fluid" />
                </div>

                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item"><h3>${d.Title} (${d.Year})</h3></li>
                    <li class="list-group-item"><strong>Rated :</strong> ${d.Rated}</li>
                    <li class="list-group-item"><strong>Rating :</strong> ${d.imdbRating}</li>
                    <li class="list-group-item"><strong>Released :</strong> ${d.Released}</li>
                    <li class="list-group-item"><strong>Runtime :</strong> ${d.Runtime}</li>
                    <li class="list-group-item"><strong>Genre :</strong> ${d.Genre}</li>
                    <li class="list-group-item"><strong>Directors :</strong> ${d.Director}</li>
                    <li class="list-group-item"><strong>Actors :</strong> ${d.Actors}</li>
                    <li class="list-group-item">
                      <strong>Plot :</strong> <br />
                      ${d.Plot}
                    </li>
                  </ul>
                </div>
              </div>
            </div>`;
}
