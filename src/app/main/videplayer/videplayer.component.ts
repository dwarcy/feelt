import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videplayer',
  templateUrl: './videplayer.component.html',
  styleUrls: ['./videplayer.component.css'],
})
export class VideplayerComponent {
  constructor(private router: Router, public dialogRef: MatDialogRef<VideplayerComponent>) {}

  public closeVideo() {
    this.dialogRef.close()
  }
}
