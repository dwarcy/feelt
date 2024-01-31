import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-listaegressos',
  templateUrl: './listaegressos.component.html',
  styleUrls: ['./listaegressos.component.css'],
  // standalone: true,
})
export class ListaegressosComponent {
  // Mostrar em uma tabela os egressos que estão salvos no BD

  // Vai receber a lista dos egressos
  LIST_SOURCE: any;
  displayedColumns: string[] = [
    'ano-egresso',
    'nome',
    'titulacao',
    'empresa',
    'orientador',
    'link',
  ];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    console.log(this.displayedColumns);
    this.LIST_SOURCE = await this.firebaseService.percorreCollectionEgressos('ListaEgressos');

    console.log('Lista de Egressos', this.LIST_SOURCE);
  }

  filtroPesquisa(event: string) {
    console.log('Pesquisa triggada');
    const filterValue = event;
    this.LIST_SOURCE.filter = filterValue.trim().toLowerCase();
  }
}
