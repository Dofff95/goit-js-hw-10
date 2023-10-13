import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_Kvq9abCz1PZoBOEyqUcCrq8wh3dTmJ0qSF0bx630AC3wxsIW3k8ePGDuWcnKRBtD";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorElement = document.querySelector(".error");

// ===========================================================================
fetchBreeds()
.then((breeds) => {
    const breedSelect = document.querySelector(".breed-select");

    breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
})
.catch((error) => {
    console.error("Помилка під час отримання колекції порід", error);
});
// ===========================================================================
function displayCatInfo(catData) {
  const cat = catData[0];
  const catBreed = cat.breeds[0];
  catInfoDiv.innerHTML = `
    <img src="${cat.url}" alt="${catBreed.name}">
    <h2>${catBreed.name}</h2>
    <p>${catBreed.description}</p>
    <p>Temperament: ${catBreed.temperament}</p>
  `;
  const img = document.querySelector("img")
  img.style.width = "400px"
}

// ==============================================================

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    loader.classList.remove("hidden");
    breedSelect.classList.add("hidden");
    catInfoDiv.classList.add("hidden");
    errorElement.classList.add("hidden");
  }
});

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
    .then((catInfo) => {
        displayCatInfo(catInfo);
        errorElement.style.display = "none";
    })
      .catch((error) => {
        catInfoDiv.innerHTML = "";
        errorElement.style.display = "block";
        console.error("Помилка під час отримання інформації про кота", error);
      });
    }
});
