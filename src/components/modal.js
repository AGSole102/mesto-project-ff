import { returnToDefaultValues } from '../scripts/index';

export function handleShowPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => handleClosePopupByEscapeKey(evt, popup));
};

export function handleClosePopup(popup) {
    popup.classList.remove('popup_is-opened');
    returnToDefaultValues();
    document.removeEventListener('keydown', (evt) => handleClosePopupByEscapeKey(evt, popup));
};

export function handleClosePopupByOverlay(evt, popup) {
    if (evt.target === popup) {
        handleClosePopup(popup);
        returnToDefaultValues();
    }
};

function handleClosePopupByEscapeKey(evt, popup) {
    if (evt.key === 'Escape') {
        handleClosePopup(popup);
        returnToDefaultValues();
    }
};
