import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Firestore, collectionData, orderBy } from "@angular/fire/firestore";
import { collection, query } from "@firebase/firestore";
import { BehaviorSubject, Observable } from "rxjs";

interface TableElement {
  [key: string]: string | number,
  firstName: string,
  lastName: string,
  position: string,
  team: string,
  topSpeed: number,
  twentyTwoPlus: number
  twentyToTwentyTwo: number,
  eighteenToTwenty: number
}

interface TableColumn {
  id: string,
  display: string,
  defaultSortDir: 'asc' | 'desc',
  sortedElement: string,
}

interface TableConfig {
  columns: TableColumn[],
  sortedColumnId: string,
  sortedColumnDir: 'asc' | 'desc',
  resultsPerPage: number,
  currentPage: number
}

@Component({
  selector: 'app-skating-speed',
  templateUrl: './skating-speed.component.html',
  styleUrls: ['./skating-speed.component.scss']
})
export class SkatingSpeedComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  elements$: Observable<TableElement[]> = new BehaviorSubject([]);
  elements: TableElement[] = [];
  tableConfig: TableConfig = {
    resultsPerPage: 25,
    currentPage: 0,
    sortedColumnId: 'topSpeed',
    sortedColumnDir: 'desc',
    columns: [
      {
        id: 'skater',
        display: 'Skater',
        defaultSortDir: 'asc',
        sortedElement: 'lastName',
      },
      {
        id: 'team',
        display: 'Team',
        defaultSortDir: 'asc',
        sortedElement: 'team',
      },
      {
        id: 'pos',
        display: 'Pos.',
        defaultSortDir: 'asc',
        sortedElement: 'position',
      },
      {
        id: 'topSpeed',
        display: 'Top Speed',
        defaultSortDir: 'desc',
        sortedElement: 'topSpeed',
      },
      {
        id: 'twentyTwoPlus',
        display: '22 +',
        defaultSortDir: 'desc',
        sortedElement: 'twentyTwoPlus',
      },
      {
        id: 'twentyToTwentyTwo',
        display: '20 - 22',
        defaultSortDir: 'desc',
        sortedElement: 'twentyToTwentyTwo',
      },
      {
        id: 'eighteenToTwenty',
        display: '18 - 20',
        defaultSortDir: 'desc',
        sortedElement: 'eighteenToTwenty',
      }
    ]
  };

  ngOnInit(): void {
    this.elements$ = collectionData(
      query(
        collection(this.firestore, 'skater-skating-speeds'),
        orderBy('topSpeed', 'desc')
      ),
      { idField: 'id' }
    ) as Observable<TableElement[]>;

    this.elements$.subscribe(arr => {
      this.elements = arr;
    });
  }

  sortData(column: TableColumn) {
    let sortDir: 'asc' | 'desc' = column.defaultSortDir;

    if (column.id === this.tableConfig.sortedColumnId) {
      sortDir = this.tableConfig.sortedColumnDir !== 'asc' ? 'asc' : 'desc';
    }

    this.elements = sortDir === 'asc' ?
      this.elements.sort((a: any, b: any) => a[column.sortedElement].toString().localeCompare(b[column.sortedElement].toString(), 'en', { numeric: true })) :
      this.elements.sort((a: any, b: any) => b[column.sortedElement].toString().localeCompare(a[column.sortedElement].toString(), 'en', { numeric: true }));

    this.tableConfig.sortedColumnDir = sortDir;
    this.tableConfig.sortedColumnId = column.id;
  }
}