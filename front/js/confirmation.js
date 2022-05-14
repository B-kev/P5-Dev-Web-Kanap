const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

const orderText = document.querySelector("#orderId");

orderText.innerText = orderId;
localStorage.clear();
