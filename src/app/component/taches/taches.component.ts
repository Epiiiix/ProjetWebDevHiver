import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  filter: string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
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
  }



  ajouter(statut: string) {
    switch (statut) {
      case 'Undefined':
        this.tacheService.ajoutTaches(this.newTacheUndefined).subscribe({
          next: (data) => {
            this.Undefined.push(data);
          }
        });
        break;
      case 'En Attente':
        this.tacheService.ajoutTaches(this.newTacheEnAttente).subscribe({
          next: (data) => {
            this.EnAttente.push(data);
          }
        });
        break;
      case 'En Cours':
        this.tacheService.ajoutTaches(this.newTacheEnCours).subscribe({
          next: (data) => {
            this.EnCours.push(data);
          }
        });
        break;
      case 'Termine':
        this.tacheService.ajoutTaches(this.newTacheTermine).subscribe({
          next: (data) => {
            this.Termine.push(data);
          }
        });
        break;
    }
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