import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { ColDef, DomLayoutType } from 'ag-grid-community';
import { Observable } from 'rxjs';

interface IRow {
  lastName: string;
  position: string;
  team: string;
  topSpeed: string;
  twentyTwoPlus: string;
  twentyToTwentyTwo: number;
  eighteenToTwenty: boolean;
}

@Component({
  selector: 'app-skating-distance',
  templateUrl: './skating-distance.component.html',
  styleUrls: ['./skating-distance.component.scss']
})
export class SkatingDistanceComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  public domLayout: DomLayoutType = 'autoHeight';
  data: IRow[] = [];

  colDefs: ColDef<IRow>[] = [
    {
      field: 'lastName',
      headerName: 'Skater',
      pinned: 'left'
    },
    {
      field: 'position',
      headerName: 'Pos.'
    },
    {
      field: 'team'
    },
    {
      field: 'topSpeed',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'twentyTwoPlus',
      headerName: '22 +',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'twentyToTwentyTwo',
      headerName: '20 - 22',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'eighteenToTwenty',
      headerName: '18 - 20',
      sortingOrder: ['desc', 'asc']
    },
  ];

  ngOnInit(): void {
    (collectionData(
      query(
        collection(this.firestore, 'skater-skating-speeds'),
        orderBy('topSpeed', 'desc')
      ), { idField: 'id' }
    ) as Observable<IRow[]>).subscribe(data => {
      this.data = data;
    });
  }
}
