import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ExpenseModel } from '../../app/Model/ExpenseModel';
import { SqliteDAL } from '../../app/DAL/SqliteDAL';
import { CommonData } from '../../app/CommonData';
import { BasePage } from '../BasePage/BasePage';
import { PreferencesDAL } from '../../app/DAL/PreferencesDAL';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage extends BasePage{

  public listeExpenses: ExpenseModel[] = [];
  public currentExpenses = 0;
  public expensesStyle: {};

  constructor(private alertCtrl: AlertController, private storage: SqliteDAL,private preferences: PreferencesDAL) {
      super();

      this.LoadCommonData();

      this.storage.GetExpenses().then(r => 
      {
          if(r)
          {
            this.listeExpenses = r;
            this.listeExpenses.forEach((e) => this.currentExpenses =  Number(this.currentExpenses) + Number(e.ExpenseAmount));
          }

      });

      

  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'spend',
          placeholder: 'I SPENT',
          type: "number"
        },
        {
          name: 'spendIn',
          placeholder: 'IN'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {

            var expense = new ExpenseModel(data.spendIn, data.spend);
            this.listeExpenses.unshift(expense);

            this.storage.SaveExpense(expense);

            this.currentExpenses = 0;
            this.listeExpenses.forEach((e) => this.currentExpenses =  Number(this.currentExpenses) + Number(e.ExpenseAmount));
          }
        }
      ]
    });
    alert.present();
  }

  private LoadCommonData()
  {
    console.log("[MyLogger]: LOAD Common Data");

      this.preferences.GetCurrencySymbole().then(r => this.currentCurrencySymbole = r);
      this.preferences.GetDailyBudget().then(r => this.dailyBudget = r);
  }

}
