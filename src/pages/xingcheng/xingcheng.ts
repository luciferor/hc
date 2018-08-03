import { Component } from '@angular/core';
import { NavController, Tabs, AlertController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件

import { Geolocation } from '@ionic-native/geolocation';//地理位置




@Component({
    selector: 'page-xingcheng',
    templateUrl: 'xingcheng.html'
})
export class XingchengPage {
    listdata:Object;
    carid:string;//车牌号
    ststr: string;//初始公里数
    edstr: string;//加油公里数
    testr: string;//最后公里数
    username:string = window.localStorage.id;

    resdata: Object;//存数据使用的变量

    constructor(public navCtrl: NavController, private http: Http, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public events: Events, private geolocation: Geolocation) {
        //加载车辆信息
        var url = window.localStorage.apipath+"/index.php/Home/index/getallcarid";
        this.http.request(url,'').subscribe((res:Response)=>{
        this.listdata = res.json();
        console.log(res.json);
        })
    }







    //保存初始公里数
    saveasinfos() {
        var url = window.localStorage.apipath+"/index.php/Home/index/Reportonthejourney?userid=" + this.username + "&ststr=" + this.ststr + "&carid=" + this.carid;
        console.log(url);
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();
            console.log(this.resdata);
            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.mgsalert(this.resdata['msg']);
                this.ststr = "";//清空初始公里数
                this.carid = "";//清空初车牌号，免得数据遗留，导致的车辆信息错误
            }
        }, function (err) {
            this.mgsalert("网络出错，请稍候再试！" + err);
        })
    }

    //保存加油公里数
    saveoilkilometre()
    {
        var url = window.localStorage.apipath+"/index.php/Home/index/oilReportonthejourney?userid=" + this.username + "&edstr=" + this.edstr + "&carid=" + this.carid;
        console.log(url);
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();
            console.log(this.resdata);
            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.mgsalert(this.resdata['msg']);
                this.edstr = "";//清空初始公里数
                this.carid = "";//清空初车牌号，免得数据遗留，导致的车辆信息错误
            }
        }, function (err) {
            this.mgsalert("网络出错，请稍候再试！" + err);
        })
    }

    //保存下班公里数
    saveoutkilometre(){
        var url = window.localStorage.apipath+"/index.php/Home/index/outoilReportonthejourney?userid=" + this.username + "&testr=" + this.testr + "&carid=" + this.carid;
        console.log(url);
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();
            console.log(this.resdata);
            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.mgsalert(this.resdata['msg']);
                this.edstr = "";//清空初始公里数
                this.carid = "";//清空初车牌号，免得数据遗留，导致的车辆信息错误
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
    goback() {
        this.navCtrl.pop();
    }


    mgsalert(_str) {
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
