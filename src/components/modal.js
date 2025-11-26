export function handleShowPopup(popup) {
    popup.classList.add('popup_is-opened');
    const escapeHandler = (evt) => handleClosePopupByEscapeKey(evt, popup);
    popup._escapeHandler = escapeHandler;
    document.addEventListener('keydown', escapeHandler);
};

export function handleClosePopup(popup) {
    popup.classList.remove('popup_is-opened');
    if (popup._escapeHandler) {
        document.removeEventListener('keydown', popup._escapeHandler);
        popup._escapeHandler = null;
    }
};

export function handleClosePopupByOverlay(popup) {
    handleClosePopup(popup);
};

function handleClosePopupByEscapeKey(evt, popup) {
    if (evt.key === 'Escape') {
        handleClosePopup(popup);
    }
};
