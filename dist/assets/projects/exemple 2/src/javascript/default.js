let languages = document.querySelector(".lateralBar__languages");

function createLanguageNode(nameLanguage) {
  let element = document.createElement("p");
  element.classList = "lateralBar__languages__items";
  element.textContent = nameLanguage;
  languages.appendChild(element);
}

fetch("./src/javascript/main.php")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let name_project = document.querySelector("#name_project");
    let head_title = document.querySelector("head").querySelector("title");
    head_title.textContent = `${data.title}`;
    name_project.textContent = `${data.title}`;
    data.language.forEach((lang) => {
      createLanguageNode(lang);
    });
  });
