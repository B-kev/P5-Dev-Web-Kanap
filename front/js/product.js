const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((res) => canapés(res));

function canapés(z) {
  const { altTxt, colors, description, imageUrl, name, price } = z;
  itemColors = colors;
  imgUrl = imageUrl;
  itemName = name;
  // image
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;
  document.querySelector(".item__img").appendChild(img);

  // title
  document.getElementById("title").innerText = name;

  // price
  let prix = document.getElementById("price");
  prix.innerText = price;

  // price à sauvegarder dn s le loc   storage une le bouton clicker
  itemPrice = price;

  const quantity = document.getElementById("quantity");

  quantity.addEventListener("input", (e) => {
    quantity.value = e.target.value;

    if (quantity.value > 1) {
      prix.innerText = quantity.value * price;

      // price à sauvegarder dn s le loc   storage une le bouton clicker
      itemPrice = prix.innerText;

      //
    } else {
      prix.innerText = price;
    }
  });

  // descriprion
  document.getElementById("description").innerText = description;

  // value
  colors.forEach((i) => {
    const color = i;

    const option = document.createElement("option");
    option.value = color;
    option.innerText = color;

    const select = document.querySelector("#colors");
    select.appendChild(option);
  });
}

let itemColors, imgUrl, itemPrice, itemName, _id;

const btn = document.getElementById("addToCart");

btn.addEventListener("click", (e) => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  // condition en cas de nnon remplissage de la quantité ou de la couleur
  if (color == null || color == "") {
    alert("veillez choisir la couleur svp😉😉 !!!");

    document.querySelector("#colors").style.background = "red";
    document.querySelector("#colors").addEventListener("click", () => {
      document.querySelector("#colors").style.background = "white";
    });
    return;
  } else if (quantity == null || quantity == 0) {
    alert("veillez choisir la quantité svp !! 👀");

    document.querySelector("#quantity").style.border = "1.5px solid red";
    document.querySelector("#quantity").addEventListener("click", () => {
      document.querySelector("#quantity").style.border = "white";
    });
    return;
  }

  // creation de l'objet
  const object = {
    quantity: Number(quantity),
    price: Number(itemPrice),
    id: id,
    color: color,
    name: itemName,
    imageUrl: imgUrl,
  };
  console.table(object);

  // suavegarde données daans le local storage
  localStorage.setItem(id, JSON.stringify(object));

  // changer de page
  location.href = "./cart.html";
});
