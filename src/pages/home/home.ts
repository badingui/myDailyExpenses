import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ExpenseModel } from '../../app/Model/ExpenseModel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public listeExpenses: ExpenseModel[] = [];

  constructor(private alertCtrl: AlertController) {

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

          }
        }
      ]
    });
    alert.present();
  }

}
