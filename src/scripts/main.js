import { fetchReservations,
         fetchClowns,
         fetchCompletions,} from "./dataAccess.js";
import { ClownReservation } from "./ClownReservation.js";

const mainContainer = document.querySelector(".container")

export const render = () => {
    fetchReservations()
    .then(() => fetchClowns())
    .then(() => fetchCompletions())
    .then(() => {mainContainer.innerHTML = ClownReservation()})

}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render(customEvent)
})