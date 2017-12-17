import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from "../../../../services/login.service";
import { AdminService } from "../../../../services/admin.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  signupForm:FormGroup;
  index_signup:string;
  password_signup:string="123";
  firstname_signup:string;
  lastname_signup:string;
  type_signup:string;
  post:any;
  error:boolean=false;
  error_message:string="";

  titleAlert:string = 'This Field is Required';

  constructor(private adminService:AdminService,private loginService:LoginService, private router:Router, private formBuilder:FormBuilder) {
    this.index_signup="";
    this.password_signup="123";
    this.firstname_signup="";
    this.lastname_signup="";
    this.type_signup="Student";
    this.signupForm=formBuilder.group({
        "index_signup":[null, Validators.required],
        "firstname_signup":[null,Validators.required],
        "lastname_signup":[null,Validators.required],
        "type_signup":[null,Validators.required]
    });
}

ngOnInit() {
}

  signup(post){
      this.index_signup=post.index_signup;
      this.password_signup="123";
      this.firstname_signup=post.firstname_signup;
      this.lastname_signup=post.lastname_signup;
      this.type_signup=post.type_signup;
      console.log(post.type_signup);
      this.adminService.signup(this.index_signup,this.password_signup,this.firstname_signup,this.lastname_signup,this.type_signup).subscribe(
          res=>{
            this.error=!this.error;
            this.error_message="User Created Successfully";
            console.log(res);
          },
          error=>{
            this.error=!this.error;
            this.error_message="There is an Error in the data You Input";
            console.log(this.error_message);
          }
      );
  }

  goBack(){
      this.router.navigate(["admin/home"]);
  }

}
