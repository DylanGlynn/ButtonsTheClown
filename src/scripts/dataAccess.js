const applicationState = {
    reservations: [],
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector(".container")

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then((clownRequests) => {
            applicationState.reservations = clownRequests
        })
}

export const getReservations = () => {
    return applicationState.reservations.map(reservation => ({ ...reservation }))
}

export const sendReservation = (userRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userRequest)
    }

    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const declineReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(() => { mainContainer.dispatchEvent(new CustomEvent("stateChanged")) })
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then((data) => {applicationState.clowns = data})
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({ ...clown }))
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then((data) => {applicationState.completions = data})
}

export const saveCompletion = (completedClownRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(completedClownRequest)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then((data) => {applicationState.completions = data})
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}