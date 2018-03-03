import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PreferencesDAL} from '../../app/DAL/PreferencesDAL';
import { Constants } from '../../app/Contants';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  currency: string = "dollar";
  dailyBudget: number;

  constructor(public navCtrl: NavController, public preferencesDAL: PreferencesDAL) {
    var preferencesCurrency = preferencesDAL.GetCurrencyName();

    if(preferencesCurrency)
    {
       this.currency = preferencesCurrency;
    }

    var preferencesDailyBuget = preferencesDAL.GetDailyBudget();

    if(preferencesDailyBuget)
    {
       this.dailyBudget = preferencesDailyBuget;
    }
  }


  save()
  {
      console.log(this.currency);
      this.preferencesDAL.SetCurrencyName(this.currency);
      this.preferencesDAL.SetCurrencySymbole(Constants.GetSymboleByName(this.currency));
      this.preferencesDAL.SetDailyBudget(this.dailyBudget);
  }

}
