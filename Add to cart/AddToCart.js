let url = "https://63c9170d320a0c4c9540575f.mockapi.io/products";
let appending_div = document.querySelector("#for-product"); // in this div , every product will append
let amount_show = document.querySelector("#totalAppend");
let total_amount_show = document.querySelector("#total-Amount-Append");
let checkoutBtn = document.querySelector("#Checkout");

let api_data = [];
// JSON.parse(localStorage.getItem("addtocart"))
let addtocart_data = [23, 16];
if (addtocart_data == null) {
  addtocart_data = [];
}

// api data coming here
window.addEventListener("load", () => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      api_data = data;
      excute_func(api_data, addtocart_data);
    });
});

// this is the funtion responsible for excuting
function excute_func(apiData, cartData) {
  let totalAmount = 0;
  // geting unique data
  let uniqueElement = new Set(cartData);
  let data = apiData.filter((element) => {
    let flag = false;
    uniqueElement.forEach((ele) => {
      if (element.id == ele) {
        flag = true;
      }
    });
    return flag;
  }); // filter data;

  appending_div.innerHTML = "";

  data.forEach((ele) => {
    // creating here
    let number = 1;
    let main = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let crossIcon = document.createElement("div");

    let image = document.createElement("img");

    let productName = document.createElement("p");
    let refCode = document.createElement("p");
    let tickDiv = document.createElement("div");
    let first = document.createElement("div");
    let second = document.createElement("div");
    let quantityDiv = document.createElement("div");
    let quantityTag = document.createElement("p");
    let incrementDiv = document.createElement("div");
    let decrementBtn = document.createElement("button");
    let displayNumber = document.createElement("p");
    let IncrementBtn = document.createElement("button");
    let price = document.createElement("p");

    // filling id here
    main.id = "under-main";
    div1.id = "child1";
    div2.id = "child2";
    crossIcon.id = "remove";
    productName.id = "pr-name";
    tickDiv.id = "tickDiv";
    quantityDiv.id = "quantityDiv";
    incrementDiv.id = "incrementDiv";
    displayNumber.id = "displayNumber";
    price.id = "priceOF";

    // setting data here
    image.setAttribute("src", ele.src);
    productName.textContent = ele.name;
    refCode.textContent = ele.badge ?? "New";
    first.innerHTML = `<i class="fa-solid fa-check"></i> <span>Home Delivary</span>`;
    second.innerHTML = `<i class="fa-solid fa-check"></i> <span>Replacement in 7 Day </span>`;
    quantityTag.textContent = "Qty:";
    decrementBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    displayNumber.textContent = number;
    IncrementBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    price.textContent = ele.price;

    crossIcon.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;

    // some functionality over element
    crossIcon.addEventListener("click", () => {
      uniqueElement.delete(ele.id);
      addtocart_data = [...uniqueElement];
      localStorage.setItem("addtocart", JSON.stringify(addtocart_data));
      excute_func(apiData, addtocart_data);
    });

    decrementBtn.addEventListener("click", () => {
      if (number !== 0) {
        totalAmount -= ele.price;
      }
      number--;
      displayNumber.textContent = number;

      if (number == 0) number = 1;
      amount_show.innerHTML = totalAmount;
      total_amount_show.innerHTML = totalAmount;
    });

    IncrementBtn.addEventListener("click", () => {
      number++;
      displayNumber.textContent = number;
      totalAmount += ele.price;
      amount_show.innerHTML = totalAmount;
      total_amount_show.innerHTML = totalAmount;
    });
    // some functionality over element

    // appending here
    incrementDiv.append(decrementBtn, displayNumber, IncrementBtn);
    quantityDiv.append(quantityTag, incrementDiv, price);
    tickDiv.append(first, second);
    div2.append(productName, refCode, tickDiv, quantityDiv);
    div1.append(image);
    main.append(div1, div2, crossIcon);
    appending_div.append(main);

    totalAmount += Number(ele.price);
  });

  // update amount to DOM
  amount_show.innerHTML = totalAmount;
  total_amount_show.innerHTML = totalAmount;
}
checkoutBtn.addEventListener("click", () => {
 alert();
});