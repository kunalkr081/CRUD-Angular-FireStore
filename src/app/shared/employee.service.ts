import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(public afs: AngularFirestore) {}

  postEmployee(emp: Employee) {
    emp.id = this.afs.createId();
    return this.afs.collection('employees').doc(emp.id).set(emp);
  }

  getEmployeeList() {
    return this.afs.collection('employees').snapshotChanges();
  }

  putEmployee(emp: Employee) {
    return this.afs.collection('employees').doc(emp.id).set(emp);
  }

  deleteEmployee(id: string) {
    return this.afs.collection('employees').doc(id).delete();
  }
}
