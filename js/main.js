var listEl = document.querySelector(".list");
for (var item of pokemons) {
  // creating elements
  var listItemEl = document.createElement("li");
  listItemEl.classList.add("list_item");
  var titleEl = document.createElement("h3");
  titleEl.classList.add("title_item");
  var titleBox = document.createElement("div");
  titleBox.classList.add("title_box");
  var badgeEl = document.createElement("span");
  badgeEl.classList.add("badge");
  badgeEl.classList.add("badge_item_one");
  var imgBox = document.createElement("div");
  var imgEl = document.createElement("img");
  var bottomBox = document.createElement("div");
  bottomBox.classList.add("last_box");
  var candyEl = document.createElement("p");
  candyEl.classList.add("desc_item");
  var timeEl = document.createElement("span");
  timeEl.classList.add("badge");
  timeEl.classList.add("badge_item_two");
  timeEl.setAttribute("datetime", `2022-10-18 ${item.spawn_time}`);

  //   giving values for created elements
  titleEl.textContent = item.name;
  badgeEl.textContent = item.num;
  imgEl.src = item.img;
  imgEl.width = "140";
  imgEl.height = "140";
  imgEl.classList.add("card-img");
  candyEl.textContent = item.candy;
  timeEl.textContent = item.spawn_time;

  // executing elements to the DOM
  titleBox.appendChild(titleEl);
  listItemEl.appendChild(titleBox);
  listItemEl.appendChild(badgeEl);
  imgBox.appendChild(imgEl);
  listItemEl.appendChild(imgBox);
  bottomBox.appendChild(candyEl);
  bottomBox.appendChild(timeEl);
  listItemEl.appendChild(bottomBox);
  listEl.appendChild(listItemEl);
}
