const wordInput = document.getElementById('word-input');
const form = document.querySelector('form');
const rootUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"


form.addEventListener('submit', event => {
        event.preventDefault();
        var promesse = fetch(rootUrl+ wordInput.value);
        promesse.then((response) => {
            console.log(response);
        var jsonResponse = response.json();
        console.log(jsonResponse[0]);
        console.log(jsonResponse.lenght);

        
        jsonResponse.then (donnees => {
            console.log(donnees[0].word);
            console.log(donnees[0].meanings);
        })
        for (let i = 0; i < jsonResponse.lenght; i++) {
            console.log(response[i]);

        }
        });
        promesse.then (datas => {
            console.log(datas[0]);
        })
        promesse.catch((errors) => {
            console.log('erreurs' + errors);
        })
});


//let's get meaning 1 by one
