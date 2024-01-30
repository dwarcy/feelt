import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/auth/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public marignRghtValue: string;
  public maxWidth: number;
  public animation: boolean;
  public isOpen: any;

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

  public mudaIdioma(lang: string) {
    this.translate.use(lang);
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

  searchPage(rout: string) {
    this.route.navigateByUrl(rout);
  }

  public checaLogin(rota: string) {
    if (localStorage.getItem('id') == null) {
      this.openDialog(rota);
    } else {
      this.route.navigate([rota]);
    }
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

  public mudaRota(rota: string) {
    this.route.navigate([rota]);
  }
}
