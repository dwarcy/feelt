import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-listaegressos',
  templateUrl: './listaegressos.component.html',
  styleUrls: ['./listaegressos.component.css'],
  standalone: true,
  imports: [MatTableModule],
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
    this.LIST_SOURCE = await this.firebaseService.percorreCollection();

    console.log('Lista de Egressos', this.LIST_SOURCE);
  }
}
