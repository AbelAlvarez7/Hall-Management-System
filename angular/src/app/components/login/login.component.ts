import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm:FormGroup;
  index_signin:string;
  password_signin:string;
  post:any;
  error:boolean=false;
  users:{ indexno:string,
          password:string,
          type:string
  };          
  titleAlert:string = 'This Field is Required';
  error_message="";

  constructor(private loginService:LoginService, private router:Router, private formBuilder:FormBuilder) { 
   
      this.index_signin="";
      this.password_signin="";
      
  
    this.signinForm=formBuilder.group({
      "index_signin":[null, Validators.required],
      "password_signin":[null,Validators.required]
    });
  }

  ngOnInit() {
  }

  login(post){
    this.index_signin=post.index_signin;
    this.password_signin=post.password_signin;
    this.loginService.login(this.index_signin,this.password_signin).subscribe(users=>{
      this.users=users;
      this.loginService.setIndex(this.users.indexno);
      if(this.users.type=="student"){
        this.router.navigate(["user/profile"]);
      }else if(this.users.type=="admin"){
        this.router.navigate(["admin"]);
      }
    },
    error=>{
      this.error=!this.error;
      this.error_message="Your Credentials Do not Match";
      console.log(this.error_message);
    }
  );
  }
}

