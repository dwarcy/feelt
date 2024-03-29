import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CadastroComponent } from './egressos/cadastro/cadastro.component';
import { HeaderComponent } from './egressos/header/header.component';
import { HistoricComponent } from './egressos/historic/historic.component';
import { LoginComponent } from './egressos/login/login.component';
import { EgressosComponent } from './egressos/egressos.component';
import { MainComponent } from './main/main.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginService } from './services/auth/login.service';
import { environment } from 'src/environment/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlteraSenhaComponent } from './egressos/cadastro/altera-senha/altera-senha.component';
import { NumerosComponent } from './egressos/numeros/numeros.component';
import { ListaegressosComponent } from './egressos/listaegressos/listaegressos.component';
import { VideplayerComponent } from './main/videplayer/videplayer.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const DEFAULT_LANGUAGE = 'pt'

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HeaderComponent,
    HistoricComponent,
    LoginComponent,
    EgressosComponent,
    MainComponent,
    RodapeComponent,
    AlteraSenhaComponent,
    NumerosComponent,
    VideplayerComponent,
    ListaegressosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyC3G08HEpx84FvYiPCX0mgLO1i1cEDPfyA',
        authDomain: 'pos-gradfeelt.firebaseapp.com',
        databaseURL: 'https://pos-gradfeelt-default-rtdb.firebaseio.com',
        projectId: 'pos-gradfeelt',
        storageBucket: 'pos-gradfeelt.appspot.com',
        messagingSenderId: '845254377531',
        appId: '1:845254377531:web:b957efc001a347f2169c1e',
        measurementId: 'G-393BBGNJ3N',
      })
    ),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    LoginService,
    AngularFireModule,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
