import { Component } from '@angular/core';
import { NavController, Tabs,AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件;



@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    regthis = this;
    uphone:string;
    uname:string;
    upass:string;
    urepassword:string;

    constructor(public navCtrl: NavController, private http: Http,private alertCtrl:AlertController,public loadingCtrl: LoadingController,public events:Events) {

    }


    //返回登录
    returnLogin(){
        this.navCtrl.popTo(LoginPage);
    }

    //用于取得json数据的处理
    // this.http.get(url).subscribe(function(res){
    //   //console.log(JSON.parse(res["_body"])[0]['id']);
    //   this.userphones=JSON.parse(res["_body"])[0]['userphone'];
    //   this.userages=JSON.parse(res["_body"])[0]['userage'];
    //   this.userdrivers=JSON.parse(res["_body"])[0]['driverage'];
    //   this.userstatuss=JSON.parse(res["_body"])[0]['userstatus'];
    //   this.userothers=JSON.parse(res["_body"])[0]['userother'];
    // },function(error){
    //   console.log("返回数据失败");
    // })

  regUser(){//注册操作函数
    var regsuc = this.regthis;
    var url = window.localStorage.apipath+'/index.php/Home/index/register?userphone='+this.uphone+'&username='+this.uname+'&unpass='+this.upass+'&userpassword='+this.urepassword;
    this.http.get(url).subscribe(function(redata){
      //console.log(url);
        if (redata['_body']=='"true"') {
          //现在开始跳转到指定页面
          regsuc.mgsalert("账号注册成功！现在跳转到登录页面,请使用您刚才注册的账号进行登录.");
          regsuc.navCtrl.popTo(LoginPage);
          console.log(redata['_body']=="ispassed"+"4654654654654654");
        }else{
          if(redata['_body']=='"ispassed"')
          {
            regsuc.mgsalert("两次输入密码不一致！请核对之后再操作");
          }else
          {
            if(redata['_body']=='"falsee"')
            {
              regsuc.mgsalert("注册失败，该手机号已经被注册！如果已经使用该手机号注册，请直接使用该手机号登录！");
            }else{
              regsuc.mgsalert("注册失败,您提交的数据不完整，您可能提交了空数据！不允许操作！");
              console.log(redata['_body']);
            }

          }
        }
    },function(err){
      console.log(err);
      return;
    })
  }



    mgsalert(_str)//消息提示
    {
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
