import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { ColDef, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { Observable } from 'rxjs';

interface IRow {
  lastName: string;
  firstName: string;
  position: string;
  team: string;
  averagePerSixty: number;
  topPeriod: number;
  topGame: number;
  total: number;
}

@Component({
  selector: 'app-skating-distance',
  templateUrl: './skating-distance.component.html',
  styleUrls: ['./skating-distance.component.scss']
})
export class SkatingDistanceComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  manpower: string = 'All';
  data: [] = [];

  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth'
  };
  
  defaultColumnDef: ColDef = {
    suppressMovable: true,
  };

  colDefs: ColDef<IRow>[] = [
    {
      headerName: 'Skater',
      valueGetter: (params: any) => `${params?.data?.lastName}, ${params?.data?.firstName}`,
      pinned: 'left',
      minWidth: 150
    },
    {
      field: 'position',
      filter: true,
      headerName: 'Pos.',
      minWidth: 75
    },
    {
      field: 'team',
      filter: 'true',
      minWidth: 85
    },
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
    (collectionData(
      query(
        collection(this.firestore, 'skater-skating-distances-all'),
        orderBy('total', 'desc')
      ), { idField: 'id' }
    ) as Observable<[]>).subscribe(data => {
      this.data = data;
    });
  }
}
