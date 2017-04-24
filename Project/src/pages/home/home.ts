import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
items:any[];
  constructor(public navCtrl: NavController) {

  this.items = [];

   this.items.push({
       id:1,
       dayOfWeek : "petak",
       date : "19.04.2017",
       halls : [
         {
           name : "Dvorana A",
           description :  "Core Java, Frameworks & Servers"
        }  ,
        { name : "Dvorana B",
           description :  "Core Java, Ante & Cevapi"}      
       ,
       ],
       hideme : true      
    });

 this.items.push({
       id:2,
       dayOfWeek : "subota",
       date : "20.04.2017",
       halls : [
         {
           name : "Dvorana B",
           description :  "Core Java, Ante & Cevapi"
        }
       ]  ,
        hideme : true      
    });

  }
onClick(event, item) {
 item.hideme =!item.hideme;
// alert("bla");
}

}
