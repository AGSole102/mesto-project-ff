export function createCardElement(data, onDelete, onClick, onLike) {
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;

    cardElement.querySelector('.card__title').textContent = data.name;

    deleteButton.addEventListener('click', onDelete);
    cardImage.addEventListener('click', onClick);
    likeButton.addEventListener('click', onLike);
    return cardElement;
};

export function handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
};

export function handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};
