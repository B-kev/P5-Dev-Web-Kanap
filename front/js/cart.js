// const numberOfItems = localStorage.length;
const cart = [];
let totalPrice = 0;
let totalQuantity = 0;

/** * ***** ******************* ******** **************
 * ! ****** ****  recuperation localStorage ************/
//@ ******************************************************

function init() {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

init();

/** * ************* ******** ******* *************** **********
 * !  +++++++++++*********  Items boucle  ********+++++++++++*/
//@ ***********************************************************

function panier() {
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

      totalPrice += prix;
      totalQuantity += quantity;

      const h2 = makeH2(name);
      const pColor = makePcolor(color);
      const pQuantity = makePquantity(quantity);
      const pPrice = makePrice(prix);
      const pDelete = makePDelete();

      const input = makeInput(
        prix,
        price,
        quantity,
        pQuantity,
        pPrice,
        id,
        itm
      );

      /**
       * * ******************** **********
       * @ makeDivDescription
       * * makeDivSettings
       * todo: makemakeDivDelete
       * ? makeArticle
       * * **************** ***** *********
       */

      const divDescription = makeDivDescription(h2, pColor, pPrice); //@ --------------

      const divSettingsQt = makeDivSettingsQt(pQuantity, input); //* -----------------------

      const divSettings = makeDivSettings(divSettingsQt); //* -----------------------

      const divDelete = makemakeDivDelete(pDelete, itm, id); //todo ----------------------

      const divContent = makeDivContent(divDescription, divSettings, divDelete); //? ---------------

      const article = makeArticle(color, id, divImg); // ------------------------
      article.appendChild(divContent); // ---------------------------------------

      document.getElementById("totalPrice").innerText = totalPrice;
      document.getElementById("totalQuantity").innerText = totalQuantity;
    }
  }
}

panier();

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

function makeInput(prix, price, quantity, pQuantity, pPrice, id, itm) {
  const input = document.createElement("input");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = 1;
  input.max = 100;
  input.value = quantity;
  input.classList.add("itemQuantity");
  input.addEventListener("input", () =>
    newPriceAndQt(input.value, id, itm, prix, price)
  );

  function newPriceAndQt(newValue, id, prix) {
    if (Number(newValue) < 1 || Number(newValue) > 100) {
      alert("la quantité doit être compis entre 1 & 100 !! 👀");
      return;
    } else if (Number(newValue) == null || Number(newValue) == 0) {
      alert("veillez choisir la quantitée svp !! 👀");
    } else {
      const itmToAdd = cart.find((product) => product.id === id); //! dans cart trouve le product =>(tel que) product.id ===(soit égale) à itm.id
      itmToAdd.quantity = Number(newValue);
      itm.quantity = itmToAdd.quantity;

      prix = itmToAdd.quantity * price;
      pPrice.innerText = prix + " €";

      let totalQuantity = 0;
      let totalPrice = 0;

      for (let i = 0; i < cart.length; i++) {
        const itm = cart[i];
        let { quantity, id, color } = itm;

        fetch(`http://localhost:3000/api/products/${id}`)
          .then((res) => res.json())
          .then((res) => sofas(res));
        function sofas(z) {
          let { altTxt, colors, description, imageUrl, name, price } = z;
          clickRealise(price);
        }

        function clickRealise(price) {
          newPrice = price * quantity;

          totalQuantity += quantity;
          totalPrice += newPrice;

          document.getElementById("totalPrice").innerText = totalPrice;
          document.getElementById("totalQuantity").innerText = totalQuantity;
        }
      }
    }

    addFromLocal(itm);
  }

  return input;
}
function addFromLocal(itm) {
  const dataTosave = JSON.stringify(itm);
  const key = `${itm.id}-${itm.color}`;
  localStorage.setItem(key, dataTosave);
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

function makePquantity() {
  const pQuantity = document.createElement("p");
  pQuantity.innerText = "Qté :";
  return pQuantity;
} //* ----------------------------------------------

function makePrice(prix) {
  const pPrice = document.createElement("p");
  pPrice.innerText = prix + " €";

  return pPrice;
} //todo -----------------------------------------------

function makePDelete() {
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

function makeDivSettings(makeDivSettingsQt) {
  const divSettings = document.createElement("div");
  divSettings.classList.add("cart__item__content__settings");
  divSettings.appendChild(makeDivSettingsQt);
  return divSettings;
}
function makeDivSettingsQt(pQuantity, input) {
  const makeDivSettingsQt = document.createElement("div");
  makeDivSettingsQt.classList.add("cart__item__content__settings__quantity");
  makeDivSettingsQt.appendChild(pQuantity);
  makeDivSettingsQt.appendChild(input);
  return makeDivSettingsQt;
}
//* ------------------------------------------------------------

function makemakeDivDelete(pDelete, itm, id) {
  const divDelete = document.createElement("div");
  divDelete.appendChild(pDelete);
  divDelete.classList.add("cart__item__content__settings__delete");

  divDelete.addEventListener("click", () => {
    let result = confirm("voulez-vous vraiment supprimer cet article?");

    if (result) {
      const itmToDelete = cart.findIndex(
        (product) => product.id === itm.id && product.color === itm.color
      ); //! dans cart trouve le product =>(tel que) product.id ===(soit égale) à itm.id
      const element = document.querySelector(`[data-id="${id}"]`);

      cart.splice(itmToDelete, 1); //!

      removeFromLocal(itm);
      element.remove();

      alert("le produit a été supprimer");
    }

    location.reload();
  });

  function removeFromLocal(itm) {
    const key = `${itm.id}-${itm.color}`;
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

/////////////////////////////////////////////////////////////////////////////////////////

const orderButton = document.querySelector("#order");

orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("svp choisissez un produit à acheter");
    return;
  }

  if (valideForm() === true) {
    return;
  }

  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdFromLocalStorage(),
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const orderId = res.orderId;
      location.href = "/html/confirmation.html" + "?orderId=" + orderId;
    });
});

function valideForm() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.value === "") {
      alert("svp remplissez tous les champs avant de passer votre commande");
      return true;
    }
  });
}

function getIdFromLocalStorage() {
  const numberOfItems = localStorage.length;
  const ids = [];

  for (let i = 0; i < numberOfItems; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
