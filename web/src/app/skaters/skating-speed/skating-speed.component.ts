import { Component, OnInit, inject } from "@angular/core";
import { Firestore, collectionData } from "@angular/fire/firestore";
import { collection, query } from "@firebase/firestore";
import { BehaviorSubject, Observable } from "rxjs";

interface TableElement {
  firstName: string,
  lastName: string,
  position: string,
  team: string,
  topSpeed: number,
  twentyTwoPlus: number
  twentyToTwentyTwo: number,
  eighteenToTwenty: number
}

@Component({
  selector: 'app-skating-speed',
  templateUrl: './skating-speed.component.html',
  styleUrls: ['./skating-speed.component.scss']
})
export class SkatingSpeedComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  elements$: Observable<TableElement[]> = new BehaviorSubject([]);

  ngOnInit(): void {
    this.elements$ = collectionData(
      query(
        collection(this.firestore, 'skater-skating-speeds')
      ),
      { idField: 'id' }
    ) as Observable<TableElement[]>
  } 
}