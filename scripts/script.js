let bagItems = []
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem('bagItems')
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr): []
  generateItems();
  displayBagicons()
}
 function addToBag(itemId){
  bagItems.push(itemId)
  localStorage.setItem('bagItems',JSON.stringify(bagItems))
  displayBagicons()
 }

 function displayBagicons(){
  let countElement = document.querySelector('.icon-badge')
  if(bagItems.length > 0){
    countElement.style.visibility = 'visible'
    countElement.innerText = bagItems.length
  }
  else{
    countElement.style.visibility = 'hidden'
  }
 }

function generateItems() {
  let productElemet = document.querySelector(".product-grid");
  let newHTML = "";
  products.forEach((product) => {
    newHTML += `
<div class="product-card">
            <div class="product-image">
            <div class="discount-badge">${product.discount}% OFF</div>
            <button class="wishlist-btn">♡</button>
            ${product.image}
            </div>
            <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">
            <span class="current-price">${product.currentPrice}</span>
            <span class="original-price">${product.originalPrice}</span>
            </div>
            </div>
            <div class="rating">
            <span class="stars">★★★★☆ |</span>
            <span class="reviews">${product.reviews}</span>
            </div>
            <button class="add-to-cart" onclick="addToBag(${product.id})">Add Cart</button>
            </div>

`;
    productElemet.innerHTML = newHTML;
  });
}
