import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private _dialog: MatDialog) {}

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
