import { Component } from '@angular/core';

import { StatsPage } from '../stats/stats';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { PreferencesDAL } from '../../app/DAL/PreferencesDAL';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = StatsPage;

  constructor(public preferencesDAL: PreferencesDAL) {

  }

  public init_stat()
  {
  //   this.preferencesDAL.GetCurrentMonthDebt().then(r => StatsPage.currentMonthDebt = 0);
  //   this.preferencesDAL.GetCurrentMonthSaves().then(r => StatsPage.currentMonthSaves = 0);
  //   this.preferencesDAL.GetCurrencySymbole().then(r => StatsPage.CurrentCurrencySymbole = "$");
  }
}
