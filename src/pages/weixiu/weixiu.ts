import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件

import { DatePicker,DatePickerOptions } from '@ionic-native/date-picker';


@Component({
    selector: 'page-weixiu',
    templateUrl: 'weixiu.html'
})
export class WeixiuPage {

    resdata:Object;

    listdata:Object;

    username:string = window.localStorage.id;

    carid:string;//车牌号
    wprice;//维修金额
    wpro:string;//维修项目
    wxtime;//维修时间
    wother:string;//备注信息



    constructor(public navCtrl: NavController, private http: Http,private alertCtrl:AlertController,public loadingCtrl: LoadingController,public events:Events,private datePicker: DatePicker) {
        var url = window.localStorage.apipath+"/index.php/Home/index/getallcarid";
        this.http.request(url,'').subscribe((res:Response)=>{
        this.listdata = res.json();
        console.log(res.json);
        })
    }




    //上传数据
    saveweixiuinfos(){
        //console.log(this.carid+"-----------------"+this.wpro+"-----------------"+this.wprice+"-----------------"+this.wxtime+"-----------------"+this.wother+"-----------------"+this.username);
        //return;
        var url = window.localStorage.apipath+"/index.php/Home/index/Reportonmaintenance?userid=" + this.username + "&wpro=" + this.wpro + "&wprice=" + this.wprice+"&wcarid="+this.carid+"&wtime="+this.wxtime+"&wother="+this.wother;
        console.log(url);
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();
            console.log(this.resdata);
            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.mgsalert(this.resdata['msg']);
                this.wprice = "";//清空维修金额
                this.wpro = "";//清空维修项目
                this.wother = "";//清空其他信息
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
