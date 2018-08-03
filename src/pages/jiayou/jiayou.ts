import { Component } from '@angular/core';
import { NavController, Tabs, AlertController, LoadingController, Platform, DateTime } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

//http用于ajax传输数据
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';

import { Events } from 'ionic-angular';//系统订阅事件

//上传头像
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';//地理位置，上传加油地点
import { stringify } from '@angular/core/src/render3/util';

@Component({
    selector: 'page-jiayou',
    templateUrl: 'jiayou.html'
})
export class JiayouPage {
    imgpath: string;//base64编码
    path: string="http://img.zcool.cn/community/012caf59ac0f8ea801211d25b26ed1.jpg@1280w_1l_2o_100sh.jpg";//文件路径
    fileTransfer: FileTransferObject = this.transfer.create();//文件上传组件
    lat: number=22.456789;//维度    给一个初始值，免得为空的时候
    lng: number=113.41654654;//经度

    listdata: Object;

    carid: string;
    userid = window.localStorage.id;
    oprice:string;
    otime:string;
    constructor(
        public navCtrl: NavController,
        private http: Http,
        private alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public camera: Camera,
        private imagePicker: ImagePicker,
        private file: File,
        private transfer: FileTransfer,
        private defaultOptions: RequestOptions,
        private platform: Platform,
        private geolocation: Geolocation
    ) {
        //加载车牌号到下拉列表
        var url = window.localStorage.apipath+"/index.php/Home/index/getallcarid";
        this.http.request(url, '').subscribe((res: Response) => {
            this.listdata = res.json();
            //console.log(res.json);
        })

        //运行此页面先获得经纬度
        this.getPoint();

    }






    // 暂时打开手机相册、上线后改为拍照
    openImgPicker(_ganma) {
        console.log(_ganma);
        const options: CameraOptions = {
            quality: 60,                                                 //相片质量 0 -100
            targetHeight: 400,
            targetWidth: 400,
            allowEdit: true,
            destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
            encodingType: this.camera.EncodingType.JPEG,                  //编码类型
            mediaType: this.camera.MediaType.PICTURE,                     //图片类型
            saveToPhotoAlbum: true,                                       //是否保存到相册
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
        }

        this.camera.getPicture(options).then((imageData) => {

            //先取得经纬度
            this.getPoint();
            //console.log("got file: " + imageData);
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.path = base64Image;
            this.imgpath = imageData;
            //If it's file URI
            // this.path = imageData;
            //alert(this.path);
            this.upload(_ganma);//上传
        }, (err) => {
            //Handle error
        });
    }



    /**
    * 文件上传
    */
    upload(_ganma) {
        const apiPath = window.localStorage.apipath+"/index.php/Home/index/uploadfilesimgs?id=" + this.userid + "&lat=" + this.lat + "&lng=" + this.lng+"&status="+_ganma+"&carid="+this.carid+"&oprice="+this.oprice;//接口地址
        var params: URLSearchParams = new URLSearchParams();
        params.set('base64img', this.imgpath);//图片img

        var headers = new Headers({
            //'Content-Type': 'application/x-www-form-urlencoded',
            //'Accept':'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        this.http.post(apiPath, params, options).subscribe(res => {
            var resdata: Object = res.json();
            this.mgsalert(resdata['msg']);
        }, error => {
            this.mgsalert("网络错误:" + error);
        });



        //官网上传方法

    }







    /*选择select的value*/
    switchType() {
        //console.log(this.carid);
    }



    //返回
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


    //打开这个 页面取得经纬度
    getPoint(){
        //上传之前取得经纬度
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
        }).catch((error) => {
            console.log('获取地理位置失败！', error);
        });
    }


}
