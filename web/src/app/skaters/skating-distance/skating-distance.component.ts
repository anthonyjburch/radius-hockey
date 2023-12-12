import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FirestoreService } from 'src/app/core/firestore.service';
import { GridService } from 'src/app/core/grid.service';

interface IManpower {
  manpowerTbl: string,
  ddlDisplay: string
}

@Component({
  selector: 'app-skating-distance',
  templateUrl: './skating-distance.component.html',
  styleUrls: ['./skating-distance.component.scss']
})
export class SkatingDistanceComponent implements OnInit {
  private firestoreSvc: FirestoreService = inject(FirestoreService);
  private gridSvc: GridService = inject(GridService);

  manpowerList: IManpower[] = [
    {
      manpowerTbl: 'all',
      ddlDisplay: 'All Situations'
    },
    {
      manpowerTbl: 'es',
      ddlDisplay: 'Even Strength'
    },
    {
      manpowerTbl: 'pp',
      ddlDisplay: 'Power Play'
    },
    {
      manpowerTbl: 'pk',
      ddlDisplay: 'Penalty Kill'
    }
  ];
  manpower: IManpower = this.manpowerList.find(m => m.manpowerTbl === 'all')!;

  
  data: [] = [];  
  colDefs: ColDef[] = [
    ...this.gridSvc.getPlayerInfoCols(),
    {
      field: 'total',
      sortingOrder: ['desc', 'asc'],
      minWidth: 75
    },
    {
      headerName: 'Avg / 60',
      field: 'averagePerSixty',
      sortingOrder: ['desc', 'asc'],
      minWidth: 75
    },
    {
      field: 'topGame',
      sortingOrder: ['desc', 'asc'],
      minWidth: 75
    },
    {
      field: 'topPeriod',
      sortingOrder: ['desc', 'asc'],
      minWidth: 75
    }    
  ];

  ngOnInit(): void {
    this.getSkatingDistances(this.manpower);
  }

  onManpowerChange(manpower: IManpower): void {
    this.manpower = manpower;
    this.getSkatingDistances(this.manpower);
  }

  getSkatingDistances(manpower: IManpower): void {
    this.data = [];
    this.firestoreSvc
        .getSkaterSkatingDistances(manpower.manpowerTbl)
        .subscribe(data => {
          this.data = data;
        })
  }
}
