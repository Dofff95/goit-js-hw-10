
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Kvq9abCz1PZoBOEyqUcCrq8wh3dTmJ0qSF0bx630AC3wxsIW3k8ePGDuWcnKRBtD";

// ===========================================================================
// // Функція для виконання HTTP-запиту 
export function fetchBreeds() {

  const loader = document.querySelector(".loader");
  loader.style.display = "block";

  const error = document.querySelector(".error");
  error.style.display = "none";

  const breedSelect = document.querySelector(".breed-select");
  breedSelect.style.display = "none";

  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
  
      loader.style.display = "none";

      breedSelect.style.display = "block";

      const breeds = response.data;
      const select = document.querySelector("select.breed-select");
      select.innerHTML = "";
      breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });

      return response.data;
    })
    .catch(error => {
      error.style.display = "block";
      breedSelect.style.display = "none";
      loader.style.display = "none";

      console.error("Помилка при отриманні списку порід:", error);
    });
}
// ===========================================================================
export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
