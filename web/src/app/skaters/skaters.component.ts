import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../core/models/navigationLink';

@Component({
  selector: 'app-skaters',
  templateUrl: './skaters.component.html',
  styleUrls: ['./skaters.component.scss']
})
export class SkatersComponent {
  links: NavigationLink[] = [
    {
      path: 'skating-speed',
      displayText: 'Skating Speed'
    },
    {
      path: 'skating-distance',
      displayText: 'Skating Distance'
    },
    {
      path: 'shot-speed',
      displayText: 'Shot Speed'
    }
  ]
}