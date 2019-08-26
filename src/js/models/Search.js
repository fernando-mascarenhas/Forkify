import axios from 'axios'; // importing package installed trought npm. In this case we don't need to specify the entire for the path like when import modules from our code (like Search.js and searchView.js)

import {key, proxy} from '../config'

const testArray = [
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "1-Best Pizza "
    },
   {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "35382",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "2-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "54384",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "3-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "35171",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "4-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "5-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "6-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "7-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "8-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "9-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "10-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "11-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "12-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "13-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "14-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "15-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "16-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "17-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "18-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "19-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "20-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "21-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "22-Best Pizza Dough Ever"
    },
    {
        f2f_url: "http://food2fork.com/view/47746",
        image_url: "http://static.food2fork.com/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbooks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "23-Best Pizza Dough Ever"
    }
]   

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults () {
        
        try {
            //real result
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);            
            this.result = res.data.recipes;

            // Makeshift result because of the daily limit
            // this.result = testArray;                  
            
        } catch(error) {
            alert(error);
        }        
    }
    
}




