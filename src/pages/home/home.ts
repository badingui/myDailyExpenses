import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ExpenseModel } from '../../app/Model/ExpenseModel';
import { SqliteDAL } from '../../app/DAL/SqliteDAL';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public listeExpenses: ExpenseModel[] = [];
  public currentExpenses = 0;

  constructor(private alertCtrl: AlertController, private storage: SqliteDAL) {
      this.storage.GetExpenses().then(r => 
        {
          console.log("ok: " + r);
          
          if(r)
          {
            console.log("ok: " + r);
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

}
