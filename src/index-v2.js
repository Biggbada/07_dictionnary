const wordInput = document.getElementById("word-input");
const form = document.querySelector("form");
const rootUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const div = document.createElement("div");
const mainContainer = document.createElement("div");
const meaningsContainers = document.createElement("div");
const partOfSpeechContainers = document.createElement("div");
const definitionsContainers = document.createElement("div");
const definitionContainers = document.createElement("div");

form.addEventListener("submit", (event) => {
   event.preventDefault();
   clearDivs();
   fetch(rootUrl + wordInput.value)
      .then((response) => {
         return response.json();
      })
      .then((donnees) => {
         console.log(donnees[0].word);

         createMainContainer();
         createContainer(
            "main-container",
            "word-container",
            "You searched for the word: " + donnees[0].word,
            "word-" + donnees[0].word
         );
         console.log(donnees[0]);
         var meanings = donnees[0].meanings;
         console.log(meanings);
         console.log(meanings.length);
         for (let i = 0; i < meanings.length; i++) {
            console.log(meanings[i].partOfSpeech);
            createContainer(
               "main-container",
               meanings[i].partOfSpeech + "-" + [i],
               meanings[i].partOfSpeech,
               "part-of-speech"
            );
            console.log(meanings[i].synonyms);
            meanings.forEach((element, i) => {
               element; //
               console.log(element.partOfSpeech);
               // createContainer(
               //    ".main-container",
               //    element.partOfSpeech,
               //    element.partOfSpeech
               // );
               var partOfSpeechDefinitions = element.definitions;
               console.log(partOfSpeechDefinitions);

               partOfSpeechDefinitions.forEach((element2) => {
                  var definitionsDefinition = element2.definition;
                  console.log(definitionsDefinition);

                  // console.log(partOfSpeechDefinitions);
               });
            });
            if (meanings[i].synonyms.length > 0) {
               const joinedSynonyms = meanings[i].synonyms.join(", ");
               createContainer(
                  meanings[i].partOfSpeech + "-" + [i],
                  meanings[i].partOfSpeech + "-" + [i] + "-synonyms",
                  "synonyms: " + joinedSynonyms,
                  "meaning-synonyms"
               );
            }

            if (meanings[i].antonyms.length > 0) {
               const joinedAntonyms = meanings[i].antonyms.join(", ");
               createContainer(
                  meanings[i].partOfSpeech + "-" + [i],
                  meanings[i].partOfSpeech + "-" + [i] + "-antonyms",
                  "antonyms: " + joinedAntonyms,
                  "meaning-antonyms"
               );
            }

            console.log(meanings[i].definitions);
            console.log(meanings[i].definitions.length);

            if (meanings[i].definitions) {
               const newOl = document.createElement("ol");
               newOl.id = "ol-" + [i];
               let blocOl = document.getElementById(
                  meanings[i].partOfSpeech + "-" + [i]
               );
               console.log(blocOl);

               console.log(meanings[i].definitions.length);
               for (let j = 0; j < meanings[i].definitions.length; j++) {
                  console.log(meanings[i].definitions[j].example);
                  console.log("dans la boucle");

                  createContainer(
                     meanings[i].partOfSpeech + "-" + [i],
                     meanings[i].partOfSpeech + "-" + [i] + "definition-" + j,
                     "definition (" +
                        (j + 1) +
                        "): " +
                        meanings[i].definitions[j].definition,
                     "definitions"
                  );

                  if (meanings[i].definitions[j].example) {
                     createContainer(
                        meanings[i].partOfSpeech + "-" + [i],
                        "definition-" + [j] + "-example",
                        "example: " + meanings[i].definitions[j].example,
                        "definition-example"
                     );
                  }
                  if (meanings[i].definitions[j].synonyms) {
                     for (
                        let k = 0;
                        k < meanings[i].definitions[j].synonyms.length;
                        k++
                     ) {
                        console.log(
                           "this one" + meanings[i].definitions[j].synonyms[k]
                        );
                     }
                  }
                  // createContainer(
                  //    meanings[i].partOfSpeech + "-" + [i],
                  //    "definition-" + [j] + "-example",
                  //    "example: " + meanings[i].definitions[j].example,
                  //    "definition-example"
                  // );
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

function createContainer(sourceId, destId, content, divClass) {
   console.log(sourceId);
   const origin = document.getElementById(sourceId);
   console.log(origin);
   const newDiv = document.createElement("div");
   origin.appendChild(newDiv);
   newDiv.id = destId;
   newDiv.textContent = content;
   newDiv.className = divClass;
   //    origin.createElement(div);
   //    origin.appendChild(div);
}

function createMainContainer() {
   document.body.appendChild(mainContainer);
   mainContainer.className = "main-container";
   mainContainer.id = "main-container";
}

// function createMeaningsContainers(meaning) {
//    mainContainer.prepend(meaningsContainers);
//    meaningsContainer.className = "meanings-containers";
//    meaningsContainers.id = meaning;
// }

// function createPartOfSpeechContainers(
//    meaningSource,
//    partOfSpeechName,
//    partOfSpeechContent
// ) {
//    meaningSource.prepend(partOfSpeechContainers);
//    partOfSpeechContainers.className = "part-of-speech-containers";
//    partOfSpeechContainers.id = partOfSpeechName;
//    partOfSpeech.textContent = partOfSpeechContent;
// }

// function createDefinitionsContainers(
//    partOfSpeechSource,
//    definitionName,
//    definitionContent
// ) {
//    partOfSpeechSource.prepend(definitionsContainers);
//    definitionsContainers.className = "definitions-containers";
//    definitionsContainers.id = definitionName;
//    definitionsContainers.textContent = definitionContent;
// }

// function createDefinitionContainers(
//    definitionsSource,
//    definitionName,
//    definitionContent
// ) {
//    definitionsSource.prepend(definitionContainers);
//    definitionContainers.className = "definition-containers";
//    definitionContainers.id = definitionName;
//    definitionContainers.textContent = definitionContent;
// }
