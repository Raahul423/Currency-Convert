import { countryList } from "./codes.js";


const convertor = document.querySelectorAll(".convertor select");
const btn = document.querySelector(".btn")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")

for (let select of convertor) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option")
    newOption.innerText = currcode
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });

  const updateflag = (element) => {
    let currCode = element.value
    let countrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;

  }
}

btn.addEventListener("click",() => {
  let amount = document.querySelector(".amount input")
  let amtval = amount.value;
  if (amtval == "" || amtval <=0) {
    amount.value = 1;
  }
  const BASE_URL =` https://v6.exchangerate-api.com/v6/ffdf79d3d8d51e44e18f95d3/latest/${fromcurr.value}`
 
  fetch(BASE_URL).then(response=>response.json()).then(result=>{
    let exchnagerate = result.conversion_rates[tocurr.value];
    let totalexchangevalue=(amtval *exchnagerate).toFixed(2);

    let finalresult=document.querySelector(".exchange")
    finalresult.innerText= `${amount.value} ${fromcurr.value} = ${totalexchangevalue} ${tocurr.value}`;


  });
});

