import { sendReservation } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="parentName">Who is hiring this clown?</label>
        <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Who is this clown for?</label>
        <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="attendees">How many kids going to be around this clown?</label>
        <input type="number" name="attendees" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyAddress">Where is this clown going?</label>
        <input type="text" name="partyAddress" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyDate">When is this clown going to be there?</label>
        <input type="date" name="partyDate" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyDuration">How many hours is this clown going to be there?</label>
        <input type="number" name="partyDuration" class="input" />
    </div>

    <button class="button" id="submitReservation">Submit Reservation</button>
    `
    return html
}

const mainContainer = document.querySelector(".container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userAttendees = document.querySelector("input[name='attendees']").value
        const userPartyAddress = document.querySelector("input[name='partyAddress']").value
        const userPartyDate = document.querySelector("input[name='partyDate']").value
        const userPartyDuration = document.querySelector("input[name='partyDuration']").value
        
        const userDataToAPI = {
            parentName: userParentName,
            childName: userChildName,
            attendees: userAttendees,
            address: userPartyAddress,
            date: userPartyDate,
            duration: userPartyDuration
        }
        
        sendReservation(userDataToAPI)
    }
})