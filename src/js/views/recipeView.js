import {elements} from './base';
// Fraction is the name exported in the module
import {Fraction} from 'fractional';

const formatCount = count => {
    if (count) {
        // destructuring the number in an array with 2 strings -> interger and decimal parts
        // Then map will creat a new array using ParseInt to turn them to number again
        const [int, dec] = count.toString().split('.').map(el => parseInt (el, 10));

        if (!dec) return count;

        if (int === 0 ) {
            const fr = new Fraction (count);

            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction (count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
                        
    }
    return '?';    
};


// On the renderRecipe function we use map in the ingredients array to create a new array using the information to create strings containing the HTML code for the list item.
// Them we join the array of strings create using map using the method array.join().
const createIngredient = ingredients => `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(ingredients.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredients.unit}</span>
                ${ingredients.ingredient}
            </div>
        </li>
        `;        
  

// Recieve the select info and render recipe in the UI
export const renderRecipe = recipe => {
      
    // Render recipe
    const markup= `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-dec">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-inc">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>           
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">                
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.autor}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>                      

        </div>
    `
    elements.recipeDetails.insertAdjacentHTML('afterbegin',markup);
}
  

export const clearRecipe = () => {
    elements.recipeDetails.innerHTML = ''
};    


export const updateServingsIngredients = recipe => {
    // update the servings
    // this querySelector can´t be add in base.js because it is created after loading
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // update the ingredientes
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach ((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};

