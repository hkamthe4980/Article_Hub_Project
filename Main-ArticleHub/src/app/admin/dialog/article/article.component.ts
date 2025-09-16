import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from '../../../services/snack-bar.service';
import { ThemesService } from '../../../services/themes.service';
import { ArticleService } from '../../../services/article.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../../../shared/gobal_constant';

@Component({
  selector: 'app-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();
  articleForm: any = FormGroup;
  dialogAction: any = "Add";

  category: any;
  responseMessage: any;
  action: any = "Update";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    private snackbarService: SnackBarService,
    public themeService: ThemesService,
    private articleService: ArticleService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void  {
    this.articleForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
    this.dialogAction = this.dialogData?.action;
  
    if (this.dialogAction  === 'Edit') {
      this.action = 'Update';
      this.articleForm.patchValue(this.dialogData.data);
    } else {
      this.action = 'Add';
    }
  
    this.getAllCategory();
    this.ngxService.start();

  }

 
  
  getAllCategory() {

    this.categoryService.getAllCategory().subscribe((resp: any) => {
      this.category = resp;
      this.ngxService.stop();
    }, (err: any) => {
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responseMessage = err.err?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;

        this.snackbarService.openSnackBar(this.responseMessage);
      }
    })


  }

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();

    }
    else {
      this.add()

    }
  }

  add() {
    this.ngxService.start();

    var formData = this.articleForm.value;
    var data = {
      title : formData .title ,
      content : formData.content,
      categoryId: formData.categoryId,
      status: formData.status
    }

    this.articleService.addNewArticle(data).subscribe((resp:any)=>{
      this.dialogRef.close();
      this.ngxService.stop();
      this.onAddArticle.emit();
      this.responseMessage=resp.message;
      this.snackbarService.openSnackBar(this.responseMessage)
    },(err:any)=>{
      this.dialogRef.close();
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responseMessage = err.err?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;

        this.snackbarService.openSnackBar(this.responseMessage);
      }

    })


  }
  edit() {
    
    this.ngxService.start();

    var formData = this.articleForm.value;
    var data = {
      id:this.dialogData.data.id,
      title : formData .title ,
      content : formData.content,
      categoryId: formData.categoryId,
      status: formData.status
    }

    this.articleService.updateArticle(data).subscribe((resp:any)=>{
      this.dialogRef.close();
      this.ngxService.stop();
      this.onEditArticle.emit(data);
      this.responseMessage=resp.message;
      this.snackbarService.openSnackBar(this.responseMessage)
    },(err:any)=>{
      this.dialogRef.close();
      this.ngxService.stop();
      console.log(err);
      if (err.err?.message) {
        this.responseMessage = err.err?.message;
      }
      else {
        this.responseMessage = GlobalConstant.genericError;

        this.snackbarService.openSnackBar(this.responseMessage);
      }

    })

  }



}


