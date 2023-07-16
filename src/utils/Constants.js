const configApi = {
    url: 'https://api.my-movies-explorer.nomoredomains.rocks',
    headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
};

export {
    configApi
}