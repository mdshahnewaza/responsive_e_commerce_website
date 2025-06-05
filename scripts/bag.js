const CONVENIENCES_FEE = 99;
let bagItemObjects;
onLoad();
function onLoad() {
   productItemsGet();
  generateProductItems();
  displayBagSummary()
}

function displayBagSummary(){
  let summaryElement = document.querySelector('.summary')
  let totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  

  bagItemObjects.forEach(bagitemId=>{
    totalMRP += bagitemId.originalPrice
    totalDiscount += bagitemId.originalPrice - bagitemId. currentPrice
  })
 let finalAmount = totalMRP - totalDiscount + CONVENIENCES_FEE;

  summaryElement.innerHTML = `  <div class="summary-details">
        <p class="price-details">PRICE DETAILS (${totalItems} items)</p>
      <div class="summary-detail">
       <div class="total-items">
         <p class="total-mrp">Total MRP</p>
        <p class="total-discount">Discount on MRP</p>
        <p class="total-fee">Conveniences Fee</p>
       </div>
        <div class="total-number">
          <p>${totalMRP}</p>
          <p>${totalDiscount}</p>
          <p>99</p>
        </div>
      </div>
      <hr class="horizontal-line">
       <div class="total-amout">
          <p>Total Amount</p>
          <p>${finalAmount}</p>
        </div>
      <button class="order-btn">PLACE ORDER</button>
    </div>`
}

function productItemsGet() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < products.length; i++) {
      if (itemId == products[i].id) {
        return products[i];
      }
    }
  });
  console.log(bagItemObjects);
}


function generateProductItems() {
  let bagProductItems = document.querySelector(".bag-items-container");

  let newHTML = "";
  bagItemObjects.forEach((bagItem) => {
    newHTML += createHTML(bagItem);
  });
  bagProductItems.innerHTML = newHTML;
}

function removeBagItem(itemId) {
  bagItems = bagItems.filter(bagitemsId => bagitemsId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  productItemsGet();
  displayBagicons();
  generateProductItems();
  displayBagSummary()
}

function createHTML(item) {
  return `<div class="bag-item-conatiner">
        <div class="item-left-part">
          <p>${item.image}</p>
        </div>
        <div class="item-right-part">
          <p class="item-brand">${item.brand}</p>
          <p class="item-name">${item.name}</p>
          <div class="bag-price">
            <p class="current-price">Rs ${item.currentPrice}</p>
            <p class="original-price">Rs ${item.originalPrice}</p>
            <p class="item-discount">(${item.discount}% OFF)</p>
          </div>
          
          <p class="item-return">${item.discount} days return avilable</p>
          <p class="item-delivery">Delivery by <span class="item-date">10 may 2023</span></p>
          <p class="close" onclick="removeBagItem(${item.id})">X</p>
        </div>
        
      </div>`;
}


