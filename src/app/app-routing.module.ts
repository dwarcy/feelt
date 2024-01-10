import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { EgressosComponent } from './egressos/egressos.component';
import { HistoricComponent } from './egressos/historic/historic.component';
import { CadastroComponent } from './egressos/cadastro/cadastro.component';
import { ListaegressosComponent } from './egressos/listaegressos/listaegressos.component';
import { NumerosComponent } from './egressos/numeros/numeros.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'egressos',
    component: EgressosComponent,
    children: [
      { path: 'historic', component: HistoricComponent },
      { path: 'numbers', component: NumerosComponent },
      { path: 'follow-up', component: CadastroComponent },
      { path: 'graduates', component: ListaegressosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
