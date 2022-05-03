fetch(`http://localhost:3000/api/products`)
  .then((res) => res.json())
  .then((data) => canapés(data));

function canapés(z) {
  // la boucle commence

  z.forEach((kanap) => {
    const { altTxt, description, imageUrl, name, _id } = kanap;

    // image
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = altTxt;

    //   h3
    const h3 = document.createElement("h3");
    h3.innerText = name;

    //   p
    const p = document.createElement("p");
    p.innerText = description;

    //   article
    const article = document.createElement("article");
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    //   a
    const a = document.createElement("a");
    a.href = `./product.html?id=${_id}`;
    a.appendChild(article);

    //   container
    const itemContainer = document.getElementById("items");
    itemContainer.appendChild(a);
  });
}
