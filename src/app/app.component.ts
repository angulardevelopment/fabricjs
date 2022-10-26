import { Component } from '@angular/core';
import { fabric } from 'fabric';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-fabric';
  canvas: any;
  image: any;
  file: File = {} as File;

  ngOnInit() {

    this.canvas = new fabric.Canvas('tshirt-canvas');
  }




  constructor() { }





  export() {
    var node = document.getElementById('tshirt-div');
    if (node != null) {


      domtoimage.toPng(node).then(function (dataUrl) {
        // Print the data URL of the picture in the Console
        console.log(dataUrl);

        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${'index'}.png`;
        a.click();
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
  }

  drop(e: any) {
    var reader = new FileReader();

    reader.onload = (event) => {
      var imgObj = new Image();
      if (event.target != null) {


        imgObj.src = event.target.result as string;

        // When the picture loads, create the image in Fabric.js
        imgObj.onload = () => {
          var img = new fabric.Image(imgObj);

          img.scaleToHeight(300);
          img.scaleToWidth(300);
          this.canvas.centerObject(img);
          this.canvas.add(img);
          this.canvas.renderAll();
        };
      }
    };

    // If the user selected a picture, load it
    if (e.files[0]) {
      reader.readAsDataURL(e.files[0]);
    }


    // When the user selects a picture that has been added and press the DEL key
    // The object will be removed !
    document.addEventListener("keydown", (e) => {
      var keyCode = e.keyCode;

      if (keyCode == 46) {
        console.log("Removing selected element on Fabric.js on DELETE key !");
        this.canvas.remove(this.canvas.getActiveObject());
      }
    }, false);
  }
}
