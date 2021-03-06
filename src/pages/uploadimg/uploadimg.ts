import { Component } from '@angular/core';
import { IonicPage, NavController, Tabs, AlertController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
//http用于ajax传输数据
import { Http, Response } from '@angular/http';

import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";
@Component({
    selector: 'page-uploadimg',
    templateUrl: 'uploadimg.html'
})
export class UploadimgPage {
    avatar: string = "";
    constructor(public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {

    }


    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: '拍照',
                role: 'takePhoto',
                handler: () => {
                    this.takePhoto();
                }
            }, {
                text: '从相册选择',
                role: 'chooseFromAlbum',
                handler: () => {
                    this.chooseFromAlbum();
                }
            }, {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    console.log("cancel");
                }
            }]
        });
        actionSheet.present().then(value => {
            return value;
        });
    }
    takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            allowEdit: true,
            targetWidth: 200,
            targetHeight: 200,
            saveToPhotoAlbum: true,
        };

        this.camera.getPicture(options).then(image => {
            console.log('Image URI: ' + image);
            this.avatar = image.slice(7);
        }, error => {
            console.log('Error: ' + error);
        });
    }

    chooseFromAlbum() {
        const options: ImagePickerOptions = {
            maximumImagesCount: 1,
            width: 200,
            height: 200
        };
        this.imagePicker.getPictures(options).then(images => {
            if (images.length > 1) {
                this.presentAlert();
            } else if (images.length === 1) {
                console.log('Image URI: ' + images[0]);
                this.avatar = images[0].slice(7);
            }
        }, error => {
            console.log('Error: ' + error);
        });
    }

    presentAlert() {
        let alert = this.alertCtrl.create({ title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"] });
        alert.present().then(value => {
            return value;
        });
    }



}