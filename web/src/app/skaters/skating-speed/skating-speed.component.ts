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
  displayText: string,
  displayMinWidth: number,
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
        displayText: 'Skater',
        displayMinWidth: 150,
        defaultSortDir: 'asc',
        sortedElement: 'lastName',
      },
      {
        id: 'team',
        displayText: 'Team',
        displayMinWidth: 100,
        defaultSortDir: 'asc',
        sortedElement: 'team',
      },
      {
        id: 'pos',
        displayText: 'Pos.',
        displayMinWidth: 100,
        defaultSortDir: 'asc',
        sortedElement: 'position',
      },
      {
        id: 'topSpeed',
        displayText: 'Top Speed',
        displayMinWidth: 125,
        defaultSortDir: 'desc',
        sortedElement: 'topSpeed',
      },
      {
        id: 'twentyTwoPlus',
        displayText: '22 +',
        displayMinWidth: 100,
        defaultSortDir: 'desc',
        sortedElement: 'twentyTwoPlus',
      },
      {
        id: 'twentyToTwentyTwo',
        displayText: '20 - 22',
        displayMinWidth: 100,
        defaultSortDir: 'desc',
        sortedElement: 'twentyToTwentyTwo',
      },
      {
        id: 'eighteenToTwenty',
        displayText: '18 - 20',
        displayMinWidth: 100,
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