import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemesService } from '../../../services/themes.service';

@Component({
  selector: 'app-view-article',
  standalone: false,
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']  // ✅ fixed 'styleUrls'
})
export class ViewArticleComponent implements OnInit {  // ✅ implements OnInit
  article: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public themeService: ThemesService
  ) {}

  ngOnInit(): void {
    this.article = this.dialogData.data;
  }
}
