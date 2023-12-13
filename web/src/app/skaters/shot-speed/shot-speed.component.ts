import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FirestoreService } from 'src/app/core/firestore.service';
import { GridService } from 'src/app/core/grid.service';

@Component({
  selector: 'app-shot-speed',
  templateUrl: './shot-speed.component.html',
  styleUrls: ['./shot-speed.component.scss']
})
export class ShotSpeedComponent implements OnInit {
  private firestoreSvc: FirestoreService = inject(FirestoreService);
  private gridSvc: GridService = inject(GridService);

  data: [] = [];
  colDefs: ColDef[] = [
    ...this.gridSvc.getPlayerInfoCols(),
    {
      field: 'topSpeed',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'avgSpeed',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'oneHundredPlus',
      headerName: '100 +',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'ninetyToOneHundred',
      headerName: '90 - 100',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'eightyToNinety',
      headerName: '80 - 90',
      sortingOrder: ['desc', 'asc']
    },
    {
      field: 'seventyToEighty',
      headerName: '70-80',
      sortingOrder: ['desc', 'asc']
    }
  ];

  ngOnInit(): void {
    this.firestoreSvc
        .getSkaterShotSpeed()
        .subscribe(data => {
          this.data = data;
        });
  }
}
