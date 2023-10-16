const configApi = {
    url: 'https://api.my-movies-explorer.nomoredomains.rocks',
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
};


const configMovieApi = {
    url: 'https://api.nomoreparties.co',
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
};

export {
    configApi, configMovieApi
}