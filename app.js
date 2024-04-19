// https://www.exchangerate-api.com/docs/free

const inputCurrencySelect = document.getElementById("inputCurrencySelect");
const outputCurrencySelect = document.getElementById("outputCurrencySelect");
const inputValue = document.getElementById("inputValue");

const api = "https://open.er-api.com/v6/latest/";

// Dynamically adds currency options to select
async function populateSelect(select) {
    const response = await fetch(api + "sek");
    const data = await response.json();

    for (let currency in data.rates) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        select.appendChild(option);
    }
}

// Fetches corrency conversion rate
async function fetchConversion(inputCurrency, outputCurrency) {
  const response = await fetch(api + inputCurrency);
  const data = await response.json();
  const outputCurrencyRate = data.rates[outputCurrency];
  return outputCurrencyRate;
}

// Calculates the input value with exchange rate
async function calculate(inputValue, inputCurrency, outputCurrency) {
  const outputValueElement = document.getElementById("outputValue");
  const conversionRate = await fetchConversion(inputCurrency, outputCurrency);
  const total = inputValue * conversionRate;
  outputValueElement.value = total.toFixed(2); 
}

inputValue.addEventListener("change", () => {
    calculate(parseFloat(inputValue.value), inputCurrencySelect.value, outputCurrencySelect.value);
});

inputCurrencySelect.addEventListener("change", () => {
    calculate(parseFloat(inputValue.value), inputCurrencySelect.value, outputCurrencySelect.value);
});

outputCurrencySelect.addEventListener("change", () => {
    calculate(parseFloat(inputValue.value), inputCurrencySelect.value, outputCurrencySelect.value);
});

populateSelect(inputCurrencySelect);
populateSelect(outputCurrencySelect);
calculate(parseFloat(inputValue.value), inputCurrencySelect.value, outputCurrencySelect.value);
