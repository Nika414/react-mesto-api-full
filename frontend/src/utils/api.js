

export class Api {
    constructor(options, jwt) {
        this._baseUrl = options.baseUrl;
        this._headers = {
            "Authorization" : `Bearer ${jwt}`,
            "Content-Type": "application/json"
        };
    }

    _handleResponse(res) {
        if (res.ok) { return res.json(); }
        throw new Error('Произошла ошибка!');
    }

    getCardsInfo() {
        return fetch(`${this._baseUrl}${'cards'}`, {
            headers: this._headers,
        })
            .then((res) => this._handleResponse(res));
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}${'users/me'}`, {
            headers: this._headers,
        })
            .then((res) => this._handleResponse(res));
    }

    changeInfo(data) {
        return fetch(`${this._baseUrl}${'users/me'}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._handleResponse(res));

    }
    createCard(data) {
        return fetch(`${this._baseUrl}${'cards'}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._handleResponse(res));
    }

    deleteCardById(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => this._handleResponse(res));
    }


    putLike(id) {
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((res) => this._handleResponse(res));
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => this._handleResponse(res));
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}${'users/me/avatar'}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._handleResponse(res));
    }

    getAvatar() {
        return fetch(`${this._baseUrl}${'users/me/avatar'}`, {
            headers: this._headers
        })
            .then((res) => this._handleResponse(res));
    }
}




export default Api;