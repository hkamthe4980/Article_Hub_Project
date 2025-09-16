import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUserService } from '../services/app-user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackBarService } from '../services/snack-bar.service';
import { ThemesService } from '../services/themes.service';
import { GlobalConstant } from '../shared/gobal_constant';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private appuserService: AppUserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackBarService,
    public themeService: ThemesService

  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }
   handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email:formData.email,
      password:formData.password
    }

    this.appuserService.login(data).subscribe((resp:any)=>{
      this.ngxService.stop();
      localStorage.setItem('token',resp.token);
      this.router.navigate(['/articleHub'])
    },(err)=>{
      console.log(err);
      this.ngxService.stop();
      if(err.err?.message){
        this.responseMessage = GlobalConstant.genericError;
      }
      else{
        this.responseMessage= GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage)
    })
   }  
   onBack(){
    this.router.navigate([''])
   }

}
