import { Component, Input } from '@angular/core';
import { NavController, Tabs, AlertController, LoadingController, Events, ActionSheetController, Platform, Loading } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { UploadimgPage } from '../uploadimg/uploadimg';

//上传头像
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import { Http,URLSearchParams,Response, Headers, RequestOptions } from '@angular/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { stringify } from '@angular/compiler/src/util';
import { urlToNavGroupStrings } from 'ionic-angular/umd/navigation/url-serializer';

@Component({
  selector: 'page-usercenter',
  templateUrl: 'usercenter.html'
})
export class UsercenterPage {

  imgcode:string;
  path: string = "";//文件路径
  fileTransfer: FileTransferObject = this.transfer.create();//文件上传组件


  userid: any;
  username: string;
  userphone: string;
  userage: string;
  userdriver: string;
  userother: string;


  constructor(
    public navCtrl: NavController,
    public events: Events,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    private imagePicker: ImagePicker,
    private file: File,
    private transfer: FileTransfer,
    private http: Http,
    private defaultOptions: RequestOptions,
    private platform: Platform
  ) {
    //读取缓存里的用户信息
    if (!window.localStorage) {
      //alert("浏览器支持localstorage");
    } else {
      var storage = window.localStorage;
      this.userid = storage.id;
      this.username = storage.username;
      this.userphone = storage.userphoness;
      this.userage = storage.userages;
      this.userdriver = storage.userdrivers;
      this.userother = storage.userothers;
      this.path = window.localStorage.apipath+storage.userphotos;;
    }
  }

  //注销登录
  logoff() {
    //清空缓存信息，方便下次新用户登录时读取到之前的用户数据
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userphoness');
    window.localStorage.removeItem('userages');
    window.localStorage.removeItem('userdrivers');
    window.localStorage.removeItem('userphotos');
    window.localStorage.removeItem('userstatus');
    window.localStorage.removeItem('userothers');
    window.localStorage.removeItem('userretions');

    this.showRadio();//弹出退出提示，确认退出或取消
  }

  //保存信息
  saveUserinfos() {
    this.presentLoading();
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('您确认要注销登录吗？');
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        //跳转到登陆页面
        this.events.publish('toLogin');
      }
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


  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {;
            this.startCamera();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.openImgPicker();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }



  // 启动拍照功能
  private startCamera() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,                                                  //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      sourceType: this.camera.PictureSourceType.CAMERA ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("got file: " + imageData);

      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
      this.imgcode = imageData;
      //If it's file URI
      this.upload();
    }, (err) => {
      // Handle error
    });
  }

  // 打开手机相册
  private openImgPicker() {
    const options: CameraOptions = {
      quality: 80,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,                                                //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,                  //编码类型
      mediaType: this.camera.MediaType.PICTURE,                     //图片类型
      saveToPhotoAlbum: true,                                       //是否保存到相册
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("got file: " + imageData);

      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
      //If it's file URI
      // this.path = imageData;
      //alert(this.path);
      this.imgcode = imageData;

      //alert(this.imgcode);
      //上传
      this.upload();
    }, (err) => {
      // Handle error
    });
  }



  /**
    * 文件上传
    */
   upload() {
    const apiPath = window.localStorage.apipath+"/index.php/Home/index/uploadImgAction?id="+this.userid;//接口地址
    var params:URLSearchParams = new URLSearchParams();
    //params.set('id',this.userid);//用户id
    params.set('base64img',this.imgcode);//图片img
    //params.set('lat','');//纬度
    //params.set('lng','');//经度

    var headers = new Headers({
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Accept':'application/json'
    });
    var options = new RequestOptions({
        headers: headers
    });
    this.http.post(apiPath,params,options).subscribe(res => {
      var resdata:Object = res.json();
      this.mgsalert(resdata['msg']);
      }, error => {
        this.mgsalert("网络错误:"+error);
      }
    );
  }

  editphone() {//修改电话号码
    this.editinfunction("phone", "修改电话号码", "请输入新的电话号码");
  }

  editusername()//修改用户名
  {
    this.editinfunction("username", "修改姓名", "请输入新的姓名");
  }
  editage()//修改年龄
  {
    this.editinfunction("age", "修改年龄", "请输入新的年龄");
  }
  editdriage()//修改驾龄
  {
    this.editinfunction("dage", "修改驾龄", "请输入新的驾龄");
  }
  editpassword()//修改密码
  {
    this.editinfunction("password", "修改密码", "请输入新的密码");
  }
  editother()//修改个性签名
  {
    this.editinfunction("other", "修改个性签名", "请输入个性签名");
  }


  editinfunction(_status, _infos, _others) {
    const prompt = this.alertCtrl.create({
      title: _infos,
      //message: "请输入一个电话号码",
      inputs: [
        {
          name: 'title',
          placeholder: _others
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log("exit do save data.");
          }
        },
        {
          text: '保存',
          handler: data => {
            console.log(data.title);//输入的内容
            var url = window.localStorage.apipath+"/index.php/Home/index/editUserinfosonce?status=" + _status + "&contentcode=" + data.title + "&id=" + this.userid;
            this.http.get(url).subscribe(res => {
              var resdata: Object = res.json();
              console.log(resdata['msg']);
              this.mgsalert(resdata['msg'] + "需要注销后才能看到更新数据！");
            }, (err) => {
              this.mgsalert("网络错误，请稍后再试！" + err);
            })
          }
        }
      ]
    });
    prompt.present();
  }


  mgsalert(_str) {
    let alert = this.alertCtrl.create({
      // /title: 'Low battery',
      subTitle: _str,
      buttons: ['确 定']
    });
    alert.present();
  }

}
