import { ServiceForm } from "./ServiceForm.js";
import { Reservations } from "./Reservations.js";

export const ClownReservation = () => {
    return `
        <h1>Hire These Clowns!!</h1>
        <article class="main">
        <section class="submissionForm">
        <h2>Who Wants To Hire These Clowns?</h2>
            ${ServiceForm()}
        </section>

        <section class="reservationsList">
            <h2>Well, well, well... Look Who's Got Clowns!</h2>
            ${Reservations()}
        </section>
        </article>
    `
}