import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件



@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    resdata:Object;//存数据使用的变量
    username:string=window.localStorage.userphoness;
    userpassword:string=window.localStorage.userpassword;

    //用来存储登录成功后用户信息的变量
    id: number;
    cname: string;
    uphones: string;
    upassword:string;
    uages: number;
    udrivers: number;
    uphotos: string;
    ustatus: string;
    uothers: string;
    uretions: string;

    constructor(public navCtrl: NavController, private http: Http,private alertCtrl:AlertController,public loadingCtrl: LoadingController,public events:Events) {
      console.log(window.localStorage.apipath);
      console.log(window.localStorage.token);
      console.log(window.localStorage.appid);
    }


    login() {
        var url = window.localStorage.apipath+"/index.php/Home/index/login/username/" + this.username + "/userpassword/" + this.userpassword;
        this.http.get(url).subscribe(redata => {
            this.resdata = redata.json();

            if (this.resdata['status'] == "false") {
                this.mgsalert(this.resdata['msg']);
            } else {
                this.cname = this.resdata['usercname'];
                this.id = this.resdata['id'];
                this.uphones = this.resdata['userphone'];
                this.uages = this.resdata['userage'];
                this.udrivers = this.resdata['driverage'];
                this.uphotos = this.resdata['userphoto'];
                this.ustatus = this.resdata['userstatus'];
                this.uothers = this.resdata['userother'];
                this.uretions = this.resdata['reputation'];
                //this.mgsalert("登录成功！,欢迎您：" + this.cname + ",感谢您的使用！");
                this.presentLoading();//显示加载动画
                this.goLoginPage();//跳转到主页
                this.savetoSession();//保存数据到缓存
                //this.createUser(this.id, this.cname, this.uphones, this.uages, this.udrivers, this.uphotos, this.ustatus, this.uothers, this.uretions);
                //console.log(this.uphones + this.uages + this.udrivers + this.uphotos + this.ustatus);
            }
        }, function (err) {
            this.mgsalert("网络出错，请稍候再试！"+err);
        })
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

    public goLoginPage(){
        this.navCtrl.setRoot(TabsPage,{
        });
    }

    presentLoading() {
        let loader = this.loadingCtrl.create({
          content: "",
          duration: 100
        });
        loader.present();
      }


    //将信息保存到缓存
    savetoSession(){
        //将登录信息保存到window.localstorage中
      if (!window.localStorage) {
        //alert("浏览器支持localstorage");
      } else {
        var storage = window.localStorage;
        //写入字段
        storage["id"] = this.id;
        storage['userpassword']= this.userpassword;
        storage["username"] = this.cname;
        storage["userphoness"] = this.uphones;
        storage["userages"] = this.uages;
        storage["userdrivers"] = this.udrivers;
        storage["userphotos"] = this.uphotos;
        storage["userstatus"] = this.ustatus;
        storage["userothers"] = this.uothers;
        storage["userretions"] = this.uretions;

        //第一种方法读取
        //this.sessionid = storage.id;//测试过能正常获取到ID
      }
    }

    gotoReg(){
        this.navCtrl.push(RegisterPage);
    }

    //事件函数，用于传输 用户名和ID到左侧伸缩菜单
    /* createUser(_id,_cname,_uphones,_uages,_udrives,_uphotos,_ustatus,_uother,_uretions) {
        //console.log('将用户登录之后的详细信息发送到左侧滑动隐藏菜单!')
        this.events.publish('login:created',_id,_cname,_uphones,_uages,_udrives,_uphotos,_ustatus,_uother,_uretions,Date.now());
    } */
}
