import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  employees: any[] = [];

  constructor(private employeesService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeesService.getEmployees().subscribe(data => {
      //console.log("recibiendo datos");
      //console.log(data);

      this.employees = [];
      data.forEach((element: any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  removeEmployeeById(id: string){
    console.log("Elminando id: ", id);
    this.employeesService.removeEmployeeById(id).then(() => {
      this.toastr.error('Empleado eliminado', 'registro eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log("Error eliminando empleado");
      console.log(error);
    });
  }
}
