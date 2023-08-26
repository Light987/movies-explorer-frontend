import {configMovieApi} from './Constants';


class MovieApi {
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

    getAllMovies() {
        return fetch(`${this._url}/beatfilm-movies`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
            .then(this._checkResponse)
    }


}


const moviesApi = new MovieApi(configMovieApi);

export default moviesApi