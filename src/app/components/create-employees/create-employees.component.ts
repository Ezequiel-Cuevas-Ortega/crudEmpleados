import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.scss'
})
export class CreateEmployeesComponent {
  loading = false;
  submitted = false;
  createEmployee: FormGroup;
  id: string | null;
  title = 'Agregar Empleado';
  titleBtn = 'Agregar';

  constructor(
      private fb: FormBuilder, 
      private employeeService: EmployeeService,
      private toastr: ToastrService,
      private router: Router,
      private aRouter: ActivatedRoute
    ) {
    this.createEmployee = this.fb.group({
      name:     ['', Validators.required],
      lastname: ['', Validators.required],
      age:      ['', Validators.required],
      document: ['', Validators.required],
      salary:   ['', Validators.required],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.isEditing();
  }

  addEditEmployee() {
    this.loading = true;
    this.submitted = true;
    if (this.createEmployee.invalid) {
      return;
    }


    if (this.id === null) {
      this.saveEmployee();
    } else {
      this.editEmployee(this.id);
    }
  }

  saveEmployee(): void {
    this.loading = true;
    this.submitted = true;
    if (this.createEmployee.invalid) {
      return;
    }

    const employee: any = {
      name: this.createEmployee.value.name,
      lastname: this.createEmployee.value.lastname,
      age: this.createEmployee.value.age,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      createDate: new Date(),
      updateDate: new Date(),
    }

    console.log(this.createEmployee);
    console.log(employee);

    this.employeeService.addEmployee(employee).then(() => {
      this.loading = false;
      console.log("Empleado registrado");
      this.toastr.success("Empleado registrado");
      this.router.navigate(['/list-employees']);
      
    }).catch(error => {
      this.loading = false;
      this.toastr.error("Empleado no se pudo crear");
    });
    
  }

  editEmployee(id: string) {
    const employee: any = {
      name: this.createEmployee.value.name,
      lastname: this.createEmployee.value.lastname,
      age: this.createEmployee.value.age,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      updateDate: new Date(),
    }

    this.loading = true;
    this.employeeService.updateEmployee(id, employee).then(() =>  {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Datos Modificados', {
        positionClass: 'toasl-bottom-right'
      });
      this.router.navigate(['/list-employees']);
    });
  }

  

  isEditing() {
    this.titleBtn =(this.id != null) ? 'Editar' : 'Agregar';

    if (this.id != null) {
      this.title = 'Editar Empleado'; 
      this.titleBtn = 'Editar';
      this.loading = true;
      this.employeeService.getEmployeeById(this.id).subscribe(data => {
        this.loading = false;
        this.createEmployee.setValue({
          name: data.payload.data()['name'],
          lastname: data.payload.data()['lastname'],
          age: data.payload.data()['age'],
          document: data.payload.data()['document'],
          salary: data.payload.data()['salary'],
        });
      });
    } else {

    }
  }
}
