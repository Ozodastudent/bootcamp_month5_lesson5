const listEl = document.querySelector(".list");
const formEl = document.querySelector(".form_header");
const searchInput = document.querySelector(".search_input");
const maxCandy = document.querySelector(".max_candy");
const minCandy = document.querySelector(".min_candy");
const typeSelect = document.querySelector(".type_select");
const sortSelect = document.querySelector(".sorting_select");
const types = [];

// get types
function getTypes() {
  pokemons.forEach((item) => {
    item.type.forEach((type) => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });
  });
  types.sort();
}

// rendering types
function renderTypes() {
  const typeFragment = document.createDocumentFragment();
  types.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    typeFragment.appendChild(newOption);
  });
  typeSelect.appendChild(typeFragment);
}

//search pokemons
function showSearchPokemons(search) {
  const filteredPokemons = pokemons.filter((item) => {
    const optionList =
      item.name.match(search) &&
      (typeSelect.value == "all" ||
        item.weaknesses.includes(typeSelect.value)) &&
      (minCandy.value == "" || item.candy_count >= Number(minCandy.value)) &&
      (maxCandy.value == "" || item.candy_count <= Number(maxCandy.value));
    return optionList;
  });
  return filteredPokemons;
}

// sorting part
function sortPokemons(sortArray, sortingType) {
  if (sortingType == "a-z") {
    sortArray.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
  }
  if (sortingType == "z-a") {
    sortArray.sort((a, b) => {
      return (
        b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0)
      );
    });
  }
  if (sortingType == "low-weight") {
    sortArray.sort((a, b) => {
      return parseFloat(a.weight) - parseFloat(b.weight);
    });
  }
  if (sortingType == "hight-weight") {
    sortArray.sort((a, b) => {
      return parseFloat(b.weight) - parseFloat(a.weight);
    });
  }
}

// render pokemons
function renderPokemons(poke, regex = "") {
  listEl.innerHTML = "";
  const pokemonFragment = document.createDocumentFragment();
  poke.forEach((item) => {
    // creating elements
    const listItemEl = document.createElement("li");
    listItemEl.classList.add("list_item");
    const titleEl = document.createElement("h3");
    titleEl.classList.add("title_item");
    const titleBox = document.createElement("div");
    titleBox.classList.add("title_box");
    const badgeEl = document.createElement("span");
    badgeEl.classList.add("badge");
    badgeEl.classList.add("badge_item_one");
    const imgBox = document.createElement("div");
    const imgEl = document.createElement("img");
    const bottomBox = document.createElement("div");
    bottomBox.classList.add("last_box");
    const typeText = document.createElement("p");
    typeText.classList.add("type_text");
    const weightText = document.createElement("p");
    weightText.classList.add("weight_text");
    const candyText = document.createElement("p");
    candyText.classList.add("candy_text");
    const candyEl = document.createElement("p");
    candyEl.classList.add("desc_item");
    const timeEl = document.createElement("span");
    timeEl.classList.add("badge");
    timeEl.classList.add("badge_item_two");
    timeEl.setAttribute("datetime", `2022-10-18 ${item.spawn_time}`);

    //   giving values for created elements
    // titleEl.textContent = item.name;
    if (regex.source != "(?:)" && regex) {
      titleEl.innerHTML = item.name.replace(
        regex,
        `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`
      );
    } else {
      titleEl.textContent = item.name;
    }
    badgeEl.textContent = item.num;
    imgEl.src = item.img;
    imgEl.width = "140";
    imgEl.height = "140";
    imgEl.classList.add("card-img");
    typeText.textContent = item.weaknesses.join(", ");
    weightText.textContent = item.weight;
    candyEl.textContent = item.candy;
    candyText.textContent = `Candy: ${item.candy_count}`;
    timeEl.textContent = item.spawn_time;

    // executing elements to the DOM
    titleBox.appendChild(titleEl);
    listItemEl.appendChild(titleBox);
    listItemEl.appendChild(badgeEl);
    imgBox.appendChild(imgEl);
    listItemEl.appendChild(imgBox);
    listItemEl.appendChild(typeText);
    listItemEl.appendChild(weightText);
    bottomBox.appendChild(candyEl);
    listItemEl.appendChild(candyText);
    bottomBox.appendChild(timeEl);
    listItemEl.appendChild(bottomBox);
    pokemonFragment.appendChild(listItemEl);
    listEl.appendChild(pokemonFragment);
  });
}

// search part finally
formEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const searchValue = searchInput.value.trim();
  const searchValueRegex = new RegExp(searchValue, "gi");
  const searchPokemonEl = showSearchPokemons(searchValueRegex);
  if (searchPokemonEl.length > 0) {
    sortPokemons(searchPokemonEl, sortSelect.value);
    renderPokemons(searchPokemonEl, searchValueRegex);
  } else {
    listEl.innerHTML = "Not found!";
  }
});

getTypes();
renderTypes();
renderPokemons(pokemons.slice(0, 101));
