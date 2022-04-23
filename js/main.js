$.ajax({
  url: `http://www.omdbapi.com/?apikey=8e8c30a0&s=avengers`,
  success: (results) => {
    const mov = results.Search;
    let cards = "";

    mov.forEach((m) => {
      cards += cardsMovie2(m);
    });
    $(".card__section").html(cards);
  },

  error: (er) => {
    console.log(er.responseText);
  },
});

$(".form__control").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: `http://www.omdbapi.com/?apikey=8e8c30a0&s=${$(
      ".search__input"
    ).val()}`,
    success: (results) => {
      const mov = results.Search;
      let cards = "";

      mov.forEach((m) => {
        cards += cardsMovie(m);
      });
      $(".card__section").html(cards);

      $(".card__button").on("click", function () {
        $.ajax({
          url: `http://www.omdbapi.com/?apikey=8e8c30a0&i=${$(this).data(
            "imdb"
          )}`,
          success: (d) => {
            const movDetails = movieDetails(d);
            $(".modal__details").html(movDetails);
          },
          error: (er) => {
            console.log(er.responseText);
          },
        });
      });
    },
    error: (er) => {
      console.log(er.responseText);
    },
  });
});

function cardsMovie(m) {
  return `<div class="col-sm-6 col-md-3 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top card__image" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary card__button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdb="${m.imdbID}">Details</a>
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
