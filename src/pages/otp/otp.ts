import { Component } from '@angular/core';
import { NavController, NavParams , ToastController} from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { PasswordPage } from '../password/password';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  otp:string;

  optExpiry = 31;// 30 sectonds OTP expiry

  currentOTPCountDown:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  doVerify() {

    if(this.otp.length < 6) {
      let toast = this.toastCtrl.create({
        message: 'Invalid OTP. Hint: min 6 digits',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      this.navCtrl.push(PasswordPage);
    }

  }

  onResend() {
    let toast = this.toastCtrl.create({
      message: 'New OTP is sent to your mobile number. Please re-enter the OTP',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  startOTPCountDown() {
    timer(0, 1000)
     .take(this.optExpiry)
     .subscribe(i => {
        //console.log(i);
        this.currentOTPCountDown = this.optExpiry - i;

        },
        undefined, //no error expected
        ()=>{ // once count down completed reset the count down value
            this.currentOTPCountDown = this.optExpiry;
        }
    );
}

}
