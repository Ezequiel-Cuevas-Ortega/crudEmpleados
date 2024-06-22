import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { CreateEmployeesComponent } from './components/create-employees/create-employees.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-employees', pathMatch: 'full'},
  { path: 'list-employees', component: ListEmployeesComponent },
  { path: 'new-employee', component: CreateEmployeesComponent },
  { path: 'edit-employee/:id', component: CreateEmployeesComponent },
  { path: '**', redirectTo: 'list-employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
