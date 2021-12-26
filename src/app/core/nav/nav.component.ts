import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  role: string = '';

  @Output() menuStatusChanged: EventEmitter<any> = new EventEmitter<boolean>();
  @Output() phoneMenuStatus: EventEmitter<any> = new EventEmitter<boolean>();
 
  

  constructor(
    private tokenS: TokenService
  ) {
    this.role = this.tokenS.getRole();
  }

  ngOnInit(): void {}

  menuStatusChange(opened){
    this.menuStatusChanged.emit(opened);
  }

  onPhoneMenuTogel(opened){
    this.phoneMenuStatus.emit(opened);
  }
 


  
}
