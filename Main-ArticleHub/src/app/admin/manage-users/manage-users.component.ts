import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';
import { AppUserService } from '../../services/app-user.service';
import { ThemesService } from '../../services/themes.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstant } from '../../shared/gobal_constant';
import { UsersComponent } from '../dialog/users/users.component';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  displayedColumns:string[]=['name','email','status','edit'];
  dataSource : any;
  responseMessage :any;
  constructor(private ngxService : NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService : SnackBarService,
    private router : Router,
    private appuserService : AppUserService,
    public themeService : ThemesService
    ){}
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.appuserService.getAllAppUser().subscribe((res:any)=>{
       this.ngxService.stop();
       this.dataSource = new MatTableDataSource(res);

    },(err:any)=>{
      this.ngxService.stop()
      console.log(err);
      if(err.err?.message){
        this.responseMessage = err.err?.message;
      }
      else{
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage)
    })

  }


  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  handleAddAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    };

    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
   const res = dialogRef.componentInstance.onAddUser.subscribe((resp)=>{
    this.tableData();
   })

    
  }
    handleEditAction(values:any){
      const dialogConfig= new MatDialogConfig();
      dialogConfig.data={
        action:'Edit',
        data:values
      };
  
      dialogConfig.width="850px";
      const dialogRef = this.dialog.open(UsersComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
     const res = dialogRef.componentInstance.onEditUser.subscribe((res)=>{
      this.tableData();
     })
  
    }
    onChange(status:any,id:any){
      this.ngxService.start()
      var data ={
        id:id,
        status:status.toString()
      }
      console.log('Data sent to API:', data); 
      this.appuserService.updateUserStatus(data).subscribe((res:any)=>{
        console.log("response msg ",res);
        this.ngxService.stop();
        this.responseMessage = res?.res?.message|| 'Status updated successfully';
        this.snackbarService.openSnackBar(this.responseMessage);
        this.tableData();
      },(err:any)=>{
        this.ngxService.stop()
        console.log('Api err',err);
        if(err.err?.message){
          this.responseMessage = err.err?.message;
        }
        else{
          this.responseMessage = GlobalConstant.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage)
      })
    }

  
  



}
