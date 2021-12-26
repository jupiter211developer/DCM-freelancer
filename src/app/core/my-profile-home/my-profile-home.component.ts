import { ProfileService } from './../../shared/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { CurrentPageService } from 'src/app/shared/services/current-page.service';

@Component({
  selector: 'app-my-profile-home',
  templateUrl: './my-profile-home.component.html',
  styleUrls: ['./my-profile-home.component.scss']
})
export class MyProfileHomeComponent implements OnInit {

  
  profileSlug: string;
  profileId: any;
  profile: any;

  opened: boolean;
  phoneMenu: boolean = false;

 
  constructor(
    private profileS: ProfileService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private tokenS: TokenService,
    private currentPageS: CurrentPageService
  ) {
    this.route.paramMap.subscribe(params => {
      //this.profileSlug = params.get('profile');
    });

  }

  ngOnInit(): void {
    this.currentPageS.meCurrentLink.next('');
    this.currentPageS.currentLink.next('');
    this.profileSlug = this.tokenS.getSlug();
    this.profileS.newProfilePicture.subscribe(
      data => { if(data) this.profile.profile_picture = data }
    )
    this.getIdFromSlug();
  }

  getIdFromSlug(){
    let rdata;
    this.profileS.idFromSlug(this.profileSlug).subscribe(
      data => {
        rdata = data;
        this.profileId = rdata.id;
      },
      error =>{ console.log(error) },
      () => {
        this.getProfileInfo();
      }
    )
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
  
 
  setRouter(path){
    this.router.navigateByUrl(path);
  }

  menuStatusChange(opened){
    this.opened = opened;
  }

  phoneMenuStatus(opened){
    this.phoneMenu = opened;
  }

}
