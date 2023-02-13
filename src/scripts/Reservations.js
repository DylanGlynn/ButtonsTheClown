import { getReservations, declineReservation, getClowns, saveCompletion, getCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector(".container")

export const Reservations = () => {
    const reservations = getReservations()
    let html = `<ul class="reservations">${reservations.map(convertReservationsToListElement).reverse().join("")}</ul>`
    return html
}

const convertReservationsToListElement = (reservation) => {
    return `<li>${reservation.parentName} is requesting a clown at ${reservation.address} on ${reservation.date}.\n
    This is for ${reservation.childName}'s birthday party. Expect ${reservation.attendees} children.
    ${clownDropDown(reservation)}
    <button class="reservation__delete" id="reservation--${reservation.id}">
    Deny!
    </button></li>`
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [, reservationId] = click.target.id.split("--")
        declineReservation(parseInt(reservationId))
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

const clownDropDown = (reservation) => {
    const completions = getCompletions()
    const clowns = getClowns()
    return `<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(clown => {
        let selected = ``
        for (const completion of completions) {
            if (`${completion.reservationId}--${completion.clownId}` === `${reservation.id}--${clown.id}`) {
                selected = `selected="true"`
            }
        }
        return `<option value="${reservation.id}--${clown.id}" ${selected}>${clown.name}</option>`
    }).join("")
        }</select>`
}

mainContainer.addEventListener("change", (event) => {
    const clowns = getClowns()
    if (event.target.id === "clowns") {
        const [reservationId, clownId] = event.target.value.split("--")
        const completion =
        {
            "reservationId": reservationId,
            "clownId": clownId,
            "timestamp": Date.now()
        }
        saveCompletion(completion)
        for (const clown of clowns) {
            if (clown.id === clownId) {
                event.target.setAttribute("selected", true)
            }
        }
    }
})