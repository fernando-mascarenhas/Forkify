import {elements, elementsStrings} from './base';

export const getInput = () => elements.searchInput.value; // return

export const clearInput = () => {
    elements.searchInput.value = ''; // The sintax avoid the confusion that there is a return as if we were to type like the get Input function
};

export const clearResults = () =>{
    // clear recipe list
    elements.searchResList.innerHTML = '';
    // clear result buttons buttons
    elements.searchResPages.innerHTML = '';      
}


const limitRecipeTittle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit){
        // Split divides an string into an using the reference between () in this case " " 
        title.split(' ').reduce ((acc, cur)=>{
            if (acc + cur.length <= limit){
                newTitle.push (cur);                
            }
            return acc + cur.length; // The reduce function needs to have an return
        },0);
        
        // Return the reduced title
        // Join is the opposite of split
        return  `${newTitle.join(' ')} ...`;
        
    }
    // Return the tittle in case it is bellow the limit
    return title;
   
} 


// Render a single recipe UI
const renderRecipe = recipe => {
        
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTittle (recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend',markup);


}


//type 'prev' or 'next'
//data-goto is added so we can easily access it with .dataset when handling the click event on index.js
const createButton = (page, type) =>`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>        
    </button>    
`

const renderButtons = (page, numResults, resPerPage) =>{   
    const pages = Math.ceil(numResults / resPerPage); // Math.ceil roundsup
    let button;

    if (page === 1 && pages >1) {
        // Only the button to go to next page
        button = createButton (page, 'next');
    }else if (page < pages) {
        // Both buttons -> Creating a string with both buttons
        button = `
            ${createButton (page, 'prev')} 
            ${createButton (page, 'next')}
        `;
    } 
    else if (page === pages && pages >1) {
        // Only the button to go to next page
        button = createButton (page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);

};


// Cicle trought the recipes array calling the renderRecipe function
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons (page, recipes.length, resPerPage);    
}

