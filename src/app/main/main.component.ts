import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../egressos/login/login.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { LoginService } from '../services/auth/login.service';
import { VideplayerComponent } from './videplayer/videplayer.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  constructor(
    private _dialog: MatDialog,
    private route: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {}

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
