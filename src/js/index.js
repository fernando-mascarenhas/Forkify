// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'; // will return a object named searchView with all functions
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {
    
};

/** 
 * SEARCH CONTROLER 
 */
const controlSearch = async () =>{
    // 1) Get the query from the view
    const query = searchView.getInput();
        
    if (query){
        // 2) New search object and add to state
        state.search = new Search(query);
        
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
            

            // 5) Surrender results in the UI
            clearLoader();
            searchView.renderResults (state.search.result);

        } catch (error){
            alert (`Error getting the search results: ${error}`)
        }
                
    }
};

// Event listener for the search form
elements.searchForm.addEventListener('submit', el => {
    el.preventDefault(); // avoid the default behavior os the submit form that would be load/reload a page
    controlSearch ();
});

// Add event listener for page navigation using event delegation -> 'e' refers to the event
elements.searchResPages.addEventListener('click', e => {
    
    // e.target returns the element that was clicked
    // closest method returns the closest parent element that has the selector string ("string")
    const btn = e.target.closest(".btn-inline");   
    if (btn){
        const goToPage = parseInt (btn.dataset.goto, 10); // 10 to determine the base
        searchView.clearResults();
        searchView.renderResults (state.search.result, goToPage); 
    };
})

/** 
 * RECIPE CONTROLER 
 */

 const controlRecipe = async () => {
    // 1) Get the recipe ID from the window #
    // window.location is the entire url -> followed .hash we get just the hash
    // Then we replace the # symbol in the string with '' (nothing)
    const id = window.location.hash.replace('#','');
    
    if (id){
        // 2) New recipe objetc and added to state
        state.recipe = new Recipe (id);

        // 3) Prepare the UI for the recipe
        try {
            // 4) Search for the recipe
            await state.recipe.getRecipe();
            state.recipe.parseIngredients()
                    
            // 5) Calculate Time and Servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6) Displaying recipe in the UI
            
            console.log(state.recipe);
            console.log(state.recipe.ingredients);
            
        } catch (error) {
            alert (`Error processing recipe: ${error}`)
        }              
    }
 }

 
 

// Event listener that verify is the hash # in the url has changed. 
// Event listerner when the page loads. In case the user saved an bookmark for example
// Creating an array of possible events that will execute the same functions
['hashchange','load']. forEach ( event => window.addEventListener(event, controlRecipe))