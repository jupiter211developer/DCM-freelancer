import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  profile = null;
  profileImgUrl = environment.profileImgUrl;
  profileId: string;

  constructor(
    private tokenS: TokenService,
    private router: Router,
    private profileS: ProfileService
  ) {
    this.profileId = this.tokenS.getId();
  }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  logOut(){
    this.tokenS.remove();
    this.router.navigateByUrl('/login');
  }

  getProfileInfo(){
    this.profileS.about(this.profileId).subscribe(
      data => {
        this.profile = data.data;
      },
      error =>{},
      () => {
        
      }
    )
  }



}
