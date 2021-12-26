import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotConnectedComponent } from 'src/app/shared/dialogs/not-connected/not-connected.component';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  @Input() profile;
  activeLink = '';

  constructor(
    private profileS: ProfileService,
    private tokenS: TokenService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  followProfile(){
    if( this.tokenS.loggedIn() ){
      this.profileS.follow(this.profile.id).subscribe(
        data => {
          this.profile.follow = data.follow;
        },
        error => {},
        () => {}
      )
    }else{
      this.showAuthentificationMessage();
    }
  }

  likeProfile(){
    if( this.tokenS.loggedIn() ){
      this.profileS.like(this.profile.id).subscribe(
        data => {
          this.profile.like = data.like;
        },
        error => {},
        () => {}
      )
    }else{
      this.showAuthentificationMessage();
    }
  }

  showAuthentificationMessage(){
    const dialog = this.dialog.open( NotConnectedComponent , {
      data : {
        title: 'Votre compte Meet&build',
        content: "Pour effectuer cette action vous devez avoir un compte et être identifié sur le site.",
        confirmBtn: 'Inscription',
        cancelBtn: 'Se connecter' 
      },
      width: '500px',
      height: 'auto',
    });
    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
          
      }
    })
  }

}
