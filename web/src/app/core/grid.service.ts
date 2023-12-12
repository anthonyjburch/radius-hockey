import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  getPlayerInfoCols(): ColDef[] {
    return [
      {
        headerName: '#',
        valueGetter: (params: any) => params.node.rowIndex + 1,
        maxWidth: 50,
        minWidth: 25,
        pinned: 'left'
      },
      {
        headerName: 'Skater',
        valueGetter: (params: any) => `${params?.data?.lastName}, ${params?.data?.firstName}`,
        minWidth: 100,
        resizable: true,
        pinned: 'left'
      },
      {
        field: 'position',
        headerName: 'Pos.',
        filter: true,
        minWidth: 60
      },
      {
        field: 'team',
        filter: true,
        minWidth: 70
      }
    ];
  }
}