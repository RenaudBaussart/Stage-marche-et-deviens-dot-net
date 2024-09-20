export interface Reserver {
    idReserver: number,
    idUtilisateur: number,
    idSession: number,
    nbrParticipantsInscrits: number,
    refReservation: string,
    datePaiement: string,
    validationReservation: boolean,
    nbrActuelParticipant: number,
}
