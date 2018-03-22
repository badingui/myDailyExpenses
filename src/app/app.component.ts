import { Component, platformCore } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {PreferencesDAL} from './DAL/PreferencesDAL';

import { TabsPage } from '../pages/tabs/tabs';
import { CommonData } from './CommonData';
import { SqliteDAL } from './DAL/SqliteDAL';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, localNotifications: LocalNotifications) {
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // var dateSchule = preferencesDAL.getTime().then(r => 
      // {
      //           // Schedule delayed notification
      //           localNotifications.schedule({
      //             text: 'Delayed ILocalNotification',
      //             at: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDay(),r.getHours(),r.getMinutes(),r.getSeconds()),
      //             every: 'day',
      //             led: 'FF0000',
      //             sound: null
      //           });
      // })

    });
  }
}
