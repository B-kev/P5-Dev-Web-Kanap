//   altTxt: "Photo d'un canapé bleu, deux places";
//   colors: (3)[("Blue", "White", "Black")];
//   description: "Excepteur sint occaecat cupicanapésat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
//   imageUrl: "http://localhost:3000/images/kanap01.jpeg";
//   name: "Kanap Sinopé";
//   price: 1849;
//   _id: "107fb5b75607497b96722bda5b504926";

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(canapé) {
  // boucle

  for (let i = 0; i < canapé.length; i++) {
    //   Element du backend

    // const altTxt = canapés[i].name;
    // const description = canapés[i].description;
    // const imageUrl = canapés[i].imageUrl;
    // const id = "./product.html?id=" + canapés[i]._id;
    const { _id, name, description, imageUrl, altTxt } = canapé[i];

    /**
     * creation Element & balise
     *  */

    // creation image <img>

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altTxt;

    //   creation h3 <h3>

    const h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.innerText = name;

    //   creation p <p>

    const p = document.createElement("p");
    p.innerText = description;

    //   creation article <article></article>

    const article = document.createElement("article");
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    //   creation link <a></a>
    const aLink = document.createElement("a");
    aLink.href = "./product.html?id=" + _id;
    aLink.appendChild(article);

    // ajout des element dans la partie html

    const items = document.querySelector("#items");
    items.appendChild(aLink);
  }
}
