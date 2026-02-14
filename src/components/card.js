import { deleteCard, likeCard, unlikeCard } from "./api";

export function createCardElement(data, {onDelete, onClick, onLike} = {}, userInfo = {}) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.id = data._id;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    if (userInfo._id === data.owner._id) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    if (data.likes.some(like => like._id === userInfo._id)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector('.card__title').textContent = data.name;
    cardElement.querySelector('.card__like-count').textContent = data.likes.length;

    deleteButton.addEventListener('click', onDelete);
    cardImage.addEventListener('click', onClick);
    likeButton.addEventListener('click', onLike);
    return cardElement;
};

export function handleDeleteCard(evt) {
    deleteCard(evt.target.closest('.card').id)
    .then(() => {
        evt.target.closest('.card').remove();
    })
    .catch(err => console.error(err))
};

export function handleLikeCard(evt) {
    const cardElement = evt.target.closest('.card');
    let newData;
    if (evt.target.classList.contains('card__like-button_is-active')) {
        newData = unlikeCard(cardElement.id);
    } else {
        newData = likeCard(cardElement.id);
    }
    newData.then((res) => {
        cardElement.querySelector('.card__like-count').textContent = res.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(err));
};
