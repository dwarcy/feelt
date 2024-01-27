import { Component, HostListener } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { DEFAULT_LANGUAGE } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pos-feelt-05';

  public marignRghtValue: string;
  public maxWidth: number;
  public animation: boolean;
  constructor(private _route: Router, private firestore: Firestore, private router: Router, private translate: TranslateService) {
    this.maxWidth = 0;
    this.marignRghtValue = '-100vw';
    this.animation = false;

    this.translate.setDefaultLang(DEFAULT_LANGUAGE)
    this.translate.use(DEFAULT_LANGUAGE);
  }

  public ngOnInit() { }

  showSideBar(show: boolean) {

    this.animation = show;
    this.maxWidth = show ? 789 : 0;
    this.marignRghtValue = show ? '0' : '50vw';

  }

  styleDefault() {
    return { 'margin-right': this.maxWidth == 789 ? this.marignRghtValue : '' };
  }

  searchPage(rout: string) {
    this._route.navigateByUrl(rout);
  }

}
