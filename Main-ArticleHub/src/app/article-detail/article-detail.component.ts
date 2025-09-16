import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemesService } from '../services/themes.service';

@Component({
  selector: 'app-article-detail',
  standalone: false,
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
  articleDetails:any;

  constructor( @Inject(MAT_DIALOG_DATA) public dialogData:any,
  public themeService : ThemesService
){
  this.articleDetails = this.dialogData.data;
}

}
