import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css']
})
export class ExpansionComponent implements OnInit {

  videos: Video[] = [];

  constructor() { }

  ngOnInit() {
    this.fillContent();
  }

  fillContent(){
    let video1: Video = {
      id: 1,
      description: 'A',
      title: 'A',
      progress: 40,
      duration: 80
    }
    this.videos.push(video1);

    let video2:Video = {
      id: 2,
      description: 'B',
      title: 'B',
      progress: 60,
      duration: 180
    }
    this.videos.push(video2);
  }

  getUserProgressInPercentage(video: Video){

    let progress = 0;
    if(!video){
      return progress;
    }
    //If duration is either null or undefined or 0 or NaN; return 0
    if(!video.duration || isNaN(video.duration)){
      return progress;
    }
    //If user progress is either null or undefined or 0 or NaN; return 0
    if(!video.progress || isNaN(video.duration)){
      return progress;
    }

    progress = (video.progress / video.duration) * 100;
    if(progress > 100){
      progress = 100;
      console.log(video);
      console.log(video.progress);
      console.log(video.duration);
      console.log('progress' +  progress);
    }
    else if(progress < 0){
      progress = 0;
    }
    else{
      progress = Math.round(parseFloat(progress.toFixed(2)));
    }
    return progress;
  }

}

export class Video{
  id: number;
  title: string;
  description: string;
  progress: number;
  duration: number;
}
