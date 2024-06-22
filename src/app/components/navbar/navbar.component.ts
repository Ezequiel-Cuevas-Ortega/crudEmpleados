import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   myName: string = "alice";
   myJson = {
    name: "Maikel",
    age: 42
   }

  ngOnInit() {
    
  }

  ngOnDestroy() {

  }
}
