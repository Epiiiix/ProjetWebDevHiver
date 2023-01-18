import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { ListesService } from 'src/app/service/listes.service';
import { UserService } from 'src/app/service/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Liste } from 'src/app/model/liste';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  Undefined: Array<Tache> = [];
  EnAttente: Array<Tache> = [];
  EnCours: Array<Tache> = [];
  Termine: Array<Tache> = [];
  newTacheUndefined: Tache = {
    titre: '',
    termine: false,
    statut: 'Undefined'
  };

  newTacheEnAttente: Tache = {
    titre: '',
    termine: false,
    statut: 'En Attente'
  };

  newTacheEnCours: Tache = {
    titre: '',
    termine: false,
    statut: 'En Cours'
  };

  newTacheTermine: Tache = {
    titre: '',
    termine: false,
    statut: 'Termine'
  };

  listes: Array<Liste> = [];
  newListe : Liste = {
    titre:'',
    username: ''
  };

  taches : Array<Tache> = [];
  newTache: Tache = {
    titre: '',
    termine: false,
    statut: ''
  }

  filter: string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
    private listeService: ListesService,
    private router: Router) { }

  ngOnInit(): void {
    this.tacheService.getTaches().subscribe({
      next: (data: Array<Tache>) => {
        this.Undefined = data.filter(t => t.statut === 'Undefined');
        this.EnAttente = data.filter(t => t.statut === 'En Attente');
        this.EnCours = data.filter(t => t.statut === 'En Cours');
        this.Termine = data.filter(t => t.statut === 'Termine');
      }
    });
    this.listeService.getListes().subscribe({
      next: (data : Array<Liste>) => {
        this.listes = data;
      }
    });
  }
  ajouterListe() {
    this.listeService.ajoutListes(this.newListe).subscribe({
      next: (data) => {
      }
    })
  }
  // ajouterTache() {
  //   this.tacheService.ajoutTaches(this.newTache).subscribe({
  //     next: (data) => {
  //       this.newListe.push(data);
  //     }
  //   });
  // }
  supprimerListe(liste : Liste) {
      this.listeService.removeListes(liste).subscribe({
        next : (data) => {
        }
      });
  }
  supprimer(tache: Tache): void {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        switch (tache.statut) {
          case 'Undefined':
            this.Undefined = this.Undefined.filter(t => tache._id !== t._id);
            break;
          case 'En Attente':
            this.EnAttente = this.EnAttente.filter(t => tache._id !== t._id);
            break;
          case 'En Cours':
            this.EnCours = this.EnCours.filter(t => tache._id !== t._id);
            break;
          case 'Termine':
            this.Termine = this.Termine.filter(t => tache._id !== t._id);
            break;
        }
      }
    });
  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const tache = event.container.data[event.currentIndex];
      tache.statut = event.container.id;
      this.tacheService.updateTaches(tache).subscribe();
    }
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  change(filter: string) {
    this.filter = filter;
  }
}