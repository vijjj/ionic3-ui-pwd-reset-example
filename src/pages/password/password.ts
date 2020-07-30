import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  pwdDetails: { password: string, confirmPassword: string} = {
    password: '',
    confirmPassword:''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {
		this.signupErrorString = 'Inalid user details!';
    /*public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })*/
  }

  doSetPassword() {
    // Attempt to login in through our User service

    if(this.pwdDetails.confirmPassword !== this.pwdDetails.password){

      let toast = this.toastCtrl.create({
        message: 'Password and confirm password does not match',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;

    }

    this.user.setPassword(this.pwdDetails).subscribe((resp) => {
      let toast = this.toastCtrl.create({
        message: 'New password is successfully set',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(HomePage);
    }, (err) => {

      this.navCtrl.push(HomePage);

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
