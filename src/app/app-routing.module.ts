import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { EgressosComponent } from './egressos/egressos.component';
import { HistoricComponent } from './egressos/historic/historic.component';
import { OpotunidadesComponent } from './egressos/opotunidades/opotunidades.component';
import { CadastroComponent } from './egressos/cadastro/cadastro.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'egressos',
    component: EgressosComponent,
    children: [{ path: 'historic', component: HistoricComponent },
      { path: 'opportunity', component:  OpotunidadesComponent},
      { path: 'follow-up', component: CadastroComponent },
      { path: 'graduates', component: EgressosComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
