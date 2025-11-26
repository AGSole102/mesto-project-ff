import '../pages/index.css';
import { initialCards } from './cards';
import { createCardElement, handleDeleteCard, handleLikeCard } from '../components/card';
import { handleShowPopup, handleClosePopup, handleClosePopupByOverlay } from '../components/modal';

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardPopupButton = document.querySelector('.popup_type_new-card .popup__close');
const closePlacePopupButton = document.querySelector('.popup_type_image .popup__close');

const placePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const placeImageInPopup = placePopup.querySelector('.popup__image');
const placeCaptionInPopup = placePopup.querySelector('.popup__caption');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');
const editForm = document.forms['edit-profile'];

const placeNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardForm = document.forms['new-place'];

function handleSubmitEditForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    handleClosePopup(editPopup);
};

function handleOnClickCardImage(evt) {
    handleShowPopup(placePopup);
    if (evt.target.classList.contains('card__image')) {
        placeImageInPopup.src = evt.target.src;
        placeImageInPopup.alt = evt.target.alt;
        placeCaptionInPopup.textContent = evt.target.alt;
    };
};

function handleSubmitNewCardForm(evt) {
    evt.preventDefault();
    placesList.prepend(createCardElement({name: placeNameInput.value, link: placeLinkInput.value}, { onDelete: handleDeleteCard, onClick: handleOnClickCardImage, onLike: handleLikeCard}));
    newCardForm.reset();
    handleClosePopup(newCardPopup);
};

export function returnToDefaultValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

initialCards.forEach((data) => {
    placesList.append(createCardElement(data, { onDelete: handleDeleteCard, onClick: handleOnClickCardImage, onLike: handleLikeCard}));
});

editForm.addEventListener('submit', (evt) => handleSubmitEditForm(evt));
newCardForm.addEventListener('submit', (evt) => handleSubmitNewCardForm(evt));

editButton.addEventListener('click', () => { 
    returnToDefaultValues();
    handleShowPopup(editPopup);
});
addCardButton.addEventListener('click', () => handleShowPopup(newCardPopup));

closeEditPopupButton.addEventListener('click', () => {
    handleClosePopup(editPopup);
    returnToDefaultValues();
});
closeNewCardPopupButton.addEventListener('click', () => {
    handleClosePopup(newCardPopup);
    newCardForm.reset();
});
closePlacePopupButton.addEventListener('click', () => {
    handleClosePopup(placePopup);
});

editPopup.addEventListener('click', (evt) => {
    if (evt.target === editPopup) {
        handleClosePopupByOverlay(editPopup);
        returnToDefaultValues();
    }
});
newCardPopup.addEventListener('click', (evt) => {
    if (evt.target === newCardPopup) {
        handleClosePopupByOverlay(newCardPopup);
        newCardForm.reset();
    }
});
placePopup.addEventListener('click', (evt) => {
    if (evt.target === placePopup) {
        handleClosePopupByOverlay(placePopup);
    }
});
