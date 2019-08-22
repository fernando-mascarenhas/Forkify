import axios from 'axios';
import {key, proxy} from '../config'


const testRecipe = {
    f2f_url: "http://food2fork.com/view/47746",
    image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
    ingredients: ["4-1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled", "1 3/4 (.44 ounce) teaspoons salt", "1 (.11 ounce) instant yeast", "1/4 cup (2 ounces) olive oil (optional)", "2 cups (14 ounces) water, ice cold (40F)" ,  "Semolina flour OR cornmeal for dusting"],
    publisher: "101 Cookbooks",
    publisher_url: "http://www.101cookbooks.com",
    recipe_id: "47746",
    social_rank: 100,
    source_url: "http://www.101cookbooks.com/archives/001199.html",
    title: "Best Pizza Dough Ever"
};

export default class Recipe {
    constructor (id){
        this.id = id;
    }

    async getRecipe () {
        
        try{
            // real search            
            const res = await axios (`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.autor = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            
            //test search
            // this.title = testRecipe.title;
            // this.autor = testRecipe.publisher;
            // this.img = testRecipe.image_url;
            // this.url = testRecipe.source_url;
            // this.ingredients = testRecipe.ingredients;            

        } catch(error) {
            alert(`Error getting recipe from server: ${error}`);
        }
        
    }

    calcTime () {
        // For the time we estimate that for each 3 ingredients we have a 15 minute time of preparation
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg / 3);
        this.time = periods * 15;
    }

    calcServings () {
        this.servings = 4;
    }

    // function to padronize the ingredients
    parseIngredients (){
        const unitsLong = ['tablespoons', 'tablespoon', 'tbsps', 'ounces', 'ounce', 'ozs','teaspoons', 'teaspoon', 'tsps', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'tbsp', 'oz', 'oz', 'oz', 'tsp', 'tsp', 'tsp', 'cup', 'pound']
        // Adding the possibilite of SI units. The destructuring will pass the elements from the array unitsShort as individual elements and we will add the SI elements
        const units = [...unitsShort, 'kg', 'g', 'l', 'ml']


        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i)=>{
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');           

            // 3) Parse ingredients into [count, unit and ingredient]
            const arrIng = ingredient.split(' ');
            // This will loop trought the arrIng (.findIndex) and will text if the current element (el2) is present in the units array (.includes)
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2))
                       

            let objIngredient;

            if (unitIndex > -1){
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1 ) {
                    count = arrIng [0];
                    count = count.replace('-','+') // Fix cases like this: 1-1/2 ---> 1+1/2
                    count = eval (count); // Calculate the strin considering it aa mathematical equation an returns a number

                    // this can be done in a single line count = eval(arrIng[0].replace('-','+'))
                }else {
                    count = eval (arrIng.slice(0, unitIndex).join('+'));                    
                };


                objIngredient = {
                    count, //this get the count and assign it to a key of same name ES6
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }  
                
                // array.slice (s , e)
                // s -> start element
                // e -> end element (not included)
                // array.slice (s) -> from that element to the end


            } else if (parseInt(arrIng[0], 10)){
                // There is no unit but the first element is a number
                objIngredient = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }                
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient //this get the ingredient and assign it to a key of same name ES6
                }
            }            
            return objIngredient;
        });
        this.ingredients = newIngredients;
    }

}
