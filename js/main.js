// const searchButton = document.querySelector('.search__button');

// function search() {
//   searchButton.addEventListener('click', () => {
//     const searchInput = document.querySelector('.search__input').value;
//     return searchInput;
//   });
// }

$.ajax({
  url: `http://www.omdbapi.com/?apikey=8e8c30a0&s=marvel`,
  success: (results) => {
    const mov = results.Search;
    const cardSection = document.querySelector('.card__section');
    let cards = '';

    mov.forEach((m) => {
      cards += cardsMovie(m);
    });

    cardSection.innerHTML = cards;
  },
  error: (er) => {
    console.log(er.responseText);
  },
});

function cardsMovie(m) {
  return `<div class="col-sm-6 col-md-3 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top card__image" alt="" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
            </div>
          </div>
        </div>`;
}
