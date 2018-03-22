import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PreferencesDAL } from '../../app/DAL/PreferencesDAL';
import { SqliteDAL } from '../../app/DAL/SqliteDAL';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public which_month : string = "current-month";
  public  currentMonthDebt : number;
  public  currentMonthSaves : number;
  public  CurrentCurrencySymbole: string = "$";


  onPageWillEnter()
  {

  
    this.storage.GetCurrentMonthExpenses().then((val) => {
      val.forEach((element, index) => {
          // if(element.MonthId == (new Date()).getMonth())
          // {
          //   this.currentMonthDebt =  element.debt;
          //   this.currentMonthSaves =  element.saves;
          // }

                     this.currentMonthDebt = 25;
            this.currentMonthSaves =  27;
      });
  });

    this.preferencesDAL.GetCurrencySymbole().then(r => this.CurrentCurrencySymbole = r);

    console.log("tttttttttttt");

  }
  constructor(public navCtrl: NavController, public preferencesDAL: PreferencesDAL, public storage: SqliteDAL) {
    preferencesDAL.GetCurrentMonthDebt().then(r => this.currentMonthDebt = r);
    preferencesDAL.GetCurrentMonthSaves().then(r => this.currentMonthSaves = r);
    preferencesDAL.GetCurrencySymbole().then(r => this.CurrentCurrencySymbole = r);
  }

}
