import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ThemesService } from '../../../services/themes.service';
import { NgxUiLoaderBlurredDirective, NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../../../shared/gobal_constant';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snackBarService: SnackBarService,
    public themeservice: ThemesService,
    public ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.data);

    }

  }
  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    }
    else {
      this.add();
    }
  }
  add() {
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name
    }
    this.categoryService.addNewCategory(data).subscribe((resp: any)=>{
      this.dialogRef.close();
      this.ngxService.stop();
      
      this.onAddCategory.emit();
     
      this.responseMessage = resp.message;
      this.snackBarService.openSnackBar(this.responseMessage);


    }, (err: any) => {
      this.ngxService.stop();
      console.log(err);
      if (err.error?.message) {
        this.responseMessage = err.err?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage);
    })
  }
  edit() {
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name
    }
    this.categoryService.UpdateCategory(data).subscribe((resp: any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditCategory.emit();
      this.responseMessage = resp.message;
      this.snackBarService.openSnackBar(this.responseMessage);


    }, (err: any) => {
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responseMessage = err.err?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage);
    })
  }

}
