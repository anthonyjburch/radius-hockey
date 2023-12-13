import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  getSkaterSkatingSpeeds(): Observable<[]> {
    return (collectionData(
      query(
        collection(this.firestore, 'skater-skating-speeds'),
        orderBy('topSpeed', 'desc')
      ), { idField: 'id' }
    ) as Observable<[]>);
  }

  getSkaterSkatingDistances(manpower: string = 'all'): Observable<[]> {
    return (collectionData(
      query(
        collection(this.firestore, `skater-skating-distances-${manpower}`),
        orderBy('total', 'desc')
      ), { idField: 'id' }
    ) as Observable<[]>);
  }

  getSkaterShotSpeed(): Observable<[]> {
    return (collectionData(
      query(
        collection(this.firestore, 'skater-shot-speeds'),
        orderBy('topSpeed', 'desc')
      ), { idField: 'id' }
    ) as Observable<[]>);
  }
}
