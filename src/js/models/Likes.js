export default class Likes {
    constructor () {
        this.likes = [];
    }

    addLike (id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push (like);
        return like;
    };

    deleteLike (id){
        this.likes.splice(this.likes.findIndex (el => el.id === id),1);
    };

    isLiked (id) {
        // If there isn't any liked with the id, the findIndex method will return -1
        return this.likes.findIndex (el => el.id === id) != -1;
    }

    getNumLikes () {
        return this.likes.length;
    }

}