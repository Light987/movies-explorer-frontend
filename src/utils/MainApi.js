import {configApi} from './Constants';

class MainApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Что-то пошло не так: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
            .then(this._checkResponse)
    }

    patchUserInfo({name, email}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(this._checkResponse)
    }

    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
            .then(this._checkResponse)
    }

    postMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                country: `${movie.country}`,
                director: `${movie.director}`,
                duration: `${movie.duration}`,
                year: `${movie.year}`,
                description: `${movie.description}`,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: `${movie.trailerLink}`,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: `${movie.id}`,
                nameRU: `${movie.nameRU}`,
                nameEN: `${movie.nameEN}`
            }),
        })
            .then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
            .then(this._checkResponse)
    }

    putLike(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? "PUT" : "DELETE"}`,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
            .then(this._checkResponse)
    }

}


const mainApi = new MainApi(configApi);

export default mainApi