import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material_module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersComponent } from './dialog/users/users.component';
import { ThemesService } from '../services/themes.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { MatTableModule } from '@angular/material/table';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { ArticleComponent } from './dialog/article/article.component';
import { ViewArticleComponent } from './dialog/view-article/view-article.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HelpDetailsComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    UsersComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageArticleComponent,
    ArticleComponent,
    ViewArticleComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    QuillModule.forRoot(),
    SharedModule
    
  ],
  providers:[
    [ThemesService]

  ]
})
export class AdminModule { 
  
}
