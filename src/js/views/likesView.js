import {elements} from './base';
import {limitRecipeTittle} from './searchView';



export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart': 'icon-heart-outlined';    
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);  
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikedItem = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTittle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `

    elements.likesList.insertAdjacentHTML('beforeend',markup);

};

export const deleteLikedItem = id => {
    const item = document.querySelector(`.likes__link[href="#${id}"]`)
    item.parentElement.removeChild(item);
};