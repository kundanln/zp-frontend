import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../_models/registration.model';
import { UserModel } from '../_models/user';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model: UserModel =
        {
            district:null,
            userName:null,
            password: null
           
        };
  constructor(private router: Router,private loginservice:LoginService) {

   }

  ngOnInit() {
  }

  register(){
    alert(this.model);
    this.loginservice.create(this.model).subscribe(() => {
    alert('Registration completed successfully');
      //  this.alertService.success('Registration successful', true);
      this.router.navigate(['/login']);
  });
  }

}
