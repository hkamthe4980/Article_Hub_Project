import { Component } from '@angular/core';
import { ThemesService } from '../services/themes.service';
import { ArticleService } from '../services/article.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/gobal_constant';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  responseMsg: any;
  articles: any;
  searchText: string = '';

  constructor(public themeService: ThemesService,
    private articleService: ArticleService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private router: Router,
    private ngxservice: NgxUiLoaderService

  ) {
    this.ngxservice.start();
    this.tableData();
   }

  tableData() {
    this.articleService.getPublishArticle().subscribe((resp: any) => {
      this.articles = resp;
      

      this.ngxservice.stop();
    }, (err: any) => {
      this.ngxservice.stop();
      console.log(err);
      if (err.err?.message) {
        this.responseMsg = err.err?.message;


      }
      else {
        this.responseMsg = GlobalConstant.genericError;

      }
      this.snackBarService.openSnackBar(this.responseMsg);

    })
  }

  filterdItems(): any {
    return this.articles?.filter(item =>
      item.title.toLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      item.categoryName.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))

  }

  changeTheme(theme: any) {
    this.themeService.setTheme(theme);
  }
  handleViewAction(value:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      action : 'Edit',
      data:value
        };
    dialogConfig.width = "850px";
    const dialogRef = this .dialog.open(ArticleDetailComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    })
  }
}
