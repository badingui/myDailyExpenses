import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public which_month : string = "current-month";

  constructor(public navCtrl: NavController) {
    
  }

}
