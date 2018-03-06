import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PreferencesDAL} from '../../app/DAL/PreferencesDAL';
import { Constants } from '../../app/Contants';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  currency: string;
  dailyBudget: number;
  myTime: string;
   constructor(public navCtrl: NavController, public preferencesDAL: PreferencesDAL)
   {
      preferencesDAL.GetCurrencyName().then(r => this.currency = r);

      preferencesDAL.GetDailyBudget().then(r => this.dailyBudget = r);

      preferencesDAL.getTime().then(r => { this.myTime = r.toISOString()});
  }

  save()
  {
      this.preferencesDAL.SetCurrencyName(this.currency);
      this.preferencesDAL.SetCurrencySymbole(Constants.GetSymboleByName(this.currency));
      this.preferencesDAL.SetDailyBudget(this.dailyBudget);
      this.preferencesDAL.setTime(this.myTime);
  }

}
