import { Component, inject, Input, input } from '@angular/core';
import { ApiFetcherReserverService } from '../../../../../services/api-fetcher-reserver.service';
import { Observable, of } from 'rxjs';
import { Reserver } from '../../../../../intefaces/reserver';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Utilisateur } from '../../../../../intefaces/utilisateur';
import { ApiFetcherUtilisateurService } from '../../../../../services/api-fetcher-utilisateur.service';

@Component({
  selector: 'app-participant-session',
  standalone: true,
  imports: [CommonModule,AsyncPipe],
  templateUrl: './participant-session.component.html',
  styleUrl: './participant-session.component.scss'
})
export class ParticipantSessionComponent {
  @Input() idSession : number = 0;

  listeReservationSession$? : Observable<Reserver[]>

  appeleAPIReserver = inject(ApiFetcherReserverService);
  appeleAPIUtilisateur = inject(ApiFetcherUtilisateurService);

  ngOnInit(){
    this.InitialisationObservable();
  }
  InitialisationObservable(){
    this.listeReservationSession$ = this.appeleAPIReserver.RecupererListeReserverParSession(this.idSession);
  }
  recupUtilisateurParId(id : number) : Observable<any>{
    return this.appeleAPIUtilisateur.RecuperUtilisateurParId(id);
  }

  suprimerReserver(id:number){
    this.appeleAPIReserver.SuppressionReserver(id).subscribe(response => {
      if (response >= 200 && response < 300) {
        alert("La Reservation a bien été supprimer")
      } else { 
        alert('Erreur de suppression :' + response)
      }
    });
  }

  definirDatePaiment(reservation: Reserver){
    let dateEntree = prompt("entrée une date au format année/mois/date/heure au format 24:60","2000/01/01/01:01")
    if(dateEntree == undefined || dateEntree == null){
      alert("ajout de date annuler");
      return;
    } 
    let dateEntreeSplite:string[] = dateEntree!.split('/');
    let dateEnSortie = `${dateEntreeSplite[0]}-${dateEntreeSplite[1]}-${dateEntreeSplite[2]}T${dateEntreeSplite[3]}`
    reservation.datePaiement = dateEnSortie;

    this.appeleAPIReserver.MiseAJourReserver(reservation.idReserver,reservation).subscribe(response => {
      if (response >= 200 && response < 300) {
        alert("La date de paiment est ajouter")
      } else { 
        alert("Erreur d'ajout de date de reservation:" + response)
      }
    });
  }
  validerReservation(reservation: Reserver){
    if(confirm("etes vous sur de valider cette reservation ?")){
      reservation.validationReservation = true;

      this.appeleAPIReserver.MiseAJourReserver(reservation.idReserver,reservation).subscribe(response => {
        if (response >= 200 && response < 300) {
          alert("La Reservation a bien été validé")
        } else { 
          alert('Erreur de validation de reservation :' + response)
        }
      });
    }
      
  }


}
