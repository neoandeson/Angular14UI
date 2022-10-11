import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private tokenKey = 'token';
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.controls['email'].setValue('email@yom.com');
    this.loginForm.controls['password'].setValue('pass123@');
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) => {
          this.loginForm.reset();
          localStorage.setItem(this.tokenKey, res.token);
          this.router.navigate(['dashboard']);
          alert(res.message);

        },
        error:(err)=>{
          alert(err?.error.message)
        }
      });
    } else {
      //throw the error using toaster an tiwht required fields
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }
  
}
