import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from './shared/material_module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import{NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER} from'ngx-ui-loader';
import { HomeComponent } from './home/home.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component'
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';
import { ThemesService } from './services/themes.service';
import { MatTableModule } from '@angular/material/table';
import { QuillModule } from 'ngx-quill';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe'
import { SharedModule } from './shared/shared.module';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:"Loading",
  textColor:"white",
  textPosition:"center-center",
  pbColor:"white",
  bgsColor:"white",
  fgsColor:"white",
  fgsType:SPINNER.ballSpinClockwise,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5

};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    MatToolbar,
    ReactiveFormsModule,
    MatTableModule,
    QuillModule.forRoot(),
    
    
    

   
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SharedModule

   
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    ThemesService
    
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
