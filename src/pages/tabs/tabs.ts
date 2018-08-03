import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { UsercenterPage } from '../usercenter/usercenter';
import { CarmanagerPage } from '../carmanager/carmanager';
import { ActionotherPage } from '../actionother/actionother';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ActionotherPage;
  tab2Root = CarmanagerPage;
  tab3Root = HomePage;
  tab4Root = ContactPage;
  tab5Root = UsercenterPage;

  constructor(private nav: NavController, private events: Events) {

  }

  //------------------------------------------------注销功能而添加
  //-------------------------------------------------------------
  ionViewDidLoad() {
    this.listenEvents();
    // console.log('界面创建');
  }

  ionViewWillUnload() {
    this.events.unsubscribe('toLogin');
    // console.log('界面销毁');
  }

  listenEvents() {
    this.events.subscribe('toLogin', () => {
      this.nav.setRoot(LoginPage);
      // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
      // console.log('返回登录');
    });
  }
  //-------------------------------------------------------------  
  //------------------------------------------------注销功能而添加

}
