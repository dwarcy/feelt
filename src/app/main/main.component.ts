import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../egressos/login/login.component';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { VideplayerComponent } from './videplayer/videplayer.component';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public marignRghtValue: string;
  public maxWidth: number;
  public animation: boolean;
  public isOpen: boolean;
  public isLoggedIn: boolean = false;
  public USER_DOC: any;
  private infoUpdated: boolean = false;
  public userNome: string | undefined;

  @Output() isLogout = new EventEmitter<void>();

  constructor(
    private _dialog: MatDialog,
    private route: Router,
    public loginService: LoginService,
    private translate: TranslateService,
    private firebaseService: FirebaseService
  ) {
    this.maxWidth = 0;
    this.marignRghtValue = '-100vw';
    this.animation = false;
    this.isOpen = false;
    console.log('Animation: ' + this.animation);
    firebaseService.infoChanged.subscribe(() => {
      this.infoUpdated = true;
      this.retrieveInfo();
    });
    this.USER_DOC = {};
    this.retrieveInfo();
  }

  ngOnInit(): void {
    if (localStorage.getItem('id') != null) {
      this.isLoggedIn = true;
    }
  }

  // Limpar localStorage ao fechar a aba ou sair do site completamente
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    localStorage.clear();
  }

  // Troca o JSON que contêm o conteúdo no idioma desejado pelo usuário
  public mudaIdioma(lang: string) {
    this.translate.use(lang);
  }

  // CONFIGURAÇÕES DA NAVBAR PARA MOBILE
  showSideBar(show: boolean) {
    this.animation = show;
    this.maxWidth = show ? 789 : 0;
    this.marignRghtValue = show ? '0' : '50vw';
    this.isOpen = show;
    console.log('Animation dentro da showSideBar: ' + this.animation);
  }

  styleDefault() {
    return { 'margin-right': this.maxWidth == 789 ? this.marignRghtValue : '' };
  }

  public checaLogin(rota: string) {
    if (localStorage.getItem('id') == null) {
      this.openDialog(rota);
    } else {
      this.route.navigate([rota]);
    }
  }
  // -----------------------------------------

  // Usuário pode logar ou deslogar no topo da página
  public loginLogout(opc: string) {
    if (opc == 'login') {
      this.openDialog('');
    } else {
      if (localStorage.getItem('id') != null) {
        this.isLoggedIn = false;
        localStorage.clear();
        console.log('Logout bem sucedido');
      }
    }
  }

  // Abre a caixa de login
  public openDialog(rota: string) {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = 'auto';
    config.height = 'auto';
    config.autoFocus = true;
    config.position = {};

    let component = this._dialog.open(LoginComponent, config);
    component.componentInstance.rota = rota;
    component.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.retrieveInfo();
        this.isLoggedIn = true;
        this.route.navigate([result]);
      }
    });
  }

  // Abre a caxa contendo o vídeo do youtube
  public openVideoDialog() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = 'auto';
    config.height = 'auto';
    config.autoFocus = true;
    config.position = {};

    let component = this._dialog.open(VideplayerComponent, config);
  }

  // Busca no BD o Doc referente ao usuário
  async retrieveInfo() {
    try {
      const USER_DOC = await this.firebaseService.buscaDoc();
      // console.log('Documento recuperado: ' + USER_DOC);
      this.USER_DOC = USER_DOC.data();
      console.log('Documento recuperado: ' + this.USER_DOC.nomeCompleto);
      this.userNome = this.USER_DOC.nomeCompleto;
    } catch (error) {}
  }

  // Navega entre as urls
  public mudaRota(rota: string) {
    this.route.navigate([rota]);
  }
}
