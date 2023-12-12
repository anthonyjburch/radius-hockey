import { Component, OnInit, ViewEncapsulation, inject } from "@angular/core";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { FirestoreService } from "src/app/core/firestore.service";
import { GridService } from "src/app/core/grid.service";

@Component({
  selector: 'app-skating-speed',
  templateUrl: './skating-speed.component.html',
  styleUrls: ['./skating-speed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SkatingSpeedComponent implements OnInit {
  private firestoreSvc: FirestoreService = inject(FirestoreService);
  private gridService: GridService = inject(GridService);

  data: [] = [];

  colDefs: (ColDef | ColGroupDef)[] = [
    {
      children: [
        ...this.gridService.getPlayerInfoCols(),
        {
          field: 'topSpeed',
          minWidth: 80,
          sortingOrder: ['desc', 'asc']
        }
      ]
    },
    {
      headerName: 'Speed Bursts (mph)',
      headerClass: 'burst-header-background',
      children: [
        {
          headerName: '22 +',
          field: 'twentyTwoPlus',
          minWidth: 80,
          sortingOrder: ['desc', 'asc']
        },
        {
          headerName: '20 - 22',
          field: 'twentyToTwentyTwo',
          minWidth: 80,
          sortingOrder: ['desc', 'asc']
        },
        {
          headerName: '18 - 20',
          field: 'eighteenToTwenty',
          minWidth: 80,
          sortingOrder: ['desc', 'asc']
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.firestoreSvc
        .getSkaterSkatingSpeeds()
        .subscribe(data => {
          this.data = data;
        });
  }
}