import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor( private firestore: AngularFirestore) { }

  async addEmployee(employee: any): Promise<any> {
    return this.firestore.collection("employees").add(employee);
  }

  async removeEmployeeById(id: string): Promise<any> {
    return this.firestore.collection("employees").doc(id).delete();
  }

  getEmployees(): Observable<any> {
      return this.firestore.collection("employees", ref => ref.orderBy('createDate', 'asc')).snapshotChanges();
  }

  getEmployeeById(id: string): Observable<any> {
    return this.firestore.collection("employees").doc(id).snapshotChanges();
  }

  updateEmployee(id: string, data: any): Promise<any> {
    return this.firestore.collection("employees").doc(id).update(data);
  }
}
