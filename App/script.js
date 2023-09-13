const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convertButton");
const resultText = document.getElementById("resultText");

const apiUrl = "https://v6.exchangerate-api.com/v6/65347d26231056f0691f1f90/latest";

function populateCurrencyOptions() {
  fetch(`${apiUrl}/USD`)
    .then((response) => response.json())
    .then((data) => {
      const currencyRates = data.conversion_rates;

      for (const currency in currencyRates) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = currency;
        option2.value = currency;
        option1.textContent = currency;
        option2.textContent = currency;
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
      }
    })
    .catch((error) => {
      console.error("Error fetching data from the API:", error);
      resultText.textContent = "Unable to fetch exchange rates. Please try again later.";
    });
}


function convertCurrency() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (amount < 0) {
    resultText.textContent = "Please enter a valid amount.";
    return;
  }

  if (fromCurrency === toCurrency) {
    resultText.textContent = "Cannot convert the same currency.";
    return;
  }

  fetch(`${apiUrl}/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const conversionRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * conversionRate).toFixed(2);
      resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error fetching conversion rate from the API:", error);
      resultText.textContent = "Unable to fetch conversion rate. Please try again later.";
    });
}

populateCurrencyOptions();

convertButton.addEventListener("click", convertCurrency);
