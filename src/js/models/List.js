import axios from 'axios'; // importing package installed trought npm. In this case we don't need to specify the entire for the path like when import modules from our code (like Search.js and searchView.js)

import uniqid from 'uniqid';

export default class List {
    constructor (){
        this.items = [];
    }
    
    addItem (count, unit, ingredient){
        // Creating a object Item -- since the key will have the same name as the variable that is being passe, no need to set the key => count: count,
        const item = {
            id: uniqid(), 
            count,
            unit,
            ingredient,                      
        }

        this.items.push (item);
    }

    deleteItem (id){
        // array.splice (startIndex, nº entries to delete) => return the removed and mutate the original array.
        // array.slice (startIndex, endIndex 'not included' ) => return entries and don't mutate the original array.
        // findIndex return the indexes of the elements that validade the callback function
        this.items.splice(this.items.findIndex (el => el.id === id),1)
    }

    updateCount (id, newCount) {
        // find return the items (not just the index) that validate the callback function
        this.items.find (el => el.id === id).count = newCount;
    }
    
}
