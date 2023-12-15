import { Component, Input } from '@angular/core';
import { NavigationLink } from 'src/app/core/models/navigationLink';

@Component({
  selector: 'app-horizontal-scroll-navigation',
  templateUrl: './horizontal-scroll-navigation.component.html',
  styleUrls: ['./horizontal-scroll-navigation.component.scss']
})
export class HorizontalScrollNavigationComponent {
  @Input() links: NavigationLink[] = [];
}
