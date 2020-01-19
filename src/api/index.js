const API = process.env.REACT_APP_API_URL

export const register = (user) => {
    // console.log(user)
    return fetch(`${API}/users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const getUsers = () => {
    return fetch(`${API}/users/all`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const updateUser = (userId, user) => {
    // console.log(user)
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: user
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}