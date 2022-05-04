// const section = document.getElementById("cart__items");
const numberOfItems = localStorage.length;
const cart = [];
let totalPrice = 0;
let totalQuantity = 0;

for (let i = 0; i < numberOfItems; i++) {
  const item = localStorage.getItem(localStorage.key(i));
  const itemObject = JSON.parse(item);
  cart.push(itemObject);
}

for (let i = 0; i < cart.length; i++) {
  const element = cart[i];

  //

  totalPrice += element.price;
  totalQuantity += element.quantity;

  /* *******************************************************
   **** Enfant de : <div class="cart__item__content"> *****
   ********************************************************** */
  // image
  const img = document.createElement("img");
  img.src = element.imageUrl;
  img.alt = element.altTxt;
  //   <div class="cart__item__img"></div>
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  divImg.appendChild(img);

  //-----------------------------------------------------------------------------

  /* *******************************************************
   **** <div class="cart__item__content__description">
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__delete"> *****
   ********************************************************** */
  const h2 = document.createElement("h2");
  h2.innerText = element.name;

  const pColor = document.createElement("p");
  pColor.innerText = element.color;

  const pPrice = document.createElement("p");
  pPrice.innerText = element.price;

  const pQuantity = document.createElement("p");
  pQuantity.innerText = "Qté : " + element.quantity + " ";

  const input = document.createElement("input");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = 1;
  input.max = 100;
  input.value = element.quantity;
  input.classList.add("itemQuantity");

  const pDelete = document.createElement("p");
  pDelete.innerText = "Supprimer";
  pDelete.classList.add("deleteItem");

  /* **************************** Enfant de : <div class="cart__item__content"> ************** */
  // <div class="cart__item__content__description">
  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");
  divDescription.appendChild(h2);
  divDescription.appendChild(pColor);
  divDescription.appendChild(pPrice);

  // <div class="cart__item__content__settings">
  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");
  divSettings.appendChild(pQuantity);
  divSettings.appendChild(input);

  // <div class="cart__item__content__settings__delete">
  const divDelete = document.createElement("div");
  divDelete.classList.add("cart__item__content__settings__delete");
  divDelete.appendChild(pDelete);

  // ++++++++++++++++++++++++++++++
  // <div class="cart__item__content">
  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  divContent.appendChild(divDescription);
  divContent.appendChild(divSettings);
  divContent.appendChild(divDelete);

  // --------------------------------------------------------------------------------

  //-----------++++++++++++++++++++++++++++++++++++++++++

  /****************************************************** article */

  //   <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = element.id;
  article.dataset.color = element.color;
  // apend
  document.getElementById("cart__items").appendChild(article);
  article.appendChild(divImg);
  article.appendChild(divContent);

  //---------------------------------------------------------------------------------
  document.getElementById("totalPrice").innerText = totalPrice;
  document.getElementById("totalQuantity").innerText = totalQuantity;
}

//
//
// for (let i = 0; i < cart.length; i++) {
//   const item = cart[i];
// }
