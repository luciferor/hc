import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler,AlertController,Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UsercenterPage } from '../pages/usercenter/usercenter';
import { UploadimgPage } from '../pages/uploadimg/uploadimg';
import { CarmanagerPage } from '../pages/carmanager/carmanager';
import { ActionotherPage } from '../pages/actionother/actionother';
import { XingchengPage} from '../pages/xingcheng/xingcheng';
import { WeixiuPage } from '../pages/weixiu/weixiu';
import { JiayouPage } from '../pages/jiayou/jiayou';
import { ChuxianPage } from '../pages/chuxian/chuxian';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//http用于像服务器请求ajax数据
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';//地理位置

//上传图片
import { Camera } from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { importType } from '@angular/compiler/src/output/output_ast';

//时间日期控件
import { DatePicker } from '@ionic-native/date-picker';

//管道加入
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UsercenterPage,
    UploadimgPage,
    CarmanagerPage,
    ActionotherPage,
    XingchengPage,
    WeixiuPage,
    JiayouPage,
    ChuxianPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UsercenterPage,
    UploadimgPage,
    CarmanagerPage,
    ActionotherPage,
    XingchengPage,
    WeixiuPage,
    JiayouPage,
    ChuxianPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpModule,
    Geolocation,//地理位置
    Camera,
    ImagePicker,
    File,
    FileTransfer,DatePicker
  ]
})
export class AppModule {}
