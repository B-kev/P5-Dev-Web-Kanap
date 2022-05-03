const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

let itemPrice = 0;
let itemName;
let imgUrl;
let altText;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((res) => handleData(res));

function handleData(canapé) {
  const { altTxt, colors, description, imageUrl, name, price } = canapé;
  itemPrice = price;
  itemName = name;
  imgUrl = imageUrl;
  altText = altTxt;

  //   creation image
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;
  document.querySelector(".item__img").appendChild(img);

  //   creation h1 (title)
  document.getElementById("title").innerText = name;

  //   creation price
  document.getElementById("price").innerText = price;

  //   creation description
  document.getElementById("description").innerText = description;

  //   creation value (colors)
  const select = document.querySelector("#colors");
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  }
}

const button = document.querySelector("#addToCart");

button.addEventListener("click", (e) => {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (color == null || color == "" || quantity == null || quantity == 0) {
    alert("veuillez choisir une quantité et une couleur");
    return;
  }
  const data = {
    id: id,
    quantity: Number(quantity),
    color: color,
    name: itemName,
    price: itemPrice,
    altTxt: altText,
    imageUrl: imgUrl,
  };
  localStorage.setItem(id, JSON.stringify(data));
  location.href = "./cart.html";
});
