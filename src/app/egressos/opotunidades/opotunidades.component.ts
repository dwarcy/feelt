import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table'; 

export interface posgradEgresso {
  dataCadastro: string;
  oportunidade: string;
  tipo: string;
  breveDescricao: string;
  contatos: string;
}

const EGRESSO_DATA: posgradEgresso[] = [
  { dataCadastro: '03/12/2003', oportunidade: 'Vaga de professor na UFU para área de SEP', tipo: 'Emprego', breveDescricao: 'Preenchimento de uma vaga conforme edital 12/23 que estará aberto até dia', contatos: 'www.ufu.br/node5' },
  { dataCadastro: '03/12/2003', oportunidade: 'Vaga de Professor', tipo: 'Emprego', breveDescricao: 'edital 12/23', contatos: 'www.ufu.br/node5' },
  { dataCadastro: '03/12/2003', oportunidade: 'Vaga de Professor', tipo: 'Emprego', breveDescricao: 'edital 12/23', contatos: 'www.ufu.br/node5' },
  { dataCadastro: '03/12/2003', oportunidade: 'Vaga de Professor', tipo: 'Emprego', breveDescricao: 'edital 12/23', contatos: 'www.ufu.br/node5' },
]

@Component({
  selector: 'app-opotunidades',
  templateUrl: './opotunidades.component.html',
  styleUrls: ['./opotunidades.component.css'],
  standalone:true,
  imports: [MatTableModule]
})
export class OpotunidadesComponent {

  displayedColumns: string[] = [ 'dataCadastro', 'oportunidade', 'tipo', 'breveDescricao', 'contatos' ]
  dataSource = EGRESSO_DATA

}
