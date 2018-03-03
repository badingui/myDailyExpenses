import { Component } from '@angular/core';

import { StatsPage } from '../stats/stats';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = StatsPage;

  constructor() {

  }
}
