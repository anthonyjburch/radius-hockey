import { Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { Firestore, collection, collectionData, orderBy, query } from "@angular/fire/firestore";
import { ColDef, ColGroupDef, GridReadyEvent, SizeColumnsToFitGridStrategy } from "ag-grid-community";
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
  styleUrls: ['./skating-speed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkatingSpeedComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  
  data: IRow[] = [];

  defaultColumnDef: ColDef = {
    suppressMovable: true,
    resizable: false
  };

  colDefs: (ColDef | ColGroupDef)[] = [
    {
      children: [
        {
          headerName: '#',
          valueGetter: (params: any) => params.node.rowIndex + 1,
          maxWidth: 50,
          minWidth: 50,
          pinned: 'left'
        },
        {
          headerName: 'Skater',
          valueGetter: (params: any) => `${params?.data?.lastName}, ${params?.data?.firstName}`,
          minWidth: 100,
          pinned: 'left'
        },
        {
          field: 'position',
          headerName: 'Pos.',
          filter: true,
        },
        {
          field: 'team',
          filter: true
        },
        {
          field: 'topSpeed'
        }
      ]
    },
    {
      headerName: 'Speed Bursts (mph)',
      headerClass: 'burst-header-background',
      children: [
        {
          headerName: '22 +',
          field: 'twentyTwoPlus'
        },
        {
          headerName: '20 - 22',
          field: 'twentyToTwentyTwo'
        },
        {
          headerName: '18 - 20',
          field: 'eighteenToTwenty'
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

  onResize = (event: any) => this.onGridReady(event);

  // onGridReady = (event: GridReadyEvent) => event.api.sizeColumnsToFit();
  onGridReady(event: GridReadyEvent): void {
    console.log('Grid Ready');
    console.log(event);
    event.api.sizeColumnsToFit();
  }

  updateCols(): void {
    this.colDefs = [];
  }
}