import { Pipe, PipeTransform } from '@angular/core';
//http用于ajax传输数据
import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import {map} from "rxjs/operators"
/**
 * Generated class for the MattDamonPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mattDamon',
})
export class MattDamonPipe implements PipeTransform {
  carnum:string;
  constructor(private http: Http) {

  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value:string,args) {
    //根据id取得车牌号，
    var url = window.localStorage.apipath+"/index.php/Home/index/getcarnums?id="+value;
    /* this.http.request(url,'').subscribe((res:Response)=>{
         //console.log(res.json()[0].carnumber);
         return res.json()[0].carnumber;
    }) */
    console.log(this.http.request(url,"").pipe(map((res:Response)=>res.json()[0].carnumber)));
    return this.http.request(url,"").pipe(map((res:Response)=>res.json()[0].carnumber));

  }


}
