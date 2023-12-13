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
        minWidth: 60,
        maxWidth: 60,
        resizable: false,
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
        filterParams: {
          filterOptions: ['equals', 'notEqual'],
          buttons: ['apply', 'reset']
        },
        minWidth: 60,
      },
      {
        field: 'team',
        filter: true,
        minWidth: 70,
        filterParams: {
          filterOptions: ['equals', 'notEqual'],
          buttons: ['apply', 'reset']
        },
      }
    ];
  }
}
