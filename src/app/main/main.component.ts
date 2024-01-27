import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../egressos/login/login.component';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { VideplayerComponent } from './videplayer/videplayer.component';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  searchPage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  public marignRghtValue: string;
  public maxWidth: number;
  public animation: boolean;
  public isOpen: boolean;

  @Output() isLogout = new EventEmitter<void>();

  constructor(
    private _dialog: MatDialog,
    private route: Router,
    public loginService: LoginService,
    private translate: TranslateService
  ) {
    this.maxWidth = 0;
    this.marignRghtValue = '-100vw';
    this.animation = false;
    this.isOpen = false;
    console.log('Animation: ' + this.animation);
  }

  ngOnInit(): void { }

  // Limpar localStorage ao fechar a aba ou sair do site completamente
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    localStorage.clear();
  }

  public mudaIdioma(lang: string) {
    this.translate.use(lang)
  }

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

  public openDialog(rota: string) {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = 'auto';
    config.height = 'auto';
    config.autoFocus = true;
    config.position = {};
    // config.backdropClass = 'background-color: transparent; opacity: 0.5';

    let component = this._dialog.open(LoginComponent, config);

    component.componentInstance.rota = rota;

    component.afterClosed().subscribe((result) => {
      console.log(result);
      this.route.navigate([result]);
    });
  }

  public openVideoDialog() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = 'auto';
    config.height = 'auto';
    config.autoFocus = true;
    config.position = {};

    config.panelClass = 'teste';

    let component = this._dialog.open(VideplayerComponent, config);
  }

  public mudaRota(rota: string) {
    this.route.navigate([rota]);
  }
}
