import { Component, Input, OnInit } from '@angular/core';
import { CurrentPageService } from 'src/app/shared/services/current-page.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-my-profile-menu',
  templateUrl: './my-profile-menu.component.html',
  styleUrls: ['./../profile-menu/profile-menu.component.scss']
})
export class MyProfileMenuComponent implements OnInit {

  @Input() profile;
  profileImgUrl = environment.profileImgUrl;
  activeLink = "";
  
  constructor(
    private profileS: ProfileService,
    private currentPageS: CurrentPageService
  ) { }

  ngOnInit(): void {
    this.currentPageS.newMeCurrentLink.subscribe(
      data => { if(data) this.activeLink = data }
    )
  }

  onChange(){
    //if(this.profile) console.log(this.profile.profile_picture);
  }

}
