import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent {
  LIST_SOURCE: any;
  private listaPesquisadores: Array<string> = [];

  constructor(private firebaseService: FirebaseService) {}

  public async ngOnInit() {
    this.LIST_SOURCE =
      await this.firebaseService.percorreCollectionPesquisadores(
        'Pesquisadores'
      );

    console.log('Lista de Pesquisadores:', this.LIST_SOURCE);
    this.LIST_SOURCE.forEach((element: { nomePesquisador: string }) => {
      console.log('nome:' + element.nomePesquisador);
    });
  }
}
