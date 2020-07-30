import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { OtpPage } from '../otp/otp';


@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html'
})
export class ResetPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, empId: string, nin: number } = {
    name: '',
    empId:'',
    nin:0
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {
		this.signupErrorString = 'Inalid login values';
    /*public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })*/
  }

  doReset() {

    if(!this.account.empId.trim().length || !this.account.nin){

      let toast = this.toastCtrl.create({
        message: 'Please enter employee id and National Id',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(OtpPage);

    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
