
MakeRequest().then(async (res) => {
    console.log("this is result ", res);
    const data = await res.json();
    console.log("the currect data", data);
  });
  window.onload;
  
  window.titleInput = document.getElementById("titleSearch");
  alert(titleInput.value);
  
  window.onload = async function () {
    //get all input 
    var debounceTimer;
    window.page = 1;
  
  
    window.titleInput = document.getElementById("titleSearch");
    window.descriptionInput = document.getElementById("descriptionSearch");
    window.keywordInput = document.getElementById("searchwordSearch");
    //window.diplomasInput = document.getElementById("diplomationSearch");
    window.paysInput = document.getElementById("countrySearch");
    window.villeInput = document.getElementById("villeSearch");
    window.levelInput = document.getElementById("levelSearch");
    window.languageInput = document.getElementById("languageSearch");
    window.addressInput = document.getElementById("onlineSearch");
    //window.orgunitInput = document.getElementById("orgunitSearch");
    window.diffuseurInput = document.getElementById("diffuseurSearch");
    window.pricestartInput = document.getElementById("price-start");
    window.pricendInput = document.getElementById("price-end");
  
    window.prixAscRadio = document.getElementById("prix_asc_radio");
    window.prixDescRadio = document.getElementById("prix_desc_radio");
    window.inscriptionAscRadio = document.getElementById("inscription_asc_radio");
    window.inscriptionDescRadio = document.getElementById("inscription_desc_radio");
    window.dateAscRadio = document.getElementById("date_asc_radio");
    window.dateDescRadio = document.getElementById("date_desc_radio");
  
    window.getAllCoursWithCoposedRequest = async () => {
      console.log("Start of getallcours")
  
      var titleInputValue = titleInput.value;
      let descriptionInputValue = descriptionInput.value;
      var keywordInputValue = keywordInput.value;
      //var diplomasInputValue = diplomasInput.value;
      var paysInputValue = paysInput.value;
      var villeInputValue = villeInput.value;
      var levelInputValue = levelInput.value;
      var langueInputValue = languageInput.value;
      var adressInputValue = addressInput.value;
      //var orgunitInputValue = orgunitInput.value; //TODO
      var diffuseurInputValue = diffuseurInput.value;
      var pricestartInputValue = pricestartInput.value;
      var priceendInputValue = pricendInput.value;
      var sort = [{ "id_document.keyword": "asc" }];
      var isPrixAsc = prixAscRadio.checked;
      var isPrixDesc = prixDescRadio.checked;
      var isInscriptionAsc = inscriptionAscRadio.checked;
      var isInscriptionDesc = inscriptionDescRadio.checked;
      var isDateAsc = dateAscRadio.checked;
      var isDateDesc = dateDescRadio.checked;
  
      console.log("Here we are")
      /*
      if (isInscriptionAsc) {
        sort.unshift({ "cdm_cours_10_3_1_deadlineregistration": "asc" });
        console.log("sorted here", sort)
      }
      if (isInscriptionDesc) {
        sort.unshift({ "cdm_cours_10_3_1_deadlineregistration": "desc" });
        console.log("sorted here", sort)
      }
      if (isDateAsc) {
        sort.unshift({ "cdm_cours_7_1_1_start": "asc" });
        console.log("sorted here", sort)
      }
      if (isDateDesc) {
        sort.unshift({ "cdm_cours_7_1_1_start": "desc" });
        console.log("sorted here", sort)
      }
    
      if (isPrixAsc) {
        sort.unshift({
          "cdm_cours_19_2_expensesprice.prix": {
            "order": "asc", "nested": {
              "path": "cdm_cours_19_2_expensesprice"
            }
          }
        });
        console.log("sorted here", sort)
      }
      if (isPrixDesc) {
        sort.unshift({
          "cdm_cours_19_2_expensesprice.prix": {
            "order": "desc", "nested": {
              "path": "cdm_cours_19_2_expensesprice"
            }
          }
        });
        console.log("sorted here", sort)
      }
    */
  
      //request
      var requestBody = {
        id: "cours_search_query_2",
        params: {
        }
      };
      console.log("I built this : ", requestBody);
  
      //size
      requestBody.params['size'] = 12;
  
      //min 
      requestBody.params['min'] = requestBody.params['size'] * (page - 1);
  
  
      //requestBody.size = 12;
      //requestBody.sort = sort;
      //requestBody.from = requestBody.size * (page - 1);
  /*
      requestBody.sort = [
        { "id_document.keyword": "asc" }
      ];*/
  
      //Title 
      if (titleInputValue !== "") {
        requestBody.params['title'] = titleInputValue;
      }
  
      //description
      if (descriptionInputValue !== "") {
        requestBody.params['description'] = descriptionInputValue;
      }
  
      //searchword
      if (keywordInputValue !== "") {
        requestBody.params['searchword'] = keywordInputValue;
      }
  
      //country
      if (paysInputValue !== "") {
        requestBody.params['country'] = paysInputValue;
      }
  
      //city
      if (villeInputValue !== "") {
        requestBody.params['city'] = villeInputValue;
      }
  
      //level
      if (levelInputValue !== "") {
        requestBody.params['level'] = levelInputValue;
      }
  
      //language
      if (langueInputValue !== "") {
        requestBody.params['instruction_language'] = langueInputValue;
      }
  
      //adress
      if (adressInputValue !== "") {
        requestBody.params['teaching_place'] = adressInputValue;
      }
      console.log("I built this : ", requestBody);
      //ajouter cdm_cours_a_orgunit
  
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
  
      //provider
      if (diffuseurInputValue !== "") {
        requestBody.params['provider'] = diffuseurInputValue;
      }
  
      //min_price
      if (pricestartInputValue !== "") {
        requestBody.params['min_price'] = pricestartInputValue;
      }
  
      //max_price
      if (priceendInputValue !== "") {
        requestBody.params['max_price'] = priceendInputValue;
      }
  
      /*  //max_price
        if (priceendInputValue !== "") {
          requestBody.params['size'] = 12;
            "max_price": priceendInputValue,
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
        //renderCoursCompleteTemplate(res) ; 
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
  
    getAllCoursWithCoposedRequest();
  
    const debouncedTitleInputHandler = debounce(async () => {
      let requestBody = createRequestBodyFunction();
  
      try {
        allTitle = [];
        const titles = await searchTitleService(requestBody);
        console.log("title response in input event listener:", titles)
        allTitle = titles.hits.hits;
        renderSearchedTitle(titles.hits.hits, titleSuggestionContainer);
        getAllCoursWithCoposedRequest();
  
      }
      catch (error) {
        console.log(error);
      }
    }, 1000);
  
  
    titleInput.addEventListener("keyup", debouncedTitleInputHandler);
  
    titleInput.addEventListener("click", async (e) => {
      let requestBody = createRequestBodyFunction();
      //const reqBody = createRequestBodyFunction();
      console.log("this is reque body ", requestBody);
      console.log("request body In click author input listener", requestBody);
      try {
        allTitle = [];
        const titles = await searchTitleService(requestBody);
  
        if (!titles) {
          return;
        }
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
        getAllCoursWithCoposedRequest();
  
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
        getAllCoursWithCoposedRequest();
  
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
        getAllCoursWithCoposedRequest();
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
      getAllCoursWithCoposedRequest();
    })
  
    diplomasInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
  
    paysInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
  
    pricestartInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
    pricendInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
    languageInput.addEventListener('change', (e) => {
      getAllCoursWithCoposedRequest();
    })
    addressInput.addEventListener('change', (e) => {
      getAllCoursWithCoposedRequest();
    })
    levelInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
    villeInput.addEventListener('input', (e) => {
      getAllCoursWithCoposedRequest();
    })
  
    prixAscRadio.addEventListener("change", function () {
      if (prixAscRadio.checked) {
        getAllCoursWithCoposedRequest();
      }
    });
  
    prixDescRadio.addEventListener("change", function () {
      if (prixDescRadio.checked) {
        page = 1;
        getAllCoursWithCoposedRequest();
      }
    });
  
    inscriptionAscRadio.addEventListener("change", function () {
      if (inscriptionAscRadio.checked) {
        getAllCoursWithCoposedRequest();
      }
    });
  
    inscriptionDescRadio.addEventListener("change", function () {
      if (inscriptionDescRadio.checked) {
        getAllCoursWithCoposedRequest();
      }
    });
  
    dateAscRadio.addEventListener("change", function () {
      if (dateAscRadio.checked) {
        getAllCoursWithCoposedRequest();
      }
    });
  
    dateDescRadio.addEventListener("change", function () {
      if (dateDescRadio.checked) {
        getAllCoursWithCoposedRequest();
      }
    });
  
  }
  
  
  /*
  window.onload =  async function () {
    
    //get all input element 
    var debounceTimer;
    window.page=1; 
    
    window.resultsContainer = document.getElementById("coursContainer");
    window.pagination = document.getElementById("pagination-list") ; 
    window.totalResult = 12 ; 
    window.total = 1;
    window.titleInput = document.getElementById("titleSearch");
    window.descriptionInput = document.getElementById("descriptionSearch");
    window.keywordInput = document.getElementById("searchwordSearch");
    window.diplomasInput = document.getElementById("diplomationSearch");
    window.paysInput = document.getElementById("countrySearch");
    window.villeInput = document.getElementById("villeSearch");
    window.levelInput = document.getElementById("levelSearch");
    window.languageInput = document.getElementById("languageSearch");
    window.addressInput = document.getElementById("onlineSearch");
    window.orgunitInput = document.getElementById("orgunitSearch");
    window.diffuseurInput = document.getElementById("diffuseurSearch");
    window.pricestartInput = document.getElementById("price-start");
    window.pricendInput = document.getElementById("price-end");
  
    window.prixAscRadio = document.getElementById("prix_asc_radio");
    window.prixDescRadio = document.getElementById("prix_desc_radio");
    window.inscriptionAscRadio = document.getElementById("inscription_asc_radio");
    window.inscriptionDescRadio = document.getElementById("inscription_desc_radio");
    window.dateAscRadio = document.getElementById("date_asc_radio");
    window.dateDescRadio = document.getElementById("date_desc_radio");
  
    window.allTitle = [];
    window.allKeyword = [];
    window.allEtablissement = [];
    window.allDiffuseur = [];
  
    var titleSuggestionContainer = document.getElementById("titleSuggestions");
    var keywordSuggestionsContainer = document.getElementById("keywordSuggestions");
    var etablissementSuggestionsContainer = document.getElementById("etablissementSuggestions");
    var diffuseurSuggestionsContainer = document.getElementById("diffuseurSuggestions");
   
    const debounce = (func, delay) => {
      let timerId;
      return (...args) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => func(...args), delay);
      };
    };
  
    const fetchAndRenderTitle = async () => {
      const titleInputValue = titleInput.value;
      try {
        const titles = await searchTitleService(titleInputValue);
        if (!titles) {
          return;
        }
        const titleHits = titles.hits.hits;
        renderSearchedTitle(titleHits, titleSuggestionContainer, resultsContainer);
      } catch (error) {
        console.log(error);
      }
    };
  
    window.getAllCoursWithCoposedRequest= async ()=>{
        var titleInputValue = titleInput.value ; 
        let descriptionInputValue = descriptionInput.value;
        var keywordInputValue = keywordInput.value ;
        var diplomasInputValue = diplomasInput.value; 
        var paysInputValue =  paysInput.value;
        var villeInputValue =  villeInput.value;
        var levelInputValue =  levelInput.value; 
        var langueInputValue =  languageInput.value;
        var adressInputValue =  addressInput.value;
        var orgunitInputValue =  orgunitInput.value;
        var diffuseurInputValue =  diffuseurInput.value;
        var pricestartInputValue =  pricestartInput.value; 
        var priceendInputValue =  pricendInput.value; 
        var sort = [{"id_document.keyword": "asc"}  ];
        var isPrixAsc =  prixAscRadio.checked;
        var isPrixDesc =prixDescRadio.checked;
        var isInscriptionAsc = inscriptionAscRadio.checked;
        var isInscriptionDesc = inscriptionDescRadio.checked;
        var isDateAsc =dateAscRadio.checked;
        var isDateDesc = dateDescRadio.checked;
  
        if (isInscriptionAsc) {
          sort.unshift({ "cdm_cours_10_3_1_deadlineregistration": "asc" });
          console.log("sorted here", sort)
        }
        if (isInscriptionDesc) {
          sort.unshift({ "cdm_cours_10_3_1_deadlineregistration": "desc" });
          console.log("sorted here", sort)
        }
        if (isDateAsc) {
          sort.unshift({ "cdm_cours_7_1_1_start": "asc" });
          console.log("sorted here", sort)
        }
        if (isDateDesc) {
          sort.unshift({ "cdm_cours_7_1_1_start": "desc" });
          console.log("sorted here", sort)
        }
        
        if (isPrixAsc) {
          sort.unshift({ "cdm_cours_19_2_expensesprice.prix": { "order": "asc","nested": {
            "path": "cdm_cours_19_2_expensesprice" 
          } } });
          console.log("sorted here", sort)
        }
        if (isPrixDesc) {
          sort.unshift({ "cdm_cours_19_2_expensesprice.prix": { "order": "desc" ,"nested": {
            "path": "cdm_cours_19_2_expensesprice"}} });
            console.log("sorted here", sort)
        }
  
        var requestBody = {
          query: {
            bool: {
              must: [],
            },
          },
        };
        requestBody.size = 12;
        requestBody.sort = sort;
        requestBody.from = requestBody.size * (page-1) ; 
       
       /* requestBody.sort =  [
          {"id_document.keyword": "asc"}     
        ];
        if (titleInputValue !== "") {
          requestBody.query.bool.must.push({
            match: {
                "pr_post_title.keyword":{
                  query :titleInputValue,
                  operator: "and",
                },
              },
          });
        }
    
          if (descriptionInputValue !== "") {
            requestBody.query.bool.must.push({
              match: {
                pr_description : descriptionInputValue,
              },
            });
          }
    
          
          if (keywordInputValue !== "") {
            requestBody.query.bool.must.push({
              nested: {
                path: "cdm_cours_26_searchword", 
                query: {
                  match: {
                    "cdm_cours_26_searchword.text":keywordInputValue, 
                  },
                },
              },
            });
          }
    
          
        if (paysInputValue !== "") {
          requestBody.query.bool.must.push({					
            match: {
              "cdm_cours_6_1_countryname": paysInputValue,
            },
          });
        }
    
          if (villeInputValue !== "") {
            requestBody.query.bool.must.push({					
                match: {
                  "cdm_cours_22_1_3_city": villeInputValue,
                },				
            });
          }
    
          if (levelInputValue !== "") {
            requestBody.query.bool.must.push({	
                match: {
                  "cdm_cours_6_2_level": levelInputValue,
                },				
            });
          }
    
          if (langueInputValue !== "") {
           
            requestBody.query.bool.must.push({
              match: {
                cdm_cours_16_instructionlanguage: langueInputValue,
              },
            });
          }
    
          if (adressInputValue !== "") {
            if (adressInputValue === "oui") {
              adressInputValue = "ligne";
            }
    
            requestBody.query.bool.must.push({
              match: {
                "cdm_cours_12_1_1_teachingplaceaddress": adressInputValue,
              },
            });
          }
    
          
    
          if (orgunitInputValue !== "") {
            requestBody.query.bool.must.push({
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
          }
          
          if (diffuseurInputValue !== "") {
            requestBody.query.bool.must.push({
              
              
                match: {
                  "cdm_cours_29_1_distributorname": diffuseurInputValue,
                },
                
              
            });
          }
    
          
          
          if (pricestartInputValue !== "") {
            requestBody.query.bool.must.push({
              nested: {
                path: "cdm_cours_19_2_expensesprice", 
                query: {
                  range: {
                    "cdm_cours_19_2_expensesprice.prix": {
                      gte: parseFloat(pricestartInputValue),
                      
                    },
                  },
                },
              },
            });
          }
    
          if (priceendInputValue !== "") {
            
              requestBody.query.bool.must.push({
                nested: {
                  path: "cdm_cours_19_2_expensesprice", 
                  query: {
                    range: {
                      "cdm_cours_19_2_expensesprice.prix": {
                        lte: parseFloat(priceendInputValue),
                        
                      },
                    },
                  },
                },
              });
          }
  
  
        try{
          const data = await fetchCoursDate(requestBody) ; 
          const res = await data.json() ; 
          //totalResult = res.hits.total.value;
          //ResultsCount = res.hits.total.value;
          //updateResultCounts();
          console.log("data", res)
          //renderCoursCompleteTemplate(res) ; 
          //console.log("help please",res);
        }catch(e){
          console.log("the error" , e);
        }
       
    }
    function updateResultCounts() {
      jQuery("#ResultsCount").text(ResultsCount);
   
      } 
   
  
  
  
  
    document.addEventListener('click' , async (e)=> {
      titleSuggestionContainer.style.display = "none";
      keywordSuggestionsContainer.style.display = "none";
      etablissementSuggestionsContainer.style.display = "none";
      diffuseurSuggestionsContainer.style.display = "none";
    })
  
    getAllCoursWithCoposedRequest();
  
    const debouncedTitleInputHandler = debounce(async () => {
      let requestBody = createRequestBodyFunction() ;  
      
      try{
        allTitle = [] ;  
        const titles = await searchTitleService(requestBody);
        console.log("title response in input event listener:",titles)
        allTitle = titles.hits.hits ; 
        renderSearchedTitle(titles.hits.hits, titleSuggestionContainer);
        getAllCoursWithCoposedRequest();
      
        }
        catch(error){
          console.log(error);
        }
    },1000);
  
  
    titleInput.addEventListener("keyup", debouncedTitleInputHandler);
  
    titleInput.addEventListener("click" ,async (e)=> {
      let requestBody = createRequestBodyFunction() ; 
      //const reqBody = createRequestBodyFunction();
      console.log("this is reque body " ,requestBody );
      console.log("request body In click author input listener",requestBody);
      try{
        allTitle = [] ; 
        const titles = await searchTitleService(requestBody);
    
        if(!titles){
          return ;
        }
        renderSearchedTitle(titles.hits.hits, titleSuggestionContainer);
        }
        catch(error){
          console.log(error);
        }
    })
    
    
    
    titleSuggestionContainer.addEventListener("scroll", async () => {
      let requestBody = createRequestBodyFunction();   
      console.log('title scroll ',requestBody); 
     
        if (
          titleSuggestionContainer.scrollTop + titleSuggestionContainer.clientHeight >=
          titleSuggestionContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
        ) {
              
              try{
                const latestTitle =  allTitle[allTitle.length - 1]; 
                const response = await getTitleService(requestBody,latestTitle);
                console.log("this is response " ,response );
                renderTitle(response.hits.hits,titleSuggestionContainer);
              }catch(e){
                console.log("there is error ", e);
              }
         
  
        }
     
    })
  
    const debouncedKeywordInputHandler = debounce(async () => {
      let requestBody = createRequestBodyFunction() ;  
      
      try{
        allKeyword = [];
          const keywords = await searchKeywordService(requestBody);
          console.log("this is response of keywords ",keywords);
          renderSearchedKeywords(keywords.hits.hits, keywordSuggestionsContainer);
          getAllCoursWithCoposedRequest();
      
        }
        catch(error){
          console.log(error);
        }
    },1000);
  
    keywordInput.addEventListener("keyup", debouncedKeywordInputHandler);
  
    keywordInput.addEventListener('click', async (e) => {
      e.stopPropagation();
      let requestBody = createRequestBodyFunction() ;     
      try{
        allKeyword = [] ; 
        const keywords = await searchKeywordService(requestBody);
        console.log("keywords response in click event listeners:",keywords);
        if(!keywords){
          return ;
        }
        renderSearchedKeywords(keywords.hits.hits, keywordSuggestionsContainer);
        }
        catch(error){
          console.log(error);
        }
    })
    
    keywordSuggestionsContainer.addEventListener('scroll',async (e) => {
      let requestBody = createRequestBodyFunction() ;   
      console.log("Hello");
      if (
        keywordSuggestionsContainer.scrollTop + keywordSuggestionsContainer.clientHeight >=
        keywordSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
      ) {
            
            try{
              let latestKeyWord =  allKeyword[allKeyword.length - 1]; 
              const response = await getKeyWordScroll(requestBody,latestKeyWord);
              renderkeywords(response.hits.hits,keywordSuggestionsContainer);
            }catch(e){
              console.log("there is error ", e);
            }
      }
    })
  
  // les editeurs
  const debouncedOrgunitInputHandler = debounce(async () => {
    let requestBody = createRequestBodyFunction() ;  
    
    try{
        allEtablissement = [];
        const etablissement = await searchOrgunitService(requestBody);
        renderSearchedOrgunit(etablissement.hits.hits, etablissementSuggestionsContainer);
        getAllCoursWithCoposedRequest();
    
      }
      catch(error){
        console.log(error);
      }
  },1000);
  orgunitInput.addEventListener("keyup", debouncedOrgunitInputHandler);
  
  
  orgunitInput.addEventListener('click', async (e) => {
    e.stopPropagation();
    let requestBody = createRequestBodyFunction() ;    
    try{
      allEtablissement = [] ; 
      const etablissement = await searchOrgunitService(requestBody);
      if(!etablissement){
        return ;
      }
      renderSearchedOrgunit(etablissement.hits.hits, etablissementSuggestionsContainer);
      }
      catch(error){
        console.log(error);
      }
  })
  
  etablissementSuggestionsContainer.addEventListener('scroll',async () => {
    
    if (
      etablissementSuggestionsContainer.scrollTop + etablissementSuggestionsContainer.clientHeight >=
      etablissementSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
    ) {
      let requestBody = createRequestBodyFunction() ;  
          
          try{
            let latestEtablissement =  allEtablissement[allEtablissement.length - 1]; 
            const response = await getOrgunitService(requestBody,latestEtablissement);
            renderOrgunit(response.hits.hits,etablissementSuggestionsContainer);
          }catch(e){
            console.log("there is error ", e);
          }
    }
  })
  
  
  
    diffuseurInput.addEventListener("keydown",async () => {
      let requestBody = createRequestBodyFunction() ;  
      console.log("requestBodyrequestBody",requestBody);
      try{
        allDiffuseur = []  ; 
        const diffuseur = await searchDiffuseurService(requestBody);
        getAllCoursWithCoposedRequest();
        if(!diffuseur){
          return ;
        }
  
        renderSearchedDiffuseur(diffuseur.hits.hits,diffuseurSuggestionsContainer);
  
      }catch(error){
        console.log(error);
      }
    })
  
    diffuseurInput.addEventListener("click",async () => {
      let requestBody = createRequestBodyFunction() ;  
      try{
        const diffuseur = await searchDiffuseurService(requestBody);
  
        if(!diffuseur){
          return ;
        }
  
        renderSearchedDiffuseur(diffuseur.hits.hits,diffuseurSuggestionsContainer);
  
      }catch(error){
        console.log(error);
      }
    })
  
    diffuseurSuggestionsContainer.addEventListener('scroll', async () => {
      let requestBody = createRequestBodyFunction() ;  
      if (
        diffuseurSuggestionsContainer.scrollTop + diffuseurSuggestionsContainer.clientHeight >=
        diffuseurSuggestionsContainer.scrollHeight - 3 // Vous pouvez ajuster ce seuil selon vos besoins
      ) {
            
            try{
              const latestDiffuseur =  allDiffuseur[allDiffuseur.length - 1]; 
              const response = await getDiffuseurService(requestBody,latestDiffuseur);
              console.log('this is response ',response );
              renderDiffuseur(response.hits.hits,diffuseurSuggestionsContainer);
            }catch(e){
              console.log("there is error ", e);
            }
      }
    })
    descriptionInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
  
    diplomasInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
  
    paysInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
  
    pricestartInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
    pricendInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
    languageInput.addEventListener('change' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
    addressInput.addEventListener('change' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
    levelInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
    villeInput.addEventListener('input' , (e)=>{
      getAllCoursWithCoposedRequest();
    })
  
    prixAscRadio.addEventListener("change", function () {
      if (prixAscRadio.checked) {
        getAllCoursWithCoposedRequest(); 
      }
      });
  
  prixDescRadio.addEventListener("change", function () {
    if (prixDescRadio.checked) {
      page=1 ; 
      getAllCoursWithCoposedRequest();}
  });
  
  inscriptionAscRadio.addEventListener("change", function () {
    if (inscriptionAscRadio.checked) {
      getAllCoursWithCoposedRequest();  }
  });
  
  inscriptionDescRadio.addEventListener("change", function () {
  if (inscriptionDescRadio.checked) {
    getAllCoursWithCoposedRequest();}
  });
  
  dateAscRadio.addEventListener("change", function () {
    if (dateAscRadio.checked) {
      getAllCoursWithCoposedRequest();  }
  });
  
  dateDescRadio.addEventListener("change", function () {
  if (dateDescRadio.checked) {
    getAllCoursWithCoposedRequest();}
  });
   
  }
  
  
  */
  
  
  
  
  