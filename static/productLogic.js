const productdiv = document.getElementById("product");

function renderproducts(products) {
  for (let product of products) {
    const element = document.createElement("div");
    const imge = document.createElement("img");
    imge.src = product.image;
    element.textContent = product.title;
    element.className = "product";
    element.appendChild(imge);
    productdiv.appendChild(element);
  }
}

async function getData() {
  const url = "https://fakestoreapi.com/products";
  const response = await fetch(url);
  const data = await response.json();
  renderproducts(data);
}

window.addEventListener("DOMContentLoaded", getData());
