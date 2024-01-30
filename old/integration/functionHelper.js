/**
 * Delay execution between function execution if too many call
 * @param {*} func : function to execute
 * @param {*} delay : in miliseconds, the wanted delay
 * @returns the result of the function executed
 */
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * Build the html for an item  
 * @param {*} item 
 * @param {*} id 
 * @returns HTML code 
 */
function renderCoursCard(item, id) {
  var itemID = item.cdm_cours_1_id;
  // PRIX
  var price = item.cdm_cours_19_2_expensesprice.price;
  if (price == 0) {
    price = "GRATUIT";
  } else {
    price = price + " €";
  }

  var itemTitle = item.cdm_cours_2_title[0].text;

  var itemLang = item.cdm_cours_2_title[0].lang.toUpperCase()

  var itemImage = item.cdm_cours_27_urlimagecourse

  var link = item['cdm_cours_29_4_logoprovider'];
  var itemDistributorLogo = "https://wei.parene.org" + link

  var HTML_item_top_header = `
                <div class="align-self-center">
                    <div class="badge bg-bleu">${itemLang}</div>
                </div>`;

  var HTML_item_top_content = `
                <div class="parene-badge bg-primary rounded-pill badge-item bg-white">${price}</div>`;

  var HTML_item_content = `
                <div class="item-content-div item-diffuseur">
                    <div class="mb-1";>Diffuseur:</div>
                    <img src="${itemDistributorLogo}" class="item-diffuseur-img">
                </div>`;

  var CSS_item_title = "item-title-height";
  var itemLink = "/cours/detail/?id=" + id;

  return `
                  <div class="col-md-6 col-lg-4 mb-5">
                    <div class="one-product h-100 rounded shadow-border">
                        <div class="item-top">
                            <div class="item-top-wrapper text-center p-3 pb-2">
                                <div class="item-top-header mb-3">
                                    ${HTML_item_top_header}
                                </div>
                                <div class="item-top-img-wrapper mb-2" data-id="${itemID}">
                                    <img class="item-top-img" src="${itemImage}">
                                    ${HTML_item_top_content}
                                </div>
                            </div>
                        </div>
                        <div class="item-content">
                            <div class="item-content-wrapper text-center pt-4 px-4 pb-3">
                                <div class="item-content-box">
                                    <div class="item-title ${CSS_item_title}">${itemTitle}</div>
                                    ${HTML_item_content}
                                </div>
                                <div class="item-content-detailButton">
                                    <a class="parene-btn bg-bleu btn-small" href="${itemLink}" role="button">Plus de détails</a>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>`;
}

const renderCoursCompleteTemplate = (data) => {
  console.log("datadatadatadata", data);
  var hits = data.hits.hits;
  var templates = hits.map((hit) => renderCoursCard(hit._source, hit._id));
  completeTemplate = templates.join("");
  resultsContainer.innerHTML = completeTemplate;
  totalResult = data.hits.total.value;
  total = Math.ceil(totalResult / 12);
  getPaginationList(page, total).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    response.json().then(res => {
      console.log("this a result of data ", JSON.parse(res).data);
      const content = JSON.parse(res);
      const paginationHTML = rednerPaginationElement(content);

      pagination.innerHTML = paginationHTML;
      allLink = pagination.getElementsByClassName('page-numbers');
      allLink.forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          var currentElement = e.target;
          allLink.forEach(res => {
            res.classList.remove('current');
          })
          currentElement.classList.add('current');
          page = parseInt(currentElement.innerText);
          alert(page);
          getAllCoursWithCoposedRequest()
        })
      })
    })
    // Read the response body as text
  })
    .catch(error => {
      console.error('Fetch error:', error);
    });


}


const rednerPaginationElement = (listText) => {
  const parser = new DOMParser();
  // Create a new DOMParser
  // Parse the HTML string into a DocumentFragment
  const docFragment = parser.parseFromString(listText.data, 'text/html');

  // Extract the children (HTML elements) from the DocumentFragment
  const elements = Array.from(docFragment.body.children);
  elements.forEach(element => {
    element.addEventListener('click', function () {
      // Your event handling code here
      e.preventDefault();
      var currentElement = e.target;
      allLink.forEach(res => {
        res.classList.remove('current');
      })
      currentElement.classList.add('current');


    });
  });
  const elementsAsText = elements.map(element => element.outerHTML).join('');
  return elementsAsText;
}

const renderSearchedTitle = (titles, titleSuggestionContainer) => {
  titleSuggestionContainer.style.display = "block";

  titleSuggestionContainer.innerHTML = "";

  titles.forEach((title) => {
    allTitle.push(title);
    var element = document.createElement("li");
    element.textContent = title._source.pr_post_title;
    element.classList.add("list-group-item", "list-group-item-action");
    element.addEventListener("click", async (e) => {
      e.stopPropagation();
      titleInput.value = title._source.pr_post_title;
      titleSuggestionContainer.innerHTML = "";
      titleSuggestionContainer.style.display = "none";
      await getAllCoursWithCoposedRequest();
    });

    titleSuggestionContainer.appendChild(element);
  })
}


const renderTitle = (titles, titleSuggestionContainer) => {
  titles.forEach(element => {
    const res = filterTitle(element, allTitle);
    console.log(res);
    if (!res) {

      titles.forEach((title) => {
        allTitle.push(title);
        var element = document.createElement("li");
        var tit = title;

        element.addEventListener('click', async (e) => {
          e.stopPropagation();
          console.log("clicked title", tit);
          titleInput.value = tit._source.pr_post_title;
          resultsContainer.innerHTML = '';
          titleSuggestionContainer.style.display = "none";
          await getAllCoursWithCoposedRequest();
        })
        element.textContent = title._source.pr_post_title;
        element.classList.add("list-group-item", "list-group-item-action");
        titleSuggestionContainer.appendChild(element);
      });
    }
  })

}


/**
* 
* @param {*} title 
* @param {*} listTitle
* @return boolean
*/
const filterTitle = (title, listTitle) => {
  var find = false;
  listTitle.forEach(tit => {
    if (tit._source.pr_post_title == title._source.pr_post_title) {
      find = true;
    }
  })
  return find;
}


const renderkeywords = (keywords, keywordSuggestionsContainer) => {
  keywordSuggestionsContainer.style.display = "block";
  keywordSuggestionsContainer.innerHTML = "";

  keywords.forEach(keyword => {
    allKeyword.push(keyword);

    // Vérifiez si keyword._source.cdm_cours_26_searchword est un tableau
    if (Array.isArray(keyword._source.cdm_cours_26_searchword)) {
      keyword._source.cdm_cours_26_searchword.forEach(keywordObj => {
        // Accédez à la propriété text de chaque objet
        const keywordText = keywordObj.text;

        // Supprimez le texte "Catégorie : " du mot-clé s'il est présent
        const cleanedKeywordText = keywordText.replace("Catégorie : ", "");

        // Divisez le texte par le caractère ","
        const keywordArray = cleanedKeywordText.split(',');

        keywordArray.forEach(keywordValue => {
          const cleanedElement = keywordValue.trim(); // Supprimez les espaces avant et après l'élément

          if (cleanedElement !== "") { // Assurez-vous que l'élément n'est pas vide
            var listItem = document.createElement("li");
            listItem.textContent = cleanedElement;
            listItem.classList.add("list-group-item", "list-group-item-action");

            listItem.addEventListener('click', async (e) => {
              e.stopPropagation();
              console.log("clicked keyword", cleanedElement);
              keywordInput.value = cleanedElement;
              resultsContainer.innerHTML = '';
              keywordSuggestionsContainer.style.display = "none";
              await getAllCoursWithCoposedRequest();
            });

            keywordSuggestionsContainer.appendChild(listItem);
          }
        });
      });
    }
  });
};



const renderSearchedKeywords = (keywords, keywordSuggestionsContainer) => {
  keywordSuggestionsContainer.style.display = "block";
  keywordSuggestionsContainer.innerHTML = "";

  keywords.forEach(keyword => {
    allKeyword.push(keyword);

    // Vérifiez si keyword._source.cdm_cours_26_searchword est un tableau
    if (Array.isArray(keyword._source.cdm_cours_26_searchword)) {
      keyword._source.cdm_cours_26_searchword.forEach(keywordObj => {
        // Accédez à la propriété text de chaque objet
        const keywordText = keywordObj.text;

        // Supprimez le texte "Catégorie : " du mot-clé s'il est présent
        const cleanedKeywordText = keywordText.replace("Catégorie : ", "");

        // Divisez le texte par le caractère ","
        const keywordArray = cleanedKeywordText.split(',');

        keywordArray.forEach(keywordValue => {
          var element = document.createElement("li");
          element.textContent = keywordValue.trim(); // Supprimez les espaces avant et après l'élément
          element.classList.add("list-group-item", "list-group-item-action");
          element.addEventListener('click', async (e) => {
            e.stopPropagation();
            console.log("clicked keyword", keywordValue);
            keywordInput.value = keywordValue;
            resultsContainer.innerHTML = '';
            keywordSuggestionsContainer.style.display = "none";
            await getAllCoursWithCoposedRequest();
          });

          keywordSuggestionsContainer.appendChild(element);
        });
      });
    }
  });
};

const renderSearchedOrgunit = (etablissements, etablissementSuggestionsContainer) => {
  etablissementSuggestionsContainer.style.display = "block";
  etablissementSuggestionsContainer.innerHTML = "";

  etablissements.forEach((etablissement) => {
    allEtablissement.push(etablissement);

    // Vérifiez si etablissement._source.cdm_cours_a_orgunit.nom_orgunit est défini et non nul
    console.log("this is etablismeent ", etablissement._source.cdm_cours_a_orgunit[0].nom_orgunit);
    if (etablissement._source.cdm_cours_a_orgunit[0].nom_orgunit) {
      // Créez un tableau en divisant la chaîne etablissementText par ','.
      const etablissementText = etablissement._source.cdm_cours_a_orgunit[0].nom_orgunit.split(',');

      etablissementText.forEach(orgunitValue => {
        const cleanedOrgunitValue = orgunitValue.trim(); // Supprimez les espaces avant et après l'élément

        if (cleanedOrgunitValue !== "") {
          var element = document.createElement("li");
          element.textContent = cleanedOrgunitValue;
          element.classList.add("list-group-item", "list-group-item-action");

          element.addEventListener("click", async (e) => {
            e.stopPropagation();
            orgunitInput.value = cleanedOrgunitValue;
            etablissementSuggestionsContainer.innerHTML = "";
            etablissementSuggestionsContainer.style.display = "none";
            await getAllCoursWithCoposedRequest();
          });

          etablissementSuggestionsContainer.appendChild(element);
        }
      });
    }

    console.log("les orgunit", allEtablissement);
  });
};


const renderOrgunit = (etablissements, etablissementSuggestionsContainer) => {
  etablissements.forEach(etablissement => {
    allEtablissement.push(etablissement);
    if (etablissement._source.cdm_cours_a_orgunit.nom_orgunit !== '') {

      // Divisez le texte par le caractère "|"
      const etablissementText = etablissement._source.cdm_cours_a_orgunit.nom_orgunit;


      etablissementText.forEach(orgunitValue => {
        var element = document.createElement("li");
        var etablis = etablissement;
        allEtablissement.push(etablissement);
        element.addEventListener('click', async (e) => {
          e.stopPropagation();
          console.log("clicked etablissement", etablis);
          orgunitInput.value = orgunitValue;
          resultsContainer.innerHTML = '';
          etablissementSuggestionsContainer.style.display = "none";
          const cours = await getAllCoursWithCoposedRequest();
        });

        element.textContent = orgunitValue;
        element.classList.add("list-group-item", "list-group-item-action");
        etablissementSuggestionsContainer.appendChild(element);
      });
    }
  })
};



const renderSearchedDiffuseur = (diffuseurs, diffuseurSuggestionsContainer) => {
  diffuseurSuggestionsContainer.style.display = "block";

  diffuseurSuggestionsContainer.innerHTML = "";

  diffuseurs.forEach((diffuseur) => {
    allDiffuseur.push(diffuseur);
    var element = document.createElement("li");
    element.textContent = diffuseur._source.cdm_cours_29_1_distributorname;
    console.log("the diffuseur name renderSearchedDiffuseur", diffuseur._source.cdm_cours_29_1_distributorname);
    element.classList.add("list-group-item", "list-group-item-action");
    element.addEventListener("click", async (e) => {
      e.stopPropagation();
      diffuseurInput.value = diffuseur._source.cdm_cours_29_1_distributorname;
      diffuseurSuggestionsContainer.innerHTML = "";
      diffuseurSuggestionsContainer.style.display = "none";
      await getAllCoursWithCoposedRequest();
    });

    diffuseurSuggestionsContainer.appendChild(element);
  })
}

const renderDiffuseur = (diffuseurs, diffuseurSuggestionsContainer) => {

  diffuseurs.forEach(element => {
    diffuseurs.forEach((diffuseur) => {
      allDiffuseur.push(diffuseurs);
      var element = document.createElement("li");
      var dif = diffuseur;

      element.addEventListener('click', async (e) => {
        e.stopPropagation();
        console.log("clicked diffuseur", dif);
        diffuseurInput.value = dif._source.cdm_cours_29_1_distributorname;
        resultsContainer.innerHTML = '';
        diffuseurSuggestionsContainer.style.display = "none";
        const cours = await getAllCoursWithCoposedRequest();
      })
      element.textContent = diffuseur._source.cdm_cours_29_1_distributorname;
      element.classList.add("list-group-item", "list-group-item-action");
      diffuseurSuggestionsContainer.appendChild(element);
    });
  })

}


