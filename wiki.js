let searchInput = document.querySelector(".search");
let formSearch = document.querySelector("form");
let content = document.querySelector("section");

function responseJson(reponse) {
  jsonContent = JSON.parse(reponse);
  jsonContent.query.search.forEach((elt) => {
    lien = document.createElement("div");
    lien.innerHTML = `
    <div class= result-item>
    <a class = result-title
     href = https://fr.wikipedia.org/?curid=${elt.pageid} >${elt.title}</a>
    <br>
    <a class = result-link href = https://fr.wikipedia.org/?curid=${elt.pageid} >https://en.wikipedia.org/?curid=${elt.pageid} </a>
    <p class = result-snippet > ${elt.snippet}</p>
    </div>
    `;
    content.appendChild(lien);
  });
}

function search(search, callback) {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    ` https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${search}`,
    true
  );
  req.addEventListener("load", function (e) {
    if (req.status >= 200 && req.status < 400) {
      callback(req.responseText);
    } else {
      console.error(req.status + " " + req.statusText + " ");
    }
  });
  req.addEventListener("error", function () {
    console.error("Erreur réseau avec l'URL");
  });
  req.send(null);
}

formSearch.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  content.innerHTML = "";
  search(searchInput.value, responseJson);
}
