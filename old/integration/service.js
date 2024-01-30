const ApiUrl = "https://wei.parene.org/wp-json/elastic/v1/cours";
const PaginationApi = "https://wei.parene.org/wp-json/pagination/pagination";

/**
 * Reset and build a JSON object that matches search template parameters with all the users input values.
 * @returns the json object to call the search template
 */
window.createRequestBodyFunction = () => {
  const formElements = [
    "query_string", "title", "description", "teaching_place", "searchword", "diplomation", "country", "level", "language", "online", "provider", "min_price", "max_price"
  ];
  //console.log("Start of getallcours")

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
  return requestBody;
}

window.createAggsRequest = (agg_field) =>{
  let requestBody = createRequestBodyFunction();
  requestBody.params["aggregate_field"] = agg_field;
  
}

/**
 * 
 * @param {*} requestBody : JSON object 
 * @returns the es answer to the query
 */
window.MakeRequest = (requestBody) => {
  return fetch(ApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type if sending JSON data
    },
    body: JSON.stringify(requestBody), // JSON data to send in the request body
  })
}

/**
 * 
 * @param {} requestBody : JSON object 
 */
window.MakeAndPrintRequest = (requestBody) => {
  MakeRequest(requestBody).then(async (res) => {
    console.log("this is result ", res);
    const data = await res.json();
    renderCoursCompleteTemplate(data);
    console.log("the currect data", data);
  });
}

const searchTitleService = async (requestBody) => {

  console.log("the request body in search title service: ", requestBody);

  requestBody._source = ["pr_post_title"];

  requestBody.size = 12;
  requestBody.sort = [
    { "id_document.keyword": "asc" }
  ];

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

  return await fetch(ApiUrl, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("THIS IS THE RESPONSE :", response);
    return response.json();
  })
}



const fetchCoursDate = async (requestBody) => {
  return fetch(ApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type if sending JSON data
    },
    body: JSON.stringify(requestBody), // JSON data to send in the request body
  })
}

/*
const getPaginationList = async (current, total) => {
  const requestBody = {
    total: total,
    current: current,
    base: "cours"
  }
  return fetch(PaginationApi,
    {
      headers: {
        "Content-Type": "application/json",
        // Specify that you expect JSON data
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    }
  )
}


/*

window.createTitleRequestBody = (titleInputValue) => {

  let requestBody = {
    query: {
      bool: {
        must: [],
      },
    },
  }
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


  return requestBody;
}

window.createKeywordRequestBody = (keywordInputValue) => {
  let requestBody = {
    query: {
      bool: {
        must: [],
      },
    },
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

  return requestBody;
}

window.createEtablissementRequestBody = (orgunitInputValue) => {
  let requestBody = {
    query: {
      bool: {
        must: [],
      },
    },
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

  return requestBody;

}

window.createDiffuseurRequestBody = (diffuseurInputValue) => {
  let requestBody = {
    query: {
      bool: {
        must: [],
      },
    },
  }
  if (diffuseurInputValue !== "") {
    requestBody.query.bool.must.push({
      
      
        match: {
          "cdm_cours_29_1_distributorname": diffuseurInputValue,
        },
        
      
    });
  }

  return requestBody;

}



const fetchCoursDate = async (requestBody)=>{
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type if sending JSON data
        },
        body: JSON.stringify(requestBody), // JSON data to send in the request body
      })
}
const getPaginationList = async(current,total)=> {
const  requestBody = {
    total :total , 
    current:current , 
    base: "cours"
}
return  fetch( PaginationApi,
{
headers: {
  "Content-Type": "application/json",
  // Specify that you expect JSON data
},
method : "POST" , 
body: JSON.stringify(requestBody),
}
)
}

const getTitleService = async (requestBody,lastDoc) => {
  requestBody._source= "pr_post_title",
  requestBody.size = 12;
  requestBody.search_after= lastDoc.sort;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];

  
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };
    
  return await fetch(ApiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return  response.json();
  })
}

const searchTitleService = async (requestBody) => {

  console.log("the request body in search title service: ",requestBody);

  requestBody._source= ["pr_post_title"];
   
  requestBody.size = 12;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];
 
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

   return await fetch(ApiUrl, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("THIS IS THE RESPONSE :",response);
    return response.json();
})
    
}

const searchKeywordService = async (requestBody) => {
  requestBody._source = ["cdm_cours_26_searchword.text"];  
  requestBody.size = 12;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];
   
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };
  return await fetch(ApiUrl, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return  response.json();
})
}
const getKeyWordScroll =async (requestBody,lastDoc)=>{
  requestBody._source= "cdm_cours_26_searchword.text",
  requestBody.size = 12;
  requestBody.search_after= lastDoc.sort;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];

  
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };
    
  return await fetch(ApiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return  response.json();
  })
}


const GetKeyWords = async (lastKeyWord) => {
  
}

const searchOrgunitService = async (requestBody) => {
  requestBody._source= ["cdm_cours_a_orgunit.nom_orgunit"];
   
  requestBody.size = 12;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];
 
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

   return await fetch(ApiUrl, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("THIS IS THE RESPONSE :",response);
    return response.json();
})
}

const getOrgunitService = async (requestBody,lastDoc) => {
  requestBody._source= "cdm_cours_a_orgunit.nom_orgunit",
  requestBody.size = 12;
  requestBody.search_after= lastDoc.sort;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];

  
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };
    
  return await fetch(ApiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return  response.json();
  })
}


const searchDiffuseurService = async (requestBody) => {
  requestBody._source= ["cdm_cours_29_1_distributorname"];
   
  requestBody.size = 30;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];
 
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

   return await fetch(ApiUrl, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("THIS IS THE RESPONSE :",response);
    return response.json();
})
}

  

const getDiffuseurService = async (requestBody,lastDoc) => {
  requestBody._source= "cdm_cours_29_1_distributorname",
  requestBody.size = 12;
  requestBody.search_after= lastDoc.sort;
  requestBody.sort =  [
    {"id_document.keyword": "asc"}     
  ];

  
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };
    
  return await fetch(ApiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return  response.json();
  })
  
}
*/