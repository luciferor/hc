import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  listdata:Object;
  apipath:string=window.localStorage.apipath;
  constructor(public navCtrl: NavController,public http:Http,public loadingCtrl:LoadingController) {
    this.presentLoading();
    //加载司机信息
    var url = window.localStorage.apipath+"/index.php/Home/index/getuserphone";
    this.http.request(url,'').subscribe((res:Response)=>{
      this.listdata = res.json();
    })
  }



  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 100
    });
    loader.present();
  }


  //拨打电话
  callphone(_num){
    location.href = "tel:" + _num;
   //获取打电话的时间
   var time=new Date();
  }

}


