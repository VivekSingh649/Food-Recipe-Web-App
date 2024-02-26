const searchFrom = document.querySelector(".form_controal"),
  searchBox = searchFrom.querySelector("#searchbox"),
  recipeWrapper = document.querySelector(".recipes_wraapper"),
  popupContainer = document.querySelector(".popup_container"),
  messageBox = document.querySelector(".msg"),
  allKeywords = document.querySelectorAll(".top_search p");

let perpage = 9;

// Main js
searchFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = searchBox.value.toLowerCase();
  findRecipe(searchValue);
  allKeywords.forEach((btn) => {
    if (searchValue != btn.innerText.toLowerCase()) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
});

// Function to fetch and display recipes
async function findRecipe(searchFor) {
  recipeWrapper.innerHTML = "";
  // Display skeleton cards
  for (let i = 0; i < 6; i++) {
    let skeletonContainer = document.createElement("div");
    skeletonContainer.classList.add("skeleton_card");
    skeletonContainer.innerHTML = `
        <div class="skeleton_thum"></div>
        <div class="skeleton_content">
            <h2 class="skeleton_h3"></h2>
            <p class="skeleton_p"></p>
            <p class="skeleton_p"></p>
            <p class="skeleton_p last_p"></p>
            <button class="skeleton_btn"></button>
        </div>`;
    recipeWrapper.appendChild(skeletonContainer);
  }

  // Fetch data from API
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFor}`;
  let response = await fetch(apiUrl);
  let data = await response.json();

  // Wait for 2 seconds before replacing skeleton cards with actual recipe cards
  setTimeout(() => {
    if (data.meals === null) {
      messageBox.style.display = "block";
    } else {
      messageBox.style.display = "none";
      let results = data.meals;
      results.forEach((recipe) => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipes_card");
        recipeCard.innerHTML = `
                      <div class="thum">
                          <img src="${recipe.strMealThumb}">
                          <span class="typeof">${recipe.strCategory}</span>
                      </div>
                      <div class="recipes_card_content">
                          <h2 class="recipe_name">${recipe.strMeal}</h2>
                          <p>${recipe.strInstructions}</p>
                          <button class="btn_1" id="showPopup">Read More</button>
                      </div>`;
        recipeWrapper.appendChild(recipeCard);
        let showPopup = recipeCard.querySelector("#showPopup");
        showPopup.addEventListener("click", () => {
          let recipeDescription = recipe.strInstructions.replace(
            /\r\n/g,
            "<br>"
          );
          popupContainer.classList.add("show");
          popupContainer.innerHTML = `<div class="popup_box">
                                              <div class="popup_head">
                                                  <h2>${recipe.strMeal}</h2>
                                                  <i class="bi bi-x-lg" id="crossicon" onclick="hidePopUp()"></i>
                                              </div>
                                              <div class="popup_image_container">
                                                  <div class="recipe_image">
                                                      <div class="thumb">
                                                          <img src="${recipe.strMealThumb}">
                                                          <div class="recipe_info">
                                                              <h3>${recipe.strMeal}</h3>
                                                              <p>${recipe.strCategory}</p>
                                                              <p>${recipe.strArea}</p>
                                                              <p>${recipe.strTags}</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div class="recipe_content">
                                                      <h3>Instructions</h3>
                                                      <p>${recipeDescription}</p>
                                                      <div class="ingredients_wrapper">
                                                      <p>${recipe.strIngredient1}</p>
                                                      <p>${recipe.strMeasure1}</p>
                                                      <p>${recipe.strIngredient2}</p>
                                                      <p>${recipe.strMeasure2}</p>
                                                      <p>${recipe.strIngredient3}</p>
                                                      <p>${recipe.strMeasure3}</p>
                                                      <p>${recipe.strIngredient4}</p>
                                                      <p>${recipe.strMeasure4}</p>
                                                      <p>${recipe.strIngredient5}</p>
                                                      <p>${recipe.strMeasure5}</p>
                                                      <p>${recipe.strIngredient6}</p>
                                                      <p>${recipe.strMeasure6}</p>
                                                      <p>${recipe.strIngredient7}</p>
                                                      <p>${recipe.strMeasure7}</p>
                                                      <p>${recipe.strIngredient8}</p>
                                                      <p>${recipe.strMeasure8}</p>
                                                      <p>${recipe.strIngredient9}</p>
                                                      <p>${recipe.strMeasure9}</p>
                                                      <p>${recipe.strIngredient10}</p>
                                                      <p>${recipe.strMeasure10}</p>
                                                      <p>${recipe.strIngredient11}</p>
                                                      <p>${recipe.strMeasure11}</p>
                                                      <p>${recipe.strIngredient12}</p>
                                                      <p>${recipe.strMeasure12}</p>
                                                      <p>${recipe.strIngredient13}</p>
                                                      <p>${recipe.strMeasure13}</p>
                                                      <p>${recipe.strIngredient14}</p>
                                                      <p>${recipe.strMeasure14}</p>
                                                      <p>${recipe.strIngredient15}</p>
                                                      <p>${recipe.strMeasure15}</p>
                                                      <p>${recipe.strIngredient16}</p>
                                                      <p>${recipe.strMeasure16}</p>
                                                      <p>${recipe.strIngredient17}</p>
                                                      <p>${recipe.strMeasure17}</p>
                                                      <p>${recipe.strIngredient18}</p>
                                                      <p>${recipe.strMeasure18}</p>
                                                      <p>${recipe.strIngredient19}</p>
                                                      <p>${recipe.strMeasure19}</p>
                                                      <p>${recipe.strIngredient20}</p>
                                                      <p>${recipe.strMeasure20}</p>
                                                      </div>
                                                  </div>
                                              </div>
                                            </div>`;
          showIngredints();
        });
      });
    }

    // Remove skeleton cards
    const skeletonCards = document.querySelectorAll(".skeleton_card");
    skeletonCards.forEach((card) => {
      card.remove();
    });
  }, 300);
}

function showIngredints() {
  let ingredients = popupContainer.querySelectorAll(".ingredients_wrapper p");
  ingredients.forEach((ingredient) => {
    if (!ingredient.innerText || ingredient.innerText == "null") {
      ingredient.style.display = "none";
    }
  });
}

function hidePopUp() {
  popupContainer.classList.remove("show");
}

allKeywords.forEach((keyword) => {
  keyword.addEventListener("click", () => {
    searchBox.value = "";
    allKeywords.forEach((btn) => btn.classList.remove("active"));
    keyword.classList.add("active");
    let findFor = keyword.innerText;
    findRecipe(findFor);
    showIngredints();
  });
});

// Calling Funtion with a Value
findRecipe("cake");
