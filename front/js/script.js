fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(dat) {
  const imageUrl = dat[0].imageUrl;
  const aLink = document.createElement("a");
  aLink.href = imageUrl;
  aLink.text = dat[0].name;
  const items = document.querySelector("#items");
  items.appendChild(aLink);
}
