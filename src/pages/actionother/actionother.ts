import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController,NavParams } from 'ionic-angular';
//http用于ajax传输数据
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';//地理位置

//加载其他页面
import { WeixiuPage} from '../../pages/weixiu/weixiu';
import { JiayouPage} from '../../pages/jiayou/jiayou';
import { XingchengPage} from '../../pages/xingcheng/xingcheng';
import { ChuxianPage} from '../../pages/chuxian/chuxian';

//管道导入
import { PipesModule } from '../../pipes/pipes.module';


@Component({
  selector: 'page-actionother',
  templateUrl: 'actionother.html'
})
export class ActionotherPage {

  listdata:Object;//数据数组
  userid:any = window.localStorage.id;


  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public geolocation: Geolocation,
    public navParams:NavParams
  ) {
    //加载新任务
    var url = window.localStorage.apipath+"/index.php/Home/index/gettasks?taskstyle=新任务&userid="+this.userid;
    this.http.get(url).subscribe((res)=>{
      this.listdata = res.json();
      console.log(res.json);
    },(err)=>{
      console.log('网络错误：'+err);
    })
  }



  //行程
  xingcheng(){
    this.navCtrl.push(XingchengPage);
  }

  //加油
  jiayou(){
    this.navCtrl.push(JiayouPage);
  }

  //出现
  chuxian(){
    this.navCtrl.push(ChuxianPage);
  }

  //维修
  weixiu(){
    this.navCtrl.push(WeixiuPage);
  }

  //提示窗
  mgsalert(_str) {
    let alert = this.alertCtrl.create({
      // /title: 'Low battery',
      subTitle: _str,
      buttons: ['确 定']
    });
    alert.present();
  }

  presentLoading() {//加载动画
    let loader = this.loadingCtrl.create({
      content: "",
      duration: 100
    });
    loader.present();
  }
}


