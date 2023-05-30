const wordInput = document.getElementById("word-input");
const form = document.querySelector("form");
const rootUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const div = document.createElement("div");
const mainContainer = document.createElement("div");
const meaningOl = document.createElement("ol");

//form submit
form.addEventListener("submit", (event) => {
   event.preventDefault();
   //reset previous results
   clearDivs();
   //API fetch
   fetch(rootUrl + wordInput.value)
      .then((response) => {
         return response.json();
      })
      .then((donnees) => {
         console.log(donnees[0].word);
         console.log(donnees[0]);
         //creating main-container
         createHTMLElement("div", "body", {
            id: "main-container",
            className: "main-container",
         });
         //creating a container displaying searched word
         createHTMLElement("div", ".main-container", {
            id: "word-container",
            textContent: "You searched for the word: " + donnees[0].word,
            className: "word-" + donnees[0].word,
         });
         console.log(donnees[0]);
         var meanings = donnees[0].meanings;
         //creating a paragraph to include phonetic definition if existing
         let phonetic = donnees[0].phonetic;
         console.log(phonetic);
         if (phonetic) {
            createHTMLElement("p", "#word-container", {
               id: "phonetic-writing",
               className: "phonetic",
               textContent: "Main phonetic: " + phonetic,
            });
         }

         //creating a div to include audio and source url for each phonetics if existing
         for (let a = 0; a < donnees[0].phonetics.length; a++) {
            if (donnees[0].phonetics[a].audio) {
               createHTMLElement("div", "#word-container", {
                  className: "audio-div",
                  id: "audio-" + a,
               });

               let audioUrl = donnees[0].phonetics[a].audio;
               audioLanguage = audioUrl.slice(-6, -4);
               createHTMLElement("img", "#audio-" + a, {
                  className: "language",
                  id: "audio-language" + a,
               });
               const flag = document.querySelector("#audio-language" + a);
               switch (audioLanguage) {
                  case "us":
                     flag.src =
                        "/src/assets/pics/Flag_of_the_United_States.svg";
                     break;
                  case "uk":
                     flag.src =
                        "/src/assets/pics/Flag_of_the_United_Kingdom_(3-5).svg";
                     break;
                  case "ca":
                     flag.src = "/src/assets/pics/Flag_of_Canada.svg";
                     break;
               }

               createHTMLElement("audio", "#audio-" + a, {
                  controls: "true",
                  id: "audioplayer-" + a,
                  src: audioUrl,
               });

               createHTMLElement("a", "#audio-" + a, {
                  id: "license-name",
                  textContent: donnees[0].phonetics[a].license.name,
                  href: donnees[0].phonetics[a].license.url,
                  className: "credits",
               });
            }
         }

         //creating a container for each meaning of this word
         for (let i = 0; i < meanings.length; i++) {
            createHTMLElement("div", ".main-container", {
               id: meanings[i].partOfSpeech + "-" + [i],
               className: "part-of-speech",
               textContent: meanings[i].partOfSpeech,
            });

            //at first, for each meaning, we display synonyms
            if (meanings[i].synonyms.length > 0) {
               const joinedSynonyms = meanings[i].synonyms.join(", ");
               createHTMLElement(
                  "div",
                  "#" + meanings[i].partOfSpeech + "-" + [i],
                  {
                     id: meanings[i].partOfSpeech + "-" + [i] + "-synonyms",
                     textContent: "synonyms: " + joinedSynonyms,
                     className: "meaning-synonyms",
                  }
               );
            }
            //at first, for each meaning, we display antonyms

            if (meanings[i].antonyms.length > 0) {
               const joinedAntonyms = meanings[i].antonyms.join(", ");
               createHTMLElement(
                  "div",
                  "#" + meanings[i].partOfSpeech + "-" + [i],
                  {
                     id: meanings[i].partOfSpeech + "-" + [i] + "-antonyms",
                     textContent: "antonyms: " + joinedAntonyms,
                     className: "meaning-antonyms",
                  }
               );
            }
            //we creat a title field for definitions
            createHTMLElement(
               "h2",
               "#" + meanings[i].partOfSpeech + "-" + [i],
               {
                  id: meanings[i].partOfSpeech + "-",
                  textContent: "Definitions:",
                  className: "title",
               }
            );

            //we create an organised list for definitions
            createHTMLElement(
               "ol",
               "#" + meanings[i].partOfSpeech + "-" + [i],
               {
                  id: "ol" + meanings[i].partOfSpeech,
                  className: "organised-list",
               }
            );
            for (let j = 0; j < meanings[i].definitions.length; j++) {
               createHTMLElement("li", "#" + "ol" + meanings[i].partOfSpeech, {
                  id: meanings[i].partOfSpeech + "-" + [i] + "definition-" + j,
                  className: "definitions",
                  textContent: meanings[i].definitions[j].definition,
               });

               //if the definition got an example, we append it
               if (meanings[i].definitions[j].example) {
                  createHTMLElement(
                     "div",
                     "#" +
                        meanings[i].partOfSpeech +
                        "-" +
                        [i] +
                        "definition-" +
                        j,
                     {
                        id: "definition-" + [j] + "-example",
                        textContent:
                           "example: " + meanings[i].definitions[j].example,
                        className: "definition-example",
                     }
                  );
               }
               //if the definition got a synonym, we append it

               if (meanings[i].definitions[j].synonyms) {
                  for (
                     let k = 0;
                     k < meanings[i].definitions[j].synonyms.length;
                     k++
                  ) {
                     createHTMLElement(
                        "div",
                        "#" +
                           meanings[i].partOfSpeech +
                           "-" +
                           [i] +
                           "definition-" +
                           j,
                        {
                           id: "synonyms-" + meanings[i].definitions[j],
                           textContent:
                              "synonyms: " +
                              meanings[i].definitions[j].synonyms,
                           className: "definition-synonyms",
                        }
                     );
                  }
               }
               //if the definition got an antonym, we append it
               if (meanings[i].definitions[j].antonyms) {
                  for (
                     let k = 0;
                     k < meanings[i].definitions[j].synonyms.length;
                     k++
                  ) {
                     createHTMLElement(
                        "div",
                        "#" +
                           meanings[i].partOfSpeech +
                           "-" +
                           [i] +
                           "definition-" +
                           j,
                        {
                           id: "antonyms-" + meanings[i].definitions[j],
                           textContent:
                              "antonyms: " +
                              meanings[i].definitions[j].antonyms,
                           className: "definition-antonyms",
                        }
                     );
                  }
               }
            }
         }
      });
});

function clearDivs() {
   let containerDiv = document.querySelector("#main-container");
   console.log(containerDiv);
   if (containerDiv) {
      containerDiv.innerHTML = "";
   }
}

function createHTMLElement(tagName, source, properties) {
   const element = document.createElement(tagName);
   sourceElement = document.querySelector(source);
   sourceElement.appendChild(element);

   for (const property in properties) {
      element[property] = properties[property];
   }

   return element;
}
