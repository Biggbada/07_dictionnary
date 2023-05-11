const wordInput = document.getElementById("word-input");
const form = document.querySelector("form");
const rootUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(rootUrl + wordInput.value)
    .then((response) => {
      return response.json();
    })
    .then((donnees) => {
      console.log(donnees[0].word);
      console.log(donnees[0].meanings);

      var meanings = donnees[0].meanings;
      for (let i = 0; i < meanings.length; i++) {
        console.log(meanings[i]);
      }
    });
});
//let's get meanings 1 by one
