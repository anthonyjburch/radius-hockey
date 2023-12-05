import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, orderBy, query, limit } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

interface TableConfig {
  columns: TableHeaderColumnData[];
  resultsPerPage: number;
}

interface TableHeaderColumnData {
  id: string,
  display: string
  sort: 'asc' | 'desc' | 'none',
  elementSortProperty: string
}

interface SkatingTableElement {
  id: string,
  firstName: string,
  lastName: string,
  position: string
  team: string,
  skatingSpeed: {
    eighteenToTwenty: number,
    topSpeed: number
    twentyToTwentyTwo: number
    twentyTwoPlus: number
  }
}

@Component({
  selector: 'app-skating-speed',
  templateUrl: './skating-speed.component.html',
  styleUrls: ['./skating-speed.component.scss']
})
export class SkatingSpeedComponent {
  private firestore: Firestore = inject(Firestore);
  skatingTableElements$: Observable<SkatingTableElement[]> = new BehaviorSubject([]);

  tableConfig: TableConfig = {
    resultsPerPage: 25,
    columns: [
      {
        id: 'skater',
        display: 'Skater',
        sort: 'none',
        elementSortProperty: 'lastName'
      },
      {
        id: 'team',
        display: 'Team',
        sort: 'none',
        elementSortProperty: 'team'
      },
      {
        id: 'pos',
        display: 'Pos.',
        sort: 'none',
        elementSortProperty: 'position'
      },
      {
        id: 'topSpeed',
        display: 'Top Speed',
        sort: 'desc',
        elementSortProperty: 'skatingSpeed.topSpeed'
      },
      {
        id: 'twentyTwoPlus',
        display: '22 +',
        sort: 'none',
        elementSortProperty: 'skatingSpeed.twentyTwoPlus'
      },
      {
        id: 'twentyToTwentyTwo',
        display: '20 - 22',
        sort: 'none',
        elementSortProperty: 'skatingSpeed.twentyToTwentyTwo'
      },
      {
        id: 'eighteenToTwenty',
        display: '18 - 20',
        sort: 'none',
        elementSortProperty: 'skatingSpeed.eighteenToTwenty'
      }
    ]
  }

  ngOnInit(): void {
    this.getSkatingData();
  }

  getSkatingData(): void {
    const sortedCol = this.tableConfig.columns.filter(c => c.sort !== 'none')[0];

    this.skatingTableElements$ =  collectionData(
      query(
        collection(this.firestore, 'skaters'),
        orderBy(sortedCol.elementSortProperty, sortedCol.sort !== 'none' ? sortedCol.sort : 'desc'),
        limit(this.tableConfig.resultsPerPage)
      ),
      { idField: 'id' }
    ) as Observable<SkatingTableElement[]>
  }

  sortColumn(id: string): void {
    const col = this.tableConfig.columns.find(c => c.id === id);

    if (!col) {
      throw Error('sortColumn called on undefined column');
    }

    switch (col.sort) {
      case 'none':
      case 'asc':     
        col.sort = 'desc';
        break;
      case 'desc':
        col.sort = 'asc';
        break;
    }

    this.tableConfig.columns.filter(c => c.id !== id).forEach(c => c.sort = 'none');

    this.getSkatingData();
  }

  setMaxResults(max: number) {
    this.tableConfig.resultsPerPage = max;
    this.getSkatingData();
  }
}
