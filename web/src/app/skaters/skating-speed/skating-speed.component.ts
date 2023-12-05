import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, orderBy, query, limit } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, map } from 'rxjs';

interface TableConfig {
  columns: TableHeaderColumnData[];
  primarySortColId: string;
  primarySortDir: 'asc' | 'desc';
  resultsPerPage: number;
  currentPage: number;
}

interface TableHeaderColumnData {
  id: string,
  display: string,
  defaultSort: 'asc' | 'desc',
  defaultSecondarySortColId: string,
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
    currentPage: 0,
    resultsPerPage: 25,
    columns: [
      {
        id: 'skater',
        display: 'Skater',
        defaultSort: 'asc',
        defaultSecondarySortColId: 'topSpeed',
        elementSortProperty: 'lastName'
      },
      {
        id: 'team',
        display: 'Team',
        defaultSort: 'asc',
        defaultSecondarySortColId: 'topSpeed',
        elementSortProperty: 'team'
      },
      {
        id: 'pos',
        display: 'Pos.',
        defaultSort: 'asc',
        defaultSecondarySortColId: 'topSpeed',
        elementSortProperty: 'position'
      },
      {
        id: 'topSpeed',
        display: 'Top Speed',
        defaultSort: 'desc',
        defaultSecondarySortColId: 'skater',
        elementSortProperty: 'skatingSpeed.topSpeed'
      },
      {
        id: 'twentyTwoPlus',
        display: '22 +',
        defaultSort: 'desc',
        defaultSecondarySortColId: 'skater',
        elementSortProperty: 'skatingSpeed.twentyTwoPlus'
      },
      {
        id: 'twentyToTwentyTwo',
        display: '20 - 22',
        defaultSort: 'desc',
        defaultSecondarySortColId: 'skater',
        elementSortProperty: 'skatingSpeed.twentyToTwentyTwo'
      },
      {
        id: 'eighteenToTwenty',
        display: '18 - 20',
        defaultSort: 'desc',
        defaultSecondarySortColId: 'skater',
        elementSortProperty: 'skatingSpeed.eighteenToTwenty'
      }
    ],
    primarySortColId: 'topSpeed',
    primarySortDir: 'desc'
  }

  ngOnInit(): void {
    this.getSkatingData();
  }

  getSkatingData(afterKey: string | number | undefined = undefined): void {
    const sortedCol = this.tableConfig.columns.filter(c => c.id === this.tableConfig.primarySortColId)[0];
    const secondaryCol = this.tableConfig.columns.filter(c => c.id === sortedCol.defaultSecondarySortColId)[0];

    this.skatingTableElements$ =  collectionData(
      query(
        collection(this.firestore, 'skaters'),
        orderBy(sortedCol.elementSortProperty, this.tableConfig.primarySortDir),
        orderBy(secondaryCol.elementSortProperty, secondaryCol.defaultSort),
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

    if (col.id === this.tableConfig.primarySortColId) {
      this.tableConfig.primarySortDir = this.tableConfig.primarySortDir !== 'asc' ? 'asc' : 'desc';
    } else {
      this.tableConfig.primarySortColId = col.id;
      this.tableConfig.primarySortDir = col.defaultSort;
    }

    this.changePage('reset');
  }

  setMaxResults(max: number) {
    this.tableConfig.resultsPerPage = max;
    this.changePage('reset');
  }

  changePage(mode: 'reset' | 'inc' | 'dec', element: SkatingTableElement | undefined = undefined) {
    switch (mode) {
      case 'reset':
        this.tableConfig.currentPage = 0;
        this.getSkatingData();
        break;

      case 'inc':
        this.tableConfig.currentPage++;
        console.log(element);
        break;

      case 'dec':
        this.tableConfig.currentPage--;
        console.log(element);
        break;
    }
  }
}
