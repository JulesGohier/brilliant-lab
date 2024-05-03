import "./style.scss";

let multi = document.querySelector(".multi-select");
let filter = multi.querySelector("#filter");
let search = document.querySelector("#search");
let select = multi.querySelector(".select");
let app = document.querySelector("#app");
let isCheck = [];
let listLanguage = [];
let data_project = [];

async function get_data() {
  let response = await fetch("./assets/main.php");
  data_project = await response.json();
}

function filterAndSearch(input_search) {
  data_project.forEach((project) => {
    let element = document.querySelector(
      `#${project.title.toLowerCase().replace(" ", "")}`
    );
    let showProject = false;

    if (
      input_search.length == 0 ||
      project.title.toLowerCase().includes(input_search)
    ) {
      if (isCheck.length == 0) {
        showProject = true;
      } else {
        for (let lang of isCheck) {
          if (project.language.includes(lang)) {
            showProject = true;
            break;
          }
        }
      }
    }

    if (showProject) {
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  });
}

function createOptionElement(LanguageName) {
  let option = document.createElement("div");
  let svg = document.createElement("svg");
  let label = document.createElement("label");
  let input = document.createElement("input");

  option.classList.add("options");
  input.setAttribute("type", "checkbox");
  label.textContent = LanguageName;

  input.addEventListener("change", () => {
    if (input.checked == true) {
      isCheck.push(LanguageName);
    } else {
      let index = isCheck.indexOf(LanguageName);
      isCheck.splice(index, 1);
    }

    let input_search = search.value.toLowerCase();
    filterAndSearch(input_search);
  });

  fetch(`./assets/icons/${LanguageName.toLowerCase()}.svg`)
    .then((response) => response.text())
    .then((svgContent) => {
      svgContent = svgContent.replace("<svg>", "");
      svgContent = svgContent.replace("</svg>", "");
      svg.innerHTML = svgContent;

      option.append(svg, label, input);
    });

  return option;
}

function createCardsElement(title, description, language) {
  let div_card = document.createElement("div");
  let header = document.createElement("header");
  let main = document.createElement("main");
  let div_language = document.createElement("div");
  let div_button = document.createElement("div");
  let link_project = document.createElement("a");
  let title_project = document.createElement("h2");
  let description_project = document.createElement("p");

  div_card.classList = "card";
  div_card.setAttribute("id", `${title.toLowerCase().replace(" ", "")}`);
  title_project.classList.add("card__title");
  description_project.classList.add("card__description");
  div_language.classList.add("card__languageUse");
  link_project.setAttribute(
    "href",
    `./assets/projects/${title.toLowerCase()}/index.html`
  );
  div_button.classList.add("card__buttonStart");

  title_project.textContent = title;
  header.appendChild(title_project);

  description_project.textContent = description;
  main.appendChild(description_project);

  language.forEach((e) => {
    let language_project = document.createElement("p");
    language_project.textContent = e;
    language_project.classList.add("card__languageUse__name");
    div_language.appendChild(language_project);
  });

  link_project.textContent = "START";
  div_button.appendChild(link_project);

  div_card.appendChild(header);
  div_card.appendChild(main);
  div_card.appendChild(div_language);
  div_card.appendChild(div_button);

  return div_card;
}

await get_data();

data_project.forEach((e) => {
  e.language.forEach((lang) => {
    if (!listLanguage.includes(lang)) {
      listLanguage.push(lang);
    }
  });

  let element = createCardsElement(e["title"], e["description"], e["language"]);
  app.appendChild(element);
});

listLanguage.sort();

listLanguage.forEach((e) => {
  let element = createOptionElement(e);
  select.appendChild(element);
});

search.addEventListener("input", (e) => {
  let input_search = e.target.value.toLowerCase();

  filterAndSearch(input_search);
});

filter.addEventListener("input", (e) => {
  select.querySelectorAll(".options").forEach((element) => {
    let value_option = element.querySelector("label").textContent.toLowerCase();
    let value_input = e.target.value.toLowerCase();

    if (value_option.includes(value_input)) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
});

multi.addEventListener("mouseover", () => {
  select.style.display = "flex";
});

multi.addEventListener("mouseout", () => {
  select.style.display = "none";
});
