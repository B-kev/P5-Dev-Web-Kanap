fetch(`http://localhost:3000/api/products`)
  .then((res) => res.json())
  .then((data) => sofas(data));

function sofas(z) {
  // la boucle commence

  z.forEach((kanap) => {
    const { altTxt, description, imageUrl, name, _id } = kanap;

    //   a
    const a = document.createElement("a");
    a.href = `./product.html?id=${_id}`;
    a.innerHTML = `
    <article>
      <img src="${imageUrl}" alt="${altTxt}">
      <h3 class="productName">${name}</h3>
      <p class="productDescription">${description}</p>
    </article>`;

    //   container
    document.getElementById("items").appendChild(a);
  });
}
