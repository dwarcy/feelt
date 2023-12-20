import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CadastroComponent } from './egressos/cadastro/cadastro.component';
import { HeaderComponent } from './egressos/header/header.component';
import { HistoricComponent } from './egressos/historic/historic.component';
import { LoginComponent } from './egressos/login/login.component';
import { OpotunidadesComponent } from './egressos/opotunidades/opotunidades.component';
import { EgressosComponent } from './egressos/egressos.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HeaderComponent,
    HistoricComponent,
    LoginComponent,
    EgressosComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC3G08HEpx84FvYiPCX0mgLO1i1cEDPfyA",
      authDomain: "pos-gradfeelt.firebaseapp.com",    
      databaseURL: "https://pos-gradfeelt-default-rtdb.firebaseio.com",    
      projectId: "pos-gradfeelt",    
      storageBucket: "pos-gradfeelt.appspot.com",    
      messagingSenderId: "845254377531",    
      appId: "1:845254377531:web:b957efc001a347f2169c1e",
      measurementId: "G-393BBGNJ3N"    
    })),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    OpotunidadesComponent,
    MatDialogModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
