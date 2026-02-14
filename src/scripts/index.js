import '../pages/index.css';
import { createCardElement, handleDeleteCard, handleLikeCard } from '../components/card';
import { handleShowPopup, handleClosePopup, handleClosePopupByOverlay } from '../components/modal';
import { addCard, editAvatar, editInfo, getCards, getPersonalInfo } from '../components/api';
import { clearValidation, enableValidation } from '../components/validation';

// Объявление переменных

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageEditButton = document.querySelector('.profile__image-edit');

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = document.querySelector('.popup_type_edit .popup__close');
const closeNewCardPopupButton = document.querySelector('.popup_type_new-card .popup__close');
const closePlacePopupButton = document.querySelector('.popup_type_image .popup__close');
const closeAvatarFormButton = document.querySelector('.popup_type_avatar .popup__close');

const placePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const placeImageInPopup = placePopup.querySelector('.popup__image');
const placeCaptionInPopup = placePopup.querySelector('.popup__caption');

const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const editForm = document.forms['edit-profile'];
const saveInfoButton = editPopup.querySelector('.popup__button');

const placeNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const newCardForm = document.forms['new-place'];
const saveNewCardButton = newCardPopup.querySelector('.popup__button');

const avatarLinkInput = avatarPopup.querySelector('.popup__input_type_url');
const avatarForm = document.forms['new-avatar'];
const saveAvatarButton = avatarPopup.querySelector('.popup__button');

let initialCards = [];
let personalInfo = {};
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Функции

function handleSubmitEditForm(evt, name, about) {
    evt.preventDefault();
    saveInfoButton.textContent = 'Сохранение...';
    saveInfoButton.disabled = true;
    editInfo(name, about)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;
        })
        .catch(err => console.error(err))
        .finally(() => {
            saveInfoButton.textContent = 'Сохранить';
            saveInfoButton.disabled = false;
            handleClosePopup(editPopup);
        })
};

function handleOnClickCardImage(evt) {
    handleShowPopup(placePopup);
    if (evt.target.classList.contains('card__image')) {
        placeImageInPopup.src = evt.target.src;
        placeImageInPopup.alt = evt.target.alt;
        placeCaptionInPopup.textContent = evt.target.alt;
    };
};

function handleSubmitNewCardForm(evt, name, link) {
    evt.preventDefault();
    saveNewCardButton.textContent = 'Сохранение...';
    saveNewCardButton.disabled = true;
    addCard(name, link)
        .then((res) => {
            placesList.prepend(createCardElement(res, { onDelete: handleDeleteCard, onClick: handleOnClickCardImage, onLike: handleLikeCard }, personalInfo));
        })
        .catch(err => console.error(err))
        .finally(() => {
            saveNewCardButton.textContent = 'Сохранить';
            saveNewCardButton.disabled = false;
            newCardForm.reset();
            handleClosePopup(newCardPopup);
        })
};

function handleSubmitNewAvatar(evt, link) {
    evt.preventDefault();
    saveAvatarButton.textContent = 'Сохранение...';
    saveAvatarButton.disabled = true;
    editAvatar(link)
        .then(() => {
            profileImage.src = link;
        })
        .catch(err => console.error(err))
        .finally(() => {
            saveAvatarButton.textContent = 'Сохранить';
            saveAvatarButton.disabled = false;
            avatarForm.reset();
            handleClosePopup(avatarPopup);
        })
}

export function returnToDefaultValues() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
};

// Выполнение при заходе на страницу

Promise.all([getPersonalInfo(), getCards()])
    .then((values) => {
        personalInfo = values[0];
        initialCards = values[1];
    })
    .then(() => {
        profileTitle.textContent = personalInfo.name;
        profileDescription.textContent = personalInfo.about;
        profileImage.src = personalInfo.avatar;
        initialCards.forEach((data) => {
            placesList.append(createCardElement(data, { onDelete: handleDeleteCard, onClick: handleOnClickCardImage, onLike: handleLikeCard }, personalInfo));
        });
    })
    .catch(err => console.error(`Ошибка: ${err}`))

enableValidation([editForm, newCardForm, avatarForm], validationConfig);

// Слушатели событий

editForm.addEventListener('submit', (evt) => handleSubmitEditForm(evt, nameInput.value, descriptionInput.value));
newCardForm.addEventListener('submit', (evt) => handleSubmitNewCardForm(evt, placeNameInput.value, placeLinkInput.value));
avatarForm.addEventListener('submit', (evt) => handleSubmitNewAvatar(evt, avatarLinkInput.value));

editButton.addEventListener('click', () => {
    returnToDefaultValues();
    handleShowPopup(editPopup);
});
addCardButton.addEventListener('click', () => handleShowPopup(newCardPopup));
profileImageEditButton.addEventListener('click', () => handleShowPopup(avatarPopup));

closeEditPopupButton.addEventListener('click', () => {
    handleClosePopup(editPopup);
    returnToDefaultValues();
    clearValidation(editForm, validationConfig)
});
closeNewCardPopupButton.addEventListener('click', () => {
    handleClosePopup(newCardPopup);
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig)
});
closePlacePopupButton.addEventListener('click', () => {
    handleClosePopup(placePopup);
});
closeAvatarFormButton.addEventListener('click', () => {
    handleClosePopup(avatarPopup);
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig)
});

editPopup.addEventListener('click', (evt) => {
    if (evt.target === editPopup) {
        handleClosePopupByOverlay(editPopup);
        returnToDefaultValues();
        clearValidation(editForm, validationConfig)
    }
});
newCardPopup.addEventListener('click', (evt) => {
    if (evt.target === newCardPopup) {
        handleClosePopupByOverlay(newCardPopup);
        newCardForm.reset();
        clearValidation(newCardForm, validationConfig)
    }
});
placePopup.addEventListener('click', (evt) => {
    if (evt.target === placePopup) {
        handleClosePopupByOverlay(placePopup);
    }
});
avatarPopup.addEventListener('click', (evt) => {
    if (evt.target === avatarPopup) {
        handleClosePopupByOverlay(avatarPopup);
        avatarForm.reset();
        clearValidation(avatarForm, validationConfig)
    }
})
