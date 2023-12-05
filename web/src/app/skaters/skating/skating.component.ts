import { Component, OnInit } from '@angular/core';


interface SkatingTableElement {
  player: string,
  team: string,
  position: string,
  topSpeed: number,
  twentyPlus: number,
  twentyTwentyTwo: number,
  eighteenTwenty: number
}

@Component({
  selector: 'app-skating',
  templateUrl: './skating.component.html',
  styleUrls: ['./skating.component.scss']
})
export class SkatingComponent implements OnInit {
  firstNames = ['John', 'Josh', 'Jacob', 'Jack', 'Jason'];
  skatingTableElements: SkatingTableElement[] = [];

  ngOnInit(): void {
    this.skatingTableElements.push({
      player: this.firstNames[Math.floor(Math.random()*this.firstNames.length)],
      team: 'MIN',
      position: 'D', 
      topSpeed: 50,
      twentyPlus: 6,
      twentyTwentyTwo: 7,
      eighteenTwenty: 38
    });
  }
}
