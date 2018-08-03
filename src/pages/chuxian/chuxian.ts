import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件



@Component({
    selector: 'page-chuxian',
    templateUrl: 'chuxian.html'
})
export class ChuxianPage {
    listdata:Object;
    resdata:Object;
    carid:string;
    cxtime;
    cxrespons:string;
    cxother:string;
    userid:string = window.localStorage.id;

    constructor(public navCtrl: NavController, private http: Http,private alertCtrl:AlertController,public loadingCtrl: LoadingController,public events:Events) {
        var url = window.localStorage.apipath+"/index.php/Home/index/getallcarid";
        this.http.request(url,'').subscribe((res:Response)=>{
        this.listdata = res.json();
        console.log(res.json);
        })
    }





    //提交数据
    savechuxianinfos()
    {
        var url = window.localStorage.apipath+"/index.php/Home/index/Makeareport?userid=" + this.userid + "&carid="+this.carid+"&cxtime="+this.cxtime+"&cxresponse="+this.cxrespons+"&cxother="+this.cxother;
        console.log(url);
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();
            console.log(this.resdata);
            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.mgsalert(this.resdata['msg']);
                this.cxtime = "";
                this.cxrespons = "";
                this.cxother = "";
            }
        }, function (err) {
            this.mgsalert("网络出错，请稍候再试！" + err);
        })
    }


     /*选择select的value*/
     switchType() {
        console.log(this.carid);
    }



    // 返回
    goback(){
        this.navCtrl.pop();
    }


    mgsalert(_str)
    {
        let alert = this.alertCtrl.create({
            // /title: 'Low battery',
            subTitle: _str,
            buttons: ['确 定']
          });
          alert.present();
    }


    presentLoading() {
        let loader = this.loadingCtrl.create({
          content: "",
          duration: 100
        });
        loader.present();
      }



}
