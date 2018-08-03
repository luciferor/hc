import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
//http用于ajax传输数据
import { Http, Response } from '@angular/http';

@Component({
  selector: 'page-carmanager',
  templateUrl: 'carmanager.html'
})
export class CarmanagerPage {
  //ionic3 关于Segment 切换卡第一个默认,默认显示哪一项
  carstatus:string = "userscar";
  listdata: Object;
  username:string = window.localStorage.username;//取得缓存中的登录信息
  constructor(public navCtrl: NavController, private http: Http,public loadingCtrl: LoadingController) {
    this.presentLoading();
    var url = window.localStorage.apipath+"/index.php/Home/index/getcarinformations/id/1";
    this.http.request(url,'').subscribe((res:Response)=>{
      this.listdata = res.json();
      console.log(res.json);
    })
    this.othercar();
  }



  //所有
  othercar(){
    this.presentLoading();
    var url = window.localStorage.apipath+"/index.php/Home/index/getcarinformations/id/0";//出车中
    this.http.request(url,'').subscribe((res:Response)=>{
      this.listdata = res.json();
      console.log(res.json);
    })
  }





  presentLoading() {//加载动画
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 100
    });
    loader.present();
  }
}


