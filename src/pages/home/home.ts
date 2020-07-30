import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResetPage } from '../reset/reset';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onReset() {
    this.navCtrl.push(ResetPage);
  }

}
