import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { Geolocation } from '@ionic-native/geolocation';//地理位置
//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件
import { getCurrentDebugContext } from '@angular/core/src/view/services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  id:any=window.localStorage.id;//取得登录缓存中的id信息
  configdata:Object;
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private geolocation: Geolocation,private http:Http,public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    //设置公用的配置文件并且保存到storagesession，1、apipath,appid,token
    //1,appath后台接口路径
    //2,appid,后台区别的app端独一无二的身份标识
    //3,token,通信授权字符串，用于在传输过程中安全的代码
    window.localStorage['apipath'] = "http://39.109.115.8";//接口地址，整个app后台接口只需要修改这个地方
    window.localStorage['token'] = "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV:fjSkz5yohmoARYHhaDN2tIgajfU=:eyJzY29wZSI6InF0ZXN0YnVja2V0IiwiZGVhZGxpbmUiOjE0NTg2MzEzNTh9";//通信字符串
    window.localStorage['appid'] = "wxd176a6620c5ffb45";//app身份标识


    setInterval(() => {
      this.geolocation.getCurrentPosition().then((data) => {
        console.log(data.coords.latitude);
        console.log(data.coords.longitude);
        console.log(this.id);
        //传输数据到服务器
        var url = window.localStorage.apipath+"/index.php/Home/index/locationpoint/id/" + this.id + "/latitude/" + data.coords.latitude + "/longitude/" + data.coords.longitude;
        //网络请求
        this.http.get(url).subscribe(function (redata) {
          ////console.log(redata);
          //将json字符串转换为对象
          //this.residata = redata.json();
          //console.log(url);
          ////console.log(this.residata);
          ////console.log(this.residata['latitude']);
          ////console.log(this.residata['longitude']);
        }, function (err){
          console.log("ajax失败");
        })
      }).catch((error) => {
        error = error.message;
        console.log(error + "获取gps地理位置失败！");
        //alert(error);

      });
    }, 1000)//一分钟发送一次地址到服务器保存于数据库中

  }
}
