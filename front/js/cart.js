const numberOfItems = localStorage.length;
const cart = [];
let totalPrice = 0;
let totalQuantity = 0;

/** * ***** ******************* ******** **************
 * ! ****** ****  recuperation localStorage ************/
//@ ******************************************************

for (let i = 0; i < numberOfItems; i++) {
  const item = localStorage.getItem(localStorage.key(i));
  const itemObject = JSON.parse(item);
  cart.push(itemObject);
}

/** * ************* ******** ******* *************** **********
 * !  +++++++++++*********  Items boucle  ********+++++++++++*/
//@ ***********************************************************

for (let i = 0; i < cart.length; i++) {
  const itm = cart[i];
  let { quantity, id, color } = itm;

  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((res) => sofas(res));
  function sofas(z) {
    let { altTxt, colors, description, imageUrl, name, price } = z;
    realise(imageUrl, name, price);
  }

  function realise(imageUrl, name, price, altTxt) {
    const divImg = makeImg(imageUrl, altTxt);
    prix = price * quantity;
    // console.log(quantity);

    const h2 = makeH2(name);
    const pColor = makePcolor(color);
    const pQuantity = makePquantity(quantity);
    const pPrice = makePrice(prix);
    const pDelete = makePDelete();

    // totalQuantity += quantity;

    const input = makeInput(prix, price, quantity, pQuantity, pPrice);

    /**
     * * ******************** **********
     * @ makeDivDescription
     * * makeDivSettings
     * todo: makemakeDivDelete
     * ? makeArticle
     * * ********************* **********
     */

    const divDescription = makeDivDescription(h2, pColor, pPrice); //@ --------------

    const divSettings = makeDivSettings(pQuantity); //* -----------------------
    divSettings.appendChild(input); //* ---------------------------------------

    const divDelete = makemakeDivDelete(pDelete, itm); //todo ----------------------

    const divContent = makeDivContent(divDescription, divSettings, divDelete); //? ---------------

    const article = makeArticle(color, id, divImg); // ------------------------
    article.appendChild(divContent); // ---------------------------------------

    totalPrice += prix;
    totalQuantity += quantity;

    document.getElementById("totalPrice").innerText = totalPrice;
    document.getElementById("totalQuantity").innerText = totalQuantity;
  }
}

// ! ---------------------***************    les pusher Functions vers la voucle    ***************----------------

/**
 * @ Create makeImg
 * * Create makeInput
 * todo: Create makeH2
 */

function makeImg(imageUrl, altTxt) {
  //  image
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;

  // container img <div class="cart__item__img"></div>
  const divImg = document.createElement("div");
  divImg.classList.add("cart__item__img");
  divImg.appendChild(img);
  return divImg;
}

function makeInput(prix, price, quantity, pQuantity, pPrice) {
  const input = document.createElement("input");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = 1;
  input.max = 100;
  input.value = quantity;
  input.classList.add("itemQuantity");
  input.addEventListener("click", (e) => clickInput(e));
  function clickInput(e) {
    input.value = e.target.value;
    quantity = input.value;
    prix = price * quantity;
    totalPrice;
    totalPrice += prix;

    pQuantity.innerText = "Qté : " + quantity + " ";
    pPrice.innerText = prix;
  }
  return input;
}

function makeH2(name) {
  const h2 = document.createElement("h2");
  h2.innerText = name;
  return h2;
}

/**
 * * ********************** ****  **************
 * @ Create Paragraphe-Color        ************
 * * Create Paragraphe-Quantity     ************
 * todo: Create Paragraphe-Price    ************
 * ? Create Paragraphe-Delete       ************
 * * ***********************  ****  ************
 */

function makePcolor(color) {
  const pColor = document.createElement("p");
  pColor.innerText = color;
  return pColor;
} //@ ----------------------------------------------

function makePquantity(quantity) {
  const pQuantity = document.createElement("p");
  pQuantity.innerText = "Qté : " + quantity + " ";
  return pQuantity;
} //* ----------------------------------------------

function makePrice(prix) {
  const pPrice = document.createElement("p");
  pPrice.innerText = prix;

  return pPrice;
} //todo -----------------------------------------------

function makePDelete(itm) {
  let pDelete = document.createElement("p");
  pDelete.innerText = "Supprimer";
  pDelete.classList.add("deleteItem");

  return pDelete;
}
//? ------------------------------------------------------

/**
 * *******************************************************
 * @ makeDivDescription     ******************************
 * * makeDivSettings        ******************************
 * todo: makemakeDivDelete  ******************************
 * ! makeDivContent         ******************************
 * ? makeArticle            ******************************
 * *******************************************************
 */

function makeDivDescription(h2, pColor, pPrice) {
  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");
  divDescription.appendChild(h2);
  divDescription.appendChild(pColor);
  divDescription.appendChild(pPrice);
  return divDescription;
} //@ -----------------------------------------------------------

function makeDivSettings(pQuantity) {
  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");
  divSettings.appendChild(pQuantity);
  return divSettings;
} //* ------------------------------------------------------------

function makemakeDivDelete(pDelete, itm) {
  const divDelete = document.createElement("div");
  divDelete.appendChild(pDelete);
  divDelete.classList.add("cart__item__content__settings__delete");

  divDelete.addEventListener("click", () => {
    const itmToDelete = cart.findIndex((product) => product.id === itm.id); //! dans cart trouve le product =>(tel que) product.id ===(soit égale) à itm.id

    cart.splice(itmToDelete, 1); //!
    removeFromLocal(itm);
    location.reload();
  });
  function removeFromLocal(itm) {
    const key = `${itm.id}`;
    localStorage.removeItem(key);
  }

  return divDelete;
} //todo -----------------------------------------------------------

function makeDivContent(divDescription, divSettings, divDelete) {
  const divContent = document.createElement("div");
  divContent.classList.add("cart__item__content");
  divContent.appendChild(divDescription);
  divContent.appendChild(divSettings);
  divContent.appendChild(divDelete);
  return divContent;
} //! ---------------------------------------------------------------

function makeArticle(color, id, divImg) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = id;
  article.dataset.color = color;
  // apend
  document.getElementById("cart__items").appendChild(article);
  article.appendChild(divImg);
  return article;
} //? -----------------------------------------------------------------
