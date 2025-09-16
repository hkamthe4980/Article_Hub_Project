import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemesService } from '../../../services/themes.service';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  onEmitStatusChanege = new EventEmitter();
  details : any ={};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
public themeService:ThemesService){}


ngOnInit(): void {
  if(this.dialogData){
    this.details = this.dialogData
  }
}

handleChangeAction(){
  this.onEmitStatusChanege.emit();
}





}
