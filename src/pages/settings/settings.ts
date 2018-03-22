import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PreferencesDAL} from '../../app/DAL/PreferencesDAL';
import { Constants } from '../../app/Contants';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BasePage } from '../BasePage/BasePage';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage extends BasePage {

  currency: string;
  dailyBudget: number;
  myTime: string;
   constructor(public navCtrl: NavController, public preferencesDAL: PreferencesDAL, public localNotifications: LocalNotifications)
   {
      super();

      this.LoadCommonData();

      preferencesDAL.getTime().then(r => { var date = new Date(r); this.myTime = date.toISOString()});
  }

  save()
  {
      this.preferencesDAL.SetCurrencyName(this.currency);
      this.preferencesDAL.SetCurrencySymbole(Constants.GetSymboleByName(this.currency));
      this.preferencesDAL.SetDailyBudget(this.dailyBudget);
      this.preferencesDAL.setTime(this.myTime);
  }


  private LoadCommonData()
  {
      console.log("[MyLogger]: LOAD Common Data");

      this.preferencesDAL.GetCurrencySymbole().then(r => this.currentCurrencySymbole = r);
      this.preferencesDAL.GetDailyBudget().then(r => this.dailyBudget = r);
      this.preferencesDAL.GetCurrencyName().then(r => this.currency = r);
  }

}
