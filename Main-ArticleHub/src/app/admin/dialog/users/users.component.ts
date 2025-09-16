import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ThemesService } from '../../../services/themes.service';
import { AppUserService } from '../../../services/app-user.service';
import { GlobalConstant } from '../../../shared/gobal_constant';
import { NgxUiLoaderBlurredDirective, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  [x: string]: any;
  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  usersForm!: FormGroup;

  dialogAction: any = 'Add';
  action: any = "Add";
  responnseMessage: any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersComponent>,
    private snackBarService: SnackBarService,
    public themeService: ThemesService,
    private appUserService: AppUserService,
    private ngxService: NgxUiLoaderService) { }

    ngOnInit(): void {
      this.usersForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
        password: ['', [Validators.required]]
      });
    
      if (this.dialogData.action === "Edit") {
        this.dialogAction = "Edit";
        this.action = "Update";
        this.usersForm.patchValue(this.dialogData.data);
        this.usersForm.controls['password'].setValue('password');
      }
    }
    
  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    }
    else {
      this.add()
    }
  }


  add() {
    this.ngxService.start();
    var formData = this.usersForm.value;
    var data = {
      email: formData.email,
      name: formData.name,
      password: formData.password
    }


    this.appUserService.addNewAppUser(data).subscribe((res: any)=>{
      this.dialogRef.close();
      this.onAddUser.emit();
      this.responnseMessage = res.message;
      this.snackBarService.openSnackBar(this.responnseMessage);
    

    }, (err:any) => {
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responnseMessage = err.err?.message;
      }
      
      
      else {
        this.responnseMessage = GlobalConstant.genericError;

      }
      this.snackBarService.openSnackBar(this.responnseMessage);

    })
  }



  edit() {
    this.ngxService.start();
    var formData = this.usersForm.value;
    var data = {
      email: formData.email,
      name: formData.name,
      id: this.dialogData.data.id
    }


    this.appUserService.updateUser(data).subscribe((res: any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responnseMessage = res.message || "Operation Successful";

      this.snackBarService.openSnackBar(this.responnseMessage);
    }, (err) => {
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responnseMessage = err.err?.message;
      }
      else {
        this.responnseMessage = GlobalConstant.genericError;

      }
      this.snackBarService.openSnackBar(this.responnseMessage);

    })
  }

}
