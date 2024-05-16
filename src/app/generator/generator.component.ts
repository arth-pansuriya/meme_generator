import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent implements OnInit {
  @ViewChild('memeCanvas', { static: false }) myCanvas: any;

  topText: string = '';
  bottomText: string = '';
  fileEvent: any;
  fileEvent1: any;
  textColor: string = '#000000';
  backgroundColor: string = '#F9F9FB';

  constructor() {}

  ngOnInit() {}

  preview(e: any) {
    this.fileEvent = e;

    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    // console.log(e);
    render.readAsDataURL(e.target.files[0]);
    // console.log(render);
    render.onload = function (event) {
      // console.log(event);
      const img = new Image();

      img.src = event.target?.result as string;
      // console.log(img);
      img.onload = function () {
        ctx.drawImage(img, 50, 100, 500, 225);
      };
    };
  }

  preview1(e: any) {
    this.fileEvent1 = e;

    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render1 = new FileReader();
    // console.log(e);
    render1.readAsDataURL(e.target.files[0]);
    // console.log(render);
    render1.onload = function (event) {
      // console.log(event);
      const img = new Image();

      img.src = event.target?.result as string;
      // console.log(img);
      img.onload = function () {
        ctx.drawImage(img, 50, 325, 500, 225);
      };
    };
  } 

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.preview(this.fileEvent);
    this.preview1(this.fileEvent1);

    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width / 2, 75);
    ctx.fillText(this.bottomText, canvas.width / 2, 610);
  }

  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBgColor($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;
    let img = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.download = 'meme.png';
    link.href = img;
    link.click();
  }
}
