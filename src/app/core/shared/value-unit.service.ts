import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueUnitService {
  
  constructor() { }
  private unitsSubject = new BehaviorSubject<any[]>([]);
  private childrenUnitsSubject = new BehaviorSubject<any[]>([]);
  units$ = this.unitsSubject.asObservable();
  childrenUnits$ = this.childrenUnitsSubject.asObservable();

  setUnits(units: any[]) {
    this.unitsSubject.next(units);
  }

  setChildrenUnits(childrenUnits: any[]) {
    this.childrenUnitsSubject.next(childrenUnits);
  }

  private unitIdSource = new Subject<any>();
  unitId$ = this.unitIdSource.asObservable();

  setUnitId(unitId: string) {
    this.unitIdSource.next(unitId);
  }

  public tenantIdSource: any;

  setTenantId(tenantId: string) {
    this.tenantIdSource = tenantId;
  }

  // Method to get the current unitId value
  getCurrentUnitId(): string {
    let currentUnitId: string = '';
    this.unitId$.subscribe(unitId => {
      currentUnitId = unitId;
    }).unsubscribe();
    return currentUnitId;
  }

  // Track object list refresh
  private objectListRefreshSource = new Subject<void>();
  objectListRefresh$ = this.objectListRefreshSource.asObservable();

  // Method to trigger a refresh of the object list
  triggerObjectListRefresh(): void {
    console.log('ValueUnitService: Triggering object list refresh');
    this.objectListRefreshSource.next();
  }
}
