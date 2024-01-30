const requestBody = {
  "id": "cours_search_query_2",
  "params": {
    "min": 0,
    "size": 24
  }
}

window.onload;

window.onload = async function () {
  //get all input 
  var debounceTimer;
  window.page = 1;

  window.resultsContainer = document.getElementById("coursContainer");
  window.pagination = document.getElementById("pagination-list");
  window.totalResult = 12;

  window.query_stringInput = document.getElementById("principalSearch");
  window.titleInput = document.getElementById("titleSearch");
  window.titleInput = document.getElementById("titleSearch");
  window.descriptionInput = document.getElementById("descriptionSearch");
  window.searchwordInput = document.getElementById("searchwordSearch");
  window.diplomationInput = document.getElementById("diplomationSearch");
  window.paysInput = document.getElementById("countrySearch");
  window.countryInput = document.getElementById("villeSearch");
  window.levelInput = document.getElementById("levelSearch");
  window.languageInput = document.getElementById("languageSearch");
  window.onlineInput = document.getElementById("onlineSearch");
  window.teaching_place = document.getElementById("orgunitSearch");
  window.providerInput = document.getElementById("diffuseurSearch");
  window.min_priceInput = document.getElementById("price-start");
  window.max_priceInput = document.getElementById("price-end");

  window.prixAscRadio = document.getElementById("prix_asc_radio");
  window.prixDescRadio = document.getElementById("prix_desc_radio");
  window.inscriptionAscRadio = document.getElementById("inscription_asc_radio");
  window.inscriptionDescRadio = document.getElementById("inscription_desc_radio");
  window.dateAscRadio = document.getElementById("date_asc_radio");
  window.dateDescRadio = document.getElementById("date_desc_radio");

  var titleSuggestionContainer = document.getElementById("titleSuggestions");
  var keywordSuggestionsContainer = document.getElementById("keywordSuggestions");
  var etablissementSuggestionsContainer = document.getElementById("etablissementSuggestions");
  var diffuseurSuggestionsContainer = document.getElementById("diffuseurSuggestions");

  const formElements = [
    "query_string", "title", "description", "teaching_place", "searchword", "diplomation", "country", "level", "language", "online", "provider", "min_price", "max_price"
  ];

  window.getAllCoursWithComposedRequest = async () => {
    console.log("Start of getallcours")

    /*
    //var diplomasInputValue = diplomasInput.value;
    //var orgunitInputValue = orgunitInput.value; //TODO
    var sort = [{ "id_document.keyword": "asc" }];
    var isPrixAsc = prixAscRadio.checked;
    var isPrixDesc = prixDescRadio.checked;
    var isInscriptionAsc = inscriptionAscRadio.checked;
    var isInscriptionDesc = inscriptionDescRadio.checked;
    var isDateAsc = dateAscRadio.checked;
    var isDateDesc = dateDescRadio.checked;*/

    //request
    var requestBody = {
      id: "cours_search_query_2",
      params: {
      }
    };

    //Set size
    requestBody.params['size'] = 12;
    //Set min 
    requestBody.params['min'] = requestBody.params['size'] * (page - 1);

    //Put all set fields in request body
    for (const elementName of formElements) {
      try {
        const inputValue = window[elementName + "Input"].value;
        if (inputValue != "") {
          requestBody.params[elementName] = inputValue;
        }
      } catch (error) {
        console.log(error, " occuring on the field ", elementName);
      }
    }

    //TODO:
    /*if (orgunitInputValue !== "") {
          requestBody.params['size'] = 12;
            nested: {
              path: "cdm_cours_a_orgunit",
              query: {
                match: {
                  "cdm_cours_a_orgunit.nom_orgunit": {
                    query : orgunitInputValue,
                    operator:"and",
                  }
                },
              },
            },
        });
    }*/
    console.log("Request body : ", requestBody);

    try {
      const data = await fetchCoursDate(requestBody);

      const res = await data.json();
      //totalResult = res.hits.total.value;
      //ResultsCount = res.hits.total.value;
      //updateResultCounts();
      console.log("data", res)
      renderCoursCompleteTemplate(res);
      //console.log("help please",res);
    } catch (e) {
      console.log("the error", e);
    }
  }

  function updateResultCounts() {
    jQuery("#ResultsCount").text(ResultsCount);
  }

  document.addEventListener('click', async (e) => {
    titleSuggestionContainer.style.display = "none";
    keywordSuggestionsContainer.style.display = "none";
    etablissementSuggestionsContainer.style.display = "none";
    diffuseurSuggestionsContainer.style.display = "none";
  })

  getAllCoursWithComposedRequest();

  const debouncedTitleInputHandler = debounce(async () => {
    try {
      let requestBody = createRequestBodyFunction();
    } catch (error) {
      console.log(error);
    }
    try {
      allTitle = [];
      const titles = await searchTitleService(requestBody);
      console.log("title response in input event listener:", titles)
      allTitle = titles.hits.hits;
      renderSearchedTitle(titles.hits.hits, titleSuggestionContainer);
      getAllCoursWithComposedRequest();
    }
    catch (error) {
      console.log(error);
    }
  }, 1000);



  titleInput.addEventListener("keyup", debouncedTitleInputHandler);

  //Loop to set input addEventListener to the fields 
  for (const elementName of formElements) {
    try {
      const element = window[elementName + "Input"];
      element.addEventListener("input", debounce(async () => {
        let requestBody = createRequestBodyFunction();
        MakeAndPrintRequest(requestBody);
      }, 1000));
    } catch (error) {
      console.log(error, " occuring on the field ", elementName);
    }
  }

  //Loop to set values for the dropdown menu 
  const dropdownElements = {
    "level": "cdm_cours_6_2_level.keyword",
    "country" : "cdm_cours_6_1_countryname", 
    "language": "cdm_cours_16_instructionlanguage",
    "online": "cdm_cours_12_2_teachingonline"
  }; //TODO:
  /*
  for (const [elementName, associatedField] of dropdownElements) {
    try {
      const element = window[elementName + "Input"];
      element.addEventListener("click", debounce(async () => {
        let requestBody = createRequestBodyFunction();
        MakeAndPrintRequest(requestBody);
      }, 1000));
    } catch (error) {
      console.log(error, " occuring on the field ", elementName);
    }
  }*/
  

  /*
    titleInput.addEventListener("click", async (e) => {
      let requestBody = createRequestBodyFunction();
      //const reqBody = createRequestBodyFunction();
      console.log("this is request body ", requestBody);
      console.log("request body In click author input listener", requestBody);
      try {
        //allTitle = [];
        //const titles = await searchTitleService(requestBody);
        MakeAndPrintRequest(requestBody);
        /*if (!titles) {
          return;
        }*//*
  renderSearchedTitle(titles.hits.hits, titleSuggestionContainer);
}
catch (error) {
  console.log(error);
}
})



titleSuggestionContainer.addEventListener("scroll", async () => {
let requestBody = createRequestBodyFunction();
console.log('title scroll ', requestBody);

if (
  titleSuggestionContainer.scrollTop + titleSuggestionContainer.clientHeight >=
  titleSuggestionContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
) {

  try {
    const latestTitle = allTitle[allTitle.length - 1];
    const response = await getTitleService(requestBody, latestTitle);
    console.log("this is response ", response);
    renderTitle(response.hits.hits, titleSuggestionContainer);
  } catch (e) {
    console.log("there is error ", e);
  }


}

})

const debouncedKeywordInputHandler = debounce(async () => {
let requestBody = createRequestBodyFunction();

try {
  allKeyword = [];
  const keywords = await searchKeywordService(requestBody);
  console.log("this is response of keywords ", keywords);
  renderSearchedKeywords(keywords.hits.hits, keywordSuggestionsContainer);
  getAllCoursWithComposedRequest();

}
catch (error) {
  console.log(error);
}
}, 1000);

keywordInput.addEventListener("keyup", debouncedKeywordInputHandler);

keywordInput.addEventListener('click', async (e) => {
e.stopPropagation();
let requestBody = createRequestBodyFunction();
try {
  allKeyword = [];
  const keywords = await searchKeywordService(requestBody);
  console.log("keywords response in click event listeners:", keywords);
  if (!keywords) {
    return;
  }
  renderSearchedKeywords(keywords.hits.hits, keywordSuggestionsContainer);
}
catch (error) {
  console.log(error);
}
})

keywordSuggestionsContainer.addEventListener('scroll', async (e) => {
let requestBody = createRequestBodyFunction();
console.log("Hello");
if (
  keywordSuggestionsContainer.scrollTop + keywordSuggestionsContainer.clientHeight >=
  keywordSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
) {

  try {
    let latestKeyWord = allKeyword[allKeyword.length - 1];
    const response = await getKeyWordScroll(requestBody, latestKeyWord);
    renderkeywords(response.hits.hits, keywordSuggestionsContainer);
  } catch (e) {
    console.log("there is error ", e);
  }
}
})

// les editeurs
const debouncedOrgunitInputHandler = debounce(async () => {
let requestBody = createRequestBodyFunction();

try {
  allEtablissement = [];
  const etablissement = await searchOrgunitService(requestBody);
  renderSearchedOrgunit(etablissement.hits.hits, etablissementSuggestionsContainer);
  getAllCoursWithComposedRequest();

}
catch (error) {
  console.log(error);
}
}, 1000);
orgunitInput.addEventListener("keyup", debouncedOrgunitInputHandler);


orgunitInput.addEventListener('click', async (e) => {
e.stopPropagation();
let requestBody = createRequestBodyFunction();
try {
  allEtablissement = [];
  const etablissement = await searchOrgunitService(requestBody);
  if (!etablissement) {
    return;
  }
  renderSearchedOrgunit(etablissement.hits.hits, etablissementSuggestionsContainer);
}
catch (error) {
  console.log(error);
}
})

etablissementSuggestionsContainer.addEventListener('scroll', async () => {

if (
  etablissementSuggestionsContainer.scrollTop + etablissementSuggestionsContainer.clientHeight >=
  etablissementSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
) {
  let requestBody = createRequestBodyFunction();

  try {
    let latestEtablissement = allEtablissement[allEtablissement.length - 1];
    const response = await getOrgunitService(requestBody, latestEtablissement);
    renderOrgunit(response.hits.hits, etablissementSuggestionsContainer);
  } catch (e) {
    console.log("there is error ", e);
  }
}
})



diffuseurInput.addEventListener("keydown", async () => {
let requestBody = createRequestBodyFunction();
console.log("requestBodyrequestBody", requestBody);
try {
  allDiffuseur = [];
  const diffuseur = await searchDiffuseurService(requestBody);
  getAllCoursWithComposedRequest();
  if (!diffuseur) {
    return;
  }

  renderSearchedDiffuseur(diffuseur.hits.hits, diffuseurSuggestionsContainer);

} catch (error) {
  console.log(error);
}
})

diffuseurInput.addEventListener("click", async () => {
let requestBody = createRequestBodyFunction();
try {
  const diffuseur = await searchDiffuseurService(requestBody);

  if (!diffuseur) {
    return;
  }

  renderSearchedDiffuseur(diffuseur.hits.hits, diffuseurSuggestionsContainer);

} catch (error) {
  console.log(error);
}
})

diffuseurSuggestionsContainer.addEventListener('scroll', async () => {
let requestBody = createRequestBodyFunction();
if (
  diffuseurSuggestionsContainer.scrollTop + diffuseurSuggestionsContainer.clientHeight >=
  diffuseurSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
) {

  try {
    const latestDiffuseur = allDiffuseur[allDiffuseur.length - 1];
    const response = await getDiffuseurService(requestBody, latestDiffuseur);
    console.log('this is response ', response);
    renderDiffuseur(response.hits.hits, diffuseurSuggestionsContainer);
  } catch (e) {
    console.log("there is error ", e);
  }
}
})
descriptionInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})

diplomasInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})

paysInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})

pricestartInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})
pricendInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})
languageInput.addEventListener('change', (e) => {
getAllCoursWithComposedRequest();
})
addressInput.addEventListener('change', (e) => {
getAllCoursWithComposedRequest();
})
levelInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})
villeInput.addEventListener('input', (e) => {
getAllCoursWithComposedRequest();
})

prixAscRadio.addEventListener("change", function () {
if (prixAscRadio.checked) {
  getAllCoursWithComposedRequest();
}
});

prixDescRadio.addEventListener("change", function () {
if (prixDescRadio.checked) {
  page = 1;
  getAllCoursWithComposedRequest();
}
});

inscriptionAscRadio.addEventListener("change", function () {
if (inscriptionAscRadio.checked) {
  getAllCoursWithComposedRequest();
}
});

inscriptionDescRadio.addEventListener("change", function () {
if (inscriptionDescRadio.checked) {
  getAllCoursWithComposedRequest();
}
});

dateAscRadio.addEventListener("change", function () {
if (dateAscRadio.checked) {
  getAllCoursWithComposedRequest();
}
});

dateDescRadio.addEventListener("change", function () {
if (dateDescRadio.checked) {
  getAllCoursWithComposedRequest();
}
});
*/
}
