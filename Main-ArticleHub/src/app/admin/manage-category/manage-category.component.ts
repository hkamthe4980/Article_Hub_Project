import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';
import { ThemesService } from '../../services/themes.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstant } from '../../shared/gobal_constant';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  standalone: false,
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit{
  displayedColumns: string[] = ['name', 'edit'];

 
  responseMessage :any;
  dataSource:any

  constructor(private categoryService : CategoryService,
    private ngxService:NgxUiLoaderService,
    private dialog :MatDialog,
    private snackBarService : SnackBarService,
    private router : Router,
    public themeService : ThemesService

  ){}
  ngOnInit():void{
    this.ngxService.start();
    this.tableData();

  }
  tableData(){
    this.categoryService.getAllCategory().subscribe((resp:any)=>{
      this.ngxService.stop();

      this.dataSource= new MatTableDataSource(resp);

    },(err:any)=>{
      this.ngxService.stop();
      console.log(err);
      if(err.err?.message){
        this.responseMessage=err?.err?.message;

      }
      else{
        this.responseMessage = GlobalConstant.genericError;

      }
      this.snackBarService.openSnackBar(this.responseMessage)


    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
  handleAddAction (){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add',
      
    };
    dialogConfig.width="850px";
    const dialogRef =this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe((resp:any)=>{
      this.tableData();

    })

  }
  handleEditAction(values:any){

  }
}
