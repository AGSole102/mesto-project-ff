const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/higher-front-back-dev',
    headers: {
        authorization: '09c8855e-21c8-4804-bebe-281ce3fe62b4',
        'Content-Type': 'application/json'
    }
};

export function getPersonalInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке загрузки данных: ${res.status}`);
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.error(err))
};

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке загрузки данных: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.error(err))
};

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке поставить лайк: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.error(err))
};

export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке снять лайк: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.error(err))
};

export function editAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке редактирования аватара: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch(err => console.error(err))
};

export function editInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке редактирования профиля: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch(err => console.error(err))
}

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке добавления карточки: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch(err => console.error(err))
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при попытке удаления карточки: ${res.status}`)
    })
    .then((res) => {
        return res;
    })
    .catch(err => console.error(err))
}
