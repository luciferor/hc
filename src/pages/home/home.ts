import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
//http用于ajax传输数据
import { Http, Response } from '@angular/http';

//管道导入
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listdata: Object;
  userid:string = window.localStorage.id;//取得缓存中的登录信息

  //选项卡默认显示哪一项
  task:string = "newtask";

  constructor(public navCtrl: NavController, private http: Http,public loadingCtrl: LoadingController) {
    this.presentLoading();

    /* var url = "http://192.168.0.181/index.php/Home/index/gettasks?taskstyle=新任务&username="+this.username;
    this.http.request(url, '').subscribe((res: Response) => {
      this.listdata = res.json();
      console.log(res.json);
    })
    console.log(url); */
    this.recivied();
  }

  //新任务
  recivied() {
    this.presentLoading();
    var url = window.localStorage.apipath+"/index.php/Home/index/gettasks?taskstyle=新任务&userid="+this.userid;
    console.log(url);
    this.http.request(url, '').subscribe((res: Response) => {
      this.listdata = res.json();
      console.log(res.json);
    })
  }


  //已经完成的任务
  finishedtaskes() {
    this.presentLoading();
    var url = window.localStorage.apipath+"/index.php/Home/index/gettasks?taskstyle=完成&userid="+this.userid;
    this.http.request(url, '').subscribe((res: Response) => {
      this.listdata = res.json();
      console.log(res.json);
    })
  }


  //接单按钮
  recevesed(_id){
    var url = window.localStorage.apipath+"/index.php/Home/index/actiontasking?id="+_id;
    this.http.get(url).subscribe(function(resdate){
      console.log(resdate['_body']);
    },function(err){
      console.log("提交失败！");
    });
    this.presentLoading();//动画加载
    this.recivied();//刷新信息
  }

  //完成按钮actiontasked
  finisheding(_id){
    var url = window.localStorage.apipath+"/index.php/Home/index/actiontasked?id="+_id;
    this.http.get(url).subscribe(function(resdate){
      console.log(resdate['_body']);
    },function(err){
      console.log("提交失败！");
    });
    this.presentLoading();//动画加载
  }


  //拨打电话
  callphone(_num){
    location.href = "tel:" + _num;
   //获取打电话的时间
   var time=new Date();
   //console.log(time);
   //console.log(_num);
  }


  presentLoading() {//加载动画
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 100
    });
    loader.present();
  }
}


