export default class Likes {
    constructor () {
        this.likes = [];
    }

    addLike (id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push (like);
        // Persist data in localStorage
        this.persistData();
        return like;        
    };

    deleteLike (id){
        this.likes.splice(this.likes.findIndex (el => el.id === id),1);
        // Persist data in localStorage
        this.persistData();       

    };

    isLiked (id) {
        // If there isn't any liked with the id, the findIndex method will return -1
        return this.likes.findIndex (el => el.id === id) != -1;
    }

    getNumLikes () {
        return this.likes.length;
    }

    persistData (){
        localStorage.setItem ('likes', JSON.stringify(this.likes));
    }

    readStorage (){
        // Reverse the stringy to the original data style. If empty it will return null.
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes from the localStorage
        if (storage) this.likes = storage;       
        

    }

}