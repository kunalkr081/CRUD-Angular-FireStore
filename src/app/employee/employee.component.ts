import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './../shared/employee.service';
import { Employee } from '../shared/employee.model';

import { map } from 'rxjs/operators';

declare var M: any;

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],
})

export class EmployeeComponent implements OnInit {
  searchText;
  dataRefresher: any;
  allEmps: Array<any> = [];

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.refreshEmployeeList();
    this.employeeService.selectedEmployee = {
      id: '',
      name: '',
      position: '',
      office: '',
      salary: null,
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "" || form.value.id == null) {
      console.log("post");
      this.employeeService
        .postEmployee(form.value)
        .then((res) => {
          this.resetForm(form);
          M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("put");
      this.employeeService
        .putEmployee(form.value)
        .then((res) => {
          this.resetForm(form);
          M.toast({ html: 'Saved Successfully', classes: 'rounded' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  refreshEmployeeList() {
    this.dataRefresher = setTimeout(() => {
      this.employeeService
        .getEmployeeList()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              id: c.payload.doc.id,
              ...(c.payload.doc.data() as {}),
            }))
          )
        )
        .subscribe((data) => {
          this.allEmps = data;
        });
    }, 1000);
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(id: string) {
    console.log(id)
    if (confirm('Are you sure to delete this record?') == true) {
      this.employeeService.deleteEmployee(id).then((res) => {
        this.resetForm();
        M.toast({ html: 'Deleted succesfully', classes: 'rounded' });
      });
    }
  }
}
