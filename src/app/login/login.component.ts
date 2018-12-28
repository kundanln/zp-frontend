import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../_models/user';
import { LoginService } from '../_services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  userList: UserModel[] = [];

  public districtList: Array<string> = [];

  flag: boolean;
  model: any = {};
  returnUrl: string;
  username: string;
  password: string;
  district: string;
  name: string;
  id: number;
  // private value:any = {};
  // dropdownList: UserModel[] = [];

  
  constructor(private loginservice: LoginService, private routes: Router, private route: ActivatedRoute, ) {

    this.username = this.model.username;
    this.password = this.model.password;
    this.district = this.model.district;

  }

  ngOnInit() {
    this.loadUserModel();
    
  }

  public loadUserModel() {
    this.loginservice.getAll().subscribe((data: UserModel[] = []) => {
      this.userList = data;
      this.loadDistrict();
      console.log("All Records", this.userList);
    },

      error => {
        throw error;
      });
  }
  public loadDistrict() {
    this.userList.forEach(userModel => {
      if ((!this.districtList.includes(userModel.district))) {
        this.districtList.push(userModel.district);
        console.log(this.districtList);
      }
    });


  }

  login() {
    this.loginservice.getAll().subscribe((user: UserModel[] = []) => {
      this.userList = user;
      console.log(this.userList);
      this.userList.forEach(user => {
        if (user.userName == this.model.username && user.password == this.model.password && user.district == this.model.district) {
          this.flag = true;

        }

      });
      if (this.flag) {
        alert('Login Successfully');
        this.routes.navigate(['/main-app']);
      } else {
        alert('Invalid User or Password');
      }
    },
      error => {
        throw error;
      });


    //alert(this.model.username);
    //alert(this.model.password);
    // this.loginservice.getByUserId(this.model.username).subscribe((user: UserModel) => {
    //   console.log("User",user);
    //   if (user) {
    //       if (user.userName == this.model.username && user.password == this.model.password) {
    //           console.log("Model.Username",this.model.username,user.userName);
    //           localStorage.setItem('currentUser', JSON.stringify(user));
    //           // localStorage.getItem('currentUser');   //to get the current user 
    //           alert('Login Successfully');
    //           this.routes.navigate(['/home']);
    //           console.log("this.returnUrl" + this.returnUrl);
    //       }else{
    //           alert('Invalid User Password');
    //       }
    //   }
    //   else{
    //           alert('Invalid User Name And Password');
    //       }
    //   },
    //   error => {
    //       throw error;
    //   });



  }


}