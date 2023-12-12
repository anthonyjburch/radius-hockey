import { Component, OnInit, inject } from "@angular/core";
import { Firestore, collection, collectionData, orderBy, query } from "@angular/fire/firestore";
import { ColDef, ColGroupDef, SizeColumnsToFitGridStrategy } from "ag-grid-community";
import { Observable } from "rxjs";

interface IRow {
  lastName: string;
  firstName: string;
  position: string;
  team: string;
  topSpeed: string;
  twentyTwoPlus: string;
  twentyToTwentyTwo: number;
  eighteenToTwenty: boolean;
}

@Component({
  selector: 'app-skating-speed',
  templateUrl: './skating-speed.component.html',
  styleUrls: ['./skating-speed.component.scss']
})
export class SkatingSpeedComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  
  data: IRow[] = [];

  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth'
  };
  
  defaultColumnDef: ColDef = {
    suppressMovable: true,
  };

  colDefs: (ColDef | ColGroupDef)[] = [
    {
      children: [
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
          field: 'topSpeed',
          cellDataType: 'number',
          sortingOrder: ['desc', 'asc'],
          minWidth: 100
        }
      ]
    },
    {
      headerName: 'Speed Bursts (mph)',
      children: [
        {
          field: 'twentyTwoPlus',
          headerName: '22 +',
          cellDataType: 'number',
          sortingOrder: ['desc', 'asc'],
          minWidth: 65
        },
        {
          field: 'twentyToTwentyTwo',
          headerName: '20 - 22',
          cellDataType: 'number',
          sortingOrder: ['desc', 'asc'],
          minWidth: 80
        },
        {
          field: 'eighteenToTwenty',
          headerName: '18 - 20',
          cellDataType: 'number',
          sortingOrder: ['desc', 'asc'],
          minWidth: 80
        }
      ]
    }
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