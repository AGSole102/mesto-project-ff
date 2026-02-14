const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/higher-front-back-dev',
    headers: {
        authorization: '09c8855e-21c8-4804-bebe-281ce3fe62b4',
        'Content-Type': 'application/json'
    }
};

function getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getPersonalInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
    .then(getResponseData)
};

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(getResponseData)
};

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then(getResponseData)
};

export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(getResponseData)
};

export function editAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
    .then(getResponseData)
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
    .then(getResponseData)
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
    .then(getResponseData)
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(getResponseData)
}
