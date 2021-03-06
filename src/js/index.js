// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes'
import * as searchView from './views/searchView'; // will return a object named searchView with all functions
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {
    
};

// Upon starting te code create the like key pair to check the memory for likes
state.likes = new Likes ();
state.likes.readStorage();
likesView.toggleLikeMenu (state.likes.getNumLikes());
// state.likes.like.forEach (el => likesView.renderLikedItem (el));
state.likes.likes.forEach (el => likesView.renderLikedItem(el));


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
            console.log(error);
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
        // 2) Prepare the UI for the recipe
        recipeView.clearRecipe ();
        renderLoader(elements.recipe);

        // 3) Highligh the selected recipe
        if (state.search) searchView.highlightSelected (id);

        // 4) New recipe objetc and added to state
        state.recipe = new Recipe (id);


        try {
            // 4) Search for the recipe
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
                    
            // 5) Calculate Time and Servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6) Displaying recipe in the UI
            clearLoader();
            recipeView.renderRecipe (state.recipe);

            // 7) If there is a liked list            
            if (state.likes) likesView.toggleLikeBtn (state.likes.isLiked(id));
                        
            
        } catch (error) {
            alert (`Error processing recipe: ${error}`)
        }              
    }
 }

 
 

// Event listener that verify is the hash # in the url has changed. 
// Event listerner when the page loads. In case the user saved an bookmark for example
// Creating an array of possible events that will execute the same functions
['hashchange','load'].forEach ( event => window.addEventListener(event, controlRecipe))



/** 
 * SHOPPING LIST CONTROLER 
 */    


const controlList = () => {

    // Create a new list
    if (!state.list) state.list = new List ();

    // Add each ingredients to the list and UI
    state.recipe.ingredients.forEach (el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem (item);
    });
    
}


/** 
 * Likes CONTROLER 
 */  

const controlLikes = () => {

    // 1 - Create a new Likes array if there is none
    // if (!state.likes) state.likes = new Likes ();
    // No need for this once we stated that this key pair will always be created on load.

    // 2) Get the recipe ID from the window #
        // window.location is the entire url -> followed .hash we get just the hash
        // Then we replace the # symbol in the string with '' (nothing)
    const currentID = state.recipe.id;    
        

    // 3 - Check if the recipe is liked
    if (state.likes.isLiked(currentID)){
        // 4 - If so unlikes recipe
        state.likes.deleteLike (currentID);

        // 4.1 - Toggle off the like icon
        likesView.toggleLikeBtn(false);

        // 4.2 - Remove recipe from the liked list in the UI
        likesView.deleteLikedItem (currentID);

    } else {
        // 5 - If not, likes recipes
        const newLike = state.likes.addLike (currentID, state.recipe.title, state.recipe.author, state.recipe.img);
        
        // 5.1 - Toggle on the like icon
        likesView.toggleLikeBtn(true);

        // 5.2 - Add recipe to the liked list in the UI   
        likesView.renderLikedItem (newLike);  

    
    }
     
    likesView.toggleLikeMenu (state.likes.getNumLikes());    
}




// Handling delete and quantity change for the item
elements.shoppingList.addEventListener('click', e => {
    // e.target returns the element that was clicked    
    const id = e.target.closest('.shopping__item').dataset.itemid;      
    
    // handle delete event
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state       
        state.list.deleteItem (id);
        // Delele from UI
        listView.deleteItem (id);
    //handle update value
    } else if (e.target.matches('.shopping__count-value'))  {               
        const updatedCount = parseFloat(e.target.value);       
        state.list.updateCount (id, updatedCount);        
    }   
});

// Handling recipe button click to update servings, add to shopping list and liking
// Add event listener for page navigation using event delegation -> 'e' refers to the event
elements.recipe.addEventListener('click', e => {
    
    // e.target returns the element that was clicked    
    if (e.target.matches('.btn-dec, .btn-dec *') && state.recipe.servings > 1){
        state.recipe.updateServings ('dec');
        recipeView.updateServingsIngredients (state.recipe);
    } else if (e.target.matches('.btn-inc, .btn-inc *')){
        state.recipe.updateServings ('inc');
        recipeView.updateServingsIngredients (state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();        
    } else if (e.target.matches(".recipe__love, .recipe__love *")) {             
        controlLikes();
    }               
    
})




