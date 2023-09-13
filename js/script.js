let cart = [];
let menu = document.querySelector("#menu-btn");
let navbar = document.querySelector(".header .navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".home-slider", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".reviews-slider", {
  loop: true,
  spaceBetween: 20,
  autoHeight: true,
  grabCursor: true,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

let loadMoreBtn = document.querySelector(".packages .load-more .btn");
let currentItem = 3;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll(".packages .box-container .box")];
  for (var i = currentItem; i < currentItem + 3; i++) {
    boxes[i].style.display = "inline-block";
  }
  currentItem += 3;
  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = "none";
  }
};
/*Korpa za kupovinu */
// Inicijalizacija promenljive cart

// Funkcija za dodavanje u korpu

function addToCart(productName, productPrice) {
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  updateCart();
}
// ...ostali kod...

// Dodajte funkcionalnost za prikaz korpe kada se klikne na "Kupi"
const buyButtons = document.querySelectorAll(".buy-button");
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = "block"; // Prikazujemo korpu
  });
});

// ...ostali kod...

// Funkcija za ažuriranje korpe na ekranu
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let total = 0;

  cartItemsContainer.innerHTML = "";

  cart.forEach((product) => {
    const productElement = document.createElement("li");
    productElement.innerHTML = `
            ${product.name} - $${product.price} x ${product.quantity}
            <button class="remove-button" data-name="${product.name}">x</button>
        `;
    cartItemsContainer.appendChild(productElement);
    total += product.price * product.quantity;
  });

  cartTotalElement.textContent = total.toFixed(2);

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = event.target.getAttribute("data-name");
      const productIndex = cart.findIndex((item) => item.name === productName);
      cart.splice(productIndex, 1);
      updateCart();
    });
  });
}

// ...ostali kod...

// Dodajte funkcionalnost za praznjenje korpe
const clearCartButton = document.getElementById("clear-cart");
clearCartButton.addEventListener("click", () => {
  cart = [];
  updateCart();
});
