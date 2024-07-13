// Side Nav
function OpenSideNav() {
  $(".side-nav").animate({ left: 0 }, 500);
  $("#open-icon").removeClass("fa-align-justify");
  $("#open-icon").addClass("fa-x");
  $(".nav-links ul li").animate({ top: "0px" }, 700);
}

function CloseSideNav() {
  let OuterWidth = $(".side-nav .tab").outerWidth();
  $(".side-nav").animate({ left: -OuterWidth }, 500);
  $("#open-icon").addClass("fa-align-justify");
  $("#open-icon").removeClass("fa-x");
  $(".nav-links ul li").animate({ top: "200px" }, 700);
}

CloseSideNav();
$("#open-icon").click(function () {
  if ($(".side-nav").css("left") == "0px") {
    CloseSideNav();
  } else {
    OpenSideNav();
  }
});

// Side Nav

async function SearchbyNameAPI(Meal) {
  try {
    CloseSideNav();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${Meal}`
    );
    if (response.ok)
    {
    let result = await response.json();
    DisplayMeals(result);
    }
    else {
      $(".loader").fadeOut(300);
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function SearchbyLetterAPI(letter) {
  try {
    CloseSideNav();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let result = await response.json();
    document.getElementById("Searchinputs").classList.add("d-none");
    DisplayMeals(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

SearchbyNameAPI("");

function DisplayMeals(data) {
  document.getElementById("Searchinputs").classList.remove("d-none");
  document.getElementById("row-data").innerHTML = "";

  let box = ``;
  let meals = data.meals;

  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="food-item" onclick="DetailsbyidAPI(${meals[i].idMeal})">
                        <img src="${meals[i].strMealThumb}" class="w-100 rounded-3" alt="${meals[i].strMeal}">
                        <div class="item-layer d-flex justify-content-center align-items-center"><h1 class = "fs-4">${meals[i].strMeal}</h1></div>
                    </div>
                </div>
            `;
    }
  } else {
    box = `<p class="text-center text-white">No meals found</p>`;
  }

  document.getElementById("row-data").innerHTML = box;
}

async function DetailsbyidAPI(id) {
  try {
    CloseSideNav();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let result = await response.json();
    console.log(result);
    DisplayDetails(result);
  } catch (error) {
    console.error("Error fetching details:", error);
  }
}

function DisplayDetails(DetailsData) {
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");
  let meal = DetailsData.meals[0];

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert text-center alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let Tags = meal.strTags?.split(",");
  if (!Tags) Tags = [];

  let Alltags = "";
  for (let i = 0; i < Tags.length; i++) {
    Alltags += `<li class="alert alert-danger m-2 p-1">${Tags[i]}</li>`;
  }

  let box = ``;

  box += `
        <div class="col-md-4 text-white">
            <img src="${meal.strMealThumb}" class="w-100" alt="">
            <h4 class="fs-2">${meal.strMeal}</h4>
        </div>
        <div class="col-md-8 text-white position-relative">
            <i class="fa-solid position-absolute fa-x closedetails fs-4" onclick="SearchbyNameAPI('')"></i>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
            <p class="fw-bold fs-3">Area: ${meal.strArea}</p>
            <p class="fw-bold fs-3">Category: ${meal.strCategory}</p>
            <div>
                <p class="fs-4">Recipes:</p>
                <ul class="d-flex list-unstyled flex-wrap">
                    ${ingredients}
                </ul>
            </div>
            <div>
                <p class="fs-4">Tags:</p>
                <ul class="d-flex list-unstyled">
                    ${Alltags}
                </ul>
            </div>
            <div class="btns d-flex">
                <a target="_blank" href="${meal.strSource}" class="btn btn-success m-2">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger m-2">YouTube</a>
            </div>
        </div>
    `;

  document.getElementById("row-data").innerHTML = box;
}

$("#SearchLink").click(function () {
  DisplaySearch();
});

function DisplaySearch() {
  CloseSideNav();
  document.getElementById("Searchinputs").classList.remove("d-none");
  document.getElementById("row-data").innerHTML = "";
  let box = ``;

  box += `
        <div class="col-md-6">
            <input type="text" class="form-control" id="SearchbyName" placeholder="Search By Name" onkeyup="SearchbyNameAPI(this.value)">
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="SearchbyLetter" placeholder="Search By First Letter" maxlength="1" onkeyup="SearchbyLetterAPI(this.value)">
        </div>
    `;
  document.getElementById("Searchinputs").innerHTML = box;
}

async function categoriesAPI() {
  CloseSideNav();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let result = await response.json();
  Displaycategories(result);
}

function Displaycategories(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");
  let box = ``;
  let categories = result.categories;

  for (let i = 0; i < categories.length; i++) {
    let description = categories[i].strCategoryDescription;
    if (description) {
      description = description.slice(0, 120) + "...";
    }

    box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="food-item" onclick="FilterbyCategoryAPI('${categories[i].strCategory}')">
                    <img src="${categories[i].strCategoryThumb}" class="w-100 rounded-3" alt="${categories[i].strCategory}">
                    <div class="item-layer d-flex justify-content-center align-items-center flex-column">
                        <h1>${categories[i].strCategory}</h1>
                        <p class = "text-center" >${description}</p>
                    </div>
                </div>
            </div>
        `;
  }
  document.getElementById("row-data").innerHTML = box;
}

async function FilterbyCategoryAPI(Category) {
  CloseSideNav();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`
  );
  let result = await response.json();
  DisplayFilterbyCategory(result);
}

function DisplayFilterbyCategory(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");

  let box = ``;
  let meals = result.meals;

  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="food-item" onclick="DetailsbyidAPI(${meals[i].idMeal})">
                        <img src="${meals[i].strMealThumb}" class="w-100 rounded-3" alt="${meals[i].strMeal}">
                        <div class="item-layer d-flex justify-content-center align-items-center"><h1 class = "fs-4">${meals[i].strMeal}</h1></div>
                    </div>
                </div>
            `;
    }
  }

  document.getElementById("row-data").innerHTML = box;
}

$("#CategoriesLink").click(function () {
  categoriesAPI();
});

async function AriaAPI() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let result = await response.json();
  DisplayAllAria(result);
}

function DisplayAllAria(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");
  let box = ``;
  let meals = result.meals;
  for (let i = 0; i < meals.length; i++) {
    box += `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="text-white text-center area-item" onclick="FilterbyAriaAPI('${meals[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h1 class="fs-4">${meals[i].strArea}</h1>
            </div>
        </div>
        `;
  }
  document.getElementById("row-data").innerHTML = box;
}

async function FilterbyAriaAPI(Aria) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Aria}`
  );
  let result = await response.json();
  console.log(result, "filter by aria");
  DisplayFoodbyAria(result);
}

function DisplayFoodbyAria(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");

  let box = ``;
  let meals = result.meals;

  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="food-item" onclick="DetailsbyidAPI(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" class="w-100 rounded-3" alt="${meals[i].strMeal}">
                    <div class="item-layer d-flex justify-content-center align-items-center"><h1 class="fs-4">${meals[i].strMeal}</h1></div>
                </div>
            </div>
            `;
    }
  }

  document.getElementById("row-data").innerHTML = box;
}

$("#AreaLink").click(function () {
  AriaAPI();
});

async function getallIngredientsAPI() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let result = await response.json();
  DisplayIngredients(result);
}

function DisplayIngredients(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").innerHTML = "";
  let box = ``;
  let meals = result.meals;

  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="food-item" onclick=" FilterbymainingredientAPI('${meals[i].strIngredient}')">
                    <img src="https://www.themealdb.com/images/ingredients/${meals[i].strIngredient}-Small.png" class="w-100 rounded-3" alt="${meals[i].strIngredient}">
                    <div class="item-layer d-flex justify-content-center align-items-center"><h1 class="fs-4">${meals[i].strIngredient}</h1></div>
                </div>
            </div>
            `;
    }
  }

  document.getElementById("row-data").innerHTML = box;
}

async function FilterbymainingredientAPI(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let result = await response.json();
  DisplayFilterbyMainIngredient(result);
}

function DisplayFilterbyMainIngredient(result) {
  CloseSideNav();
  document.getElementById("row-data").innerHTML = "";
  document.getElementById("Searchinputs").classList.add("d-none");

  let box = ``;
  let meals = result.meals;

  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      box += `
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="food-item" onclick="DetailsbyidAPI(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" class="w-100 rounded-3" alt="${meals[i].strMeal}">
                    <div class="item-layer d-flex justify-content-center align-items-center"><h1 class="fs-4">${meals[i].strMeal}</h1></div>
                </div>
            </div>
            `;
    }
  }

  document.getElementById("row-data").innerHTML = box;
}

$("#IngredientsLink").click(function () {
  getallIngredientsAPI();
});

function showContacts() {
    CloseSideNav();
    document.getElementById("row-data").innerHTML = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">The Email is not valid *exemple@test.xxx</div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">Please Enter A Valid Phone Number!</div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">Please Enter A Valid age!</div>
                    </div>
                    <div class="col-md-6">
                        <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">Please Enter a valid password *Minimum eight characters, at least one letter and one number:*</div>
                    </div>
                    <div class="col-md-6">
                        <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">Please Enter a valid repassword</div>
                    </div>
                </div>
                <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div>
    `;
    addFocusListeners();
}

function addFocusListeners() {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focus", () => { window[input.id + "Touched"] = true;});
    });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function validateField(inputId, regex, alertId) {
    const value = document.getElementById(inputId).value;
    const isValid = regex.test(value);
    document.getElementById(alertId).classList.toggle("d-none", isValid);
    document.getElementById(alertId).classList.toggle("d-block", !isValid);
    return isValid;
}

function inputsValidation() {
    const validations = [
        validateField("nameInput", /^[a-zA-Z ]+$/, "nameAlert"),
        validateField("emailInput", /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "emailAlert"),
        validateField("phoneInput", /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "phoneAlert"),
        validateField("ageInput", /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/, "ageAlert"),
        validateField("passwordInput", /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/, "passwordAlert"),
        validateField("repasswordInput", new RegExp("^" + document.getElementById("passwordInput").value + "$"), "repasswordAlert")
    ];
    if (validations.every(validation => validation === true)) {
    document.getElementById("submitBtn").disabled = false;
    } else {
    document.getElementById("submitBtn").disabled = true;
    }

}

$('#ContactLink').click(function(){
  showContacts();
})