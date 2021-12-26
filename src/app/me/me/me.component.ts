import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { hasInlineLoader, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmationComponent } from 'src/app/shared/dialogs/confirmation/confirmation.component';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { environment } from 'src/environments/environment.prod';
import {ENTER} from '@angular/cdk/keycodes';
import { TokenService } from 'src/app/shared/services/token.service';
import { CurrentPageService } from 'src/app/shared/services/current-page.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'fields'
    }
  ]
})

export class MeComponent implements OnInit {

  profileSlug: string;
  profileId: string;
  profile = null;
  profileReferences = [];
  profileImgUrl = environment.profileImgUrl;
  referenceImgUrl = environment.referenceImgUrl;
  currentPage = 1;
  perPage = 6;

  informationsFormSaving = false;
  profileImagePath: any;
  profileImageProgress = 0;

  informationsForm = new FormGroup({
    company_name: new FormControl('', Validators.required),
    presentation: new FormControl(''),
    vat: new FormControl('', Validators.required),
    tel: new FormControl(''),
    website: new FormControl(''),
    contact_email: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    linkedin: new FormControl(''),
  }); 

  /*
  allSupSkills = [];
  supSkills: any;
  suppSkills = new FormControl('', Validators.required);
  */

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER];
  competenceCtrl = new FormControl();
  filteredCompetences: Observable<string[]>;
  competencesList: any = [

  ];
  allCompetences = [];

  @ViewChild('competenceInput') competenceInput: ElementRef;
  token = "hasInlineLoader";
  constructor(
    private profileS: ProfileService,
    private dialog: MatDialog,
    private tokenS: TokenService,
    private authService: AuthService,
    private currentPageS: CurrentPageService
    //@Inject(localStorage) private localStorage
  ) { }

  ngOnInit(): void {
    this.token = this.tokenS.get();
  
    console.log( 'the token value is: ', this.token);
    this.currentPageS.meCurrentLink.next('me');
    this.getCompetences();
    this.profileSlug = this.tokenS.getSlug();
    this.profileId = this.tokenS.getId();
    this.getProfileInfo();
    this.getProfileReferences();
    /*this.suppSkills.valueChanges.subscribe(data => this.getSkillsUsingCodeNace())*/
  }

/*
  getSkillsUsingCodeNace() {
    this.supSkills = null;
    let index = this.allSupSkills.findIndex(elem => elem.codeNace.code == this.suppSkills.value);
    if (index >= 0) {
      this.supSkills = this.allSupSkills[index];
    }
    else {
      this.authService.getSkillsUsingCodeNace(this.suppSkills.value).subscribe(
        data => {
          if (data) {
            this.allSupSkills.push(data);
            this.supSkills = data;
          }
        }
      )
    }
  }
  */

  getProfileInfo(){
    this.profileS.about(this.profileId).subscribe(
      data => {
        this.profile = data.data;
        this.competencesList = this.profile.competenceUser.additionalCompetences;
      },
      error => {},
      () => {
        this.informationsForm.patchValue(this.profile);
        this.informationsForm.patchValue(this.profile.socialMedia);
      }
    )
  }

  getProfileReferences(){
    this.profileS.references(this.profileId, this.perPage ,  this.currentPage).subscribe(
      data => {
        this.profileReferences = data;
      },
      error => { console.log(error) },
      () => {}
    )
  }
 

  onInformationsFormSubmit(){
    if(this.informationsForm.valid){
      this.informationsFormSaving = true;
      this.profileS.update( this.informationsForm.value ).subscribe(
        data => { this.informationsFormSaving = false },
        error => { this.informationsFormSaving = false },
        () => {  }
      )
    }
  }

  navigateTo(page){
    this.currentPage = page;
    this.getProfileReferences();
  }
 
  
  onDeleteReference(id){
    const dialog = this.dialog.open( ConfirmationComponent , {
      data : {
        title: 'Lorem ipsum dolor',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, culpa.',
        confirmBtn: 'YES',
        cancelBtn: 'NO' 
      },
      width: '400px',
      height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.deleteReference(id);
      }
    })

  }

  deleteReference(id){
    this.profileS.deleteReference(id).subscribe(
      data => {},
      error => {},
      () => { this.getProfileReferences() }
    )
  }

  onDeleteProfilePicture(){
    const dialog = this.dialog.open( ConfirmationComponent , {
      data : {
        title: 'Lorem ipsum dolor',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, culpa.',
        confirmBtn: 'YES',
        cancelBtn: 'NO' 
      },
      width: '400px',
      height: 'auto',
      disableClose: true
    });

    dialog.afterClosed().subscribe(result => {
      if(result && result.confirm){
        this.profileS.deleteProfilePicture().subscribe(
          data => {},
          error => {},
          () => {
            this.profileS.profilePicture.next('no-picture.jpg');
            this.profileImagePath = this.profileImgUrl + "no-picture.jpg";
          }
        );
      }
    })
  }

  onEditProfilePicture(event){ 
    let file = event.target.files[0];
    if (file) { 
        this.uploadProfilePicture(file);
        const reader = new FileReader();
        reader.onload = (e:any) => {
          this.profileImagePath  = reader.result as string;
        }
        reader.readAsDataURL(file);
      }
  }

  uploadProfilePicture(file){
    this.profileImageProgress = 0;
    if (file) {
      this.profileS.updateProfilePicture(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.profileImageProgress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.profileS.profilePicture.next(event.body.imageName);
          }
        },
        (err: any) => {
          this.profileImageProgress = 0;
          //console.log('Could not upload the file: ' + file.name);
        },
        () => {
          
        }
        );
        
    }
    
  }

  onUpdateCompetence(){
    this.profileS.addCompetances({supCompetences: this.competencesList}).subscribe(
      data => { 
        this.getProfileInfo();
        //this.getSkillsUsingCodeNace();
      }
    )
  }


  getCompetences(){
    let result;
    this.profileS.getAllCompetences().subscribe(
      data => { result = data },
      error => {},
      () => {
        this.allCompetences = result.data;
        this.filteredCompetences = this.competenceCtrl.valueChanges.pipe(
          startWith(null),
          map((competence: string | null) =>
          competence ? this._filter(competence) : this.allCompetences.slice()
          )
        );
      }
    )
  }

  add(event: MatChipInputEvent): void {
    //debugger;
    const input = event.input;
    const value = event.value;
    // Add our competence
    if ((value || '').trim()) {
      this.competencesList.push({
        id: Math.random(),
        name: value.trim()
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.competenceCtrl.setValue(null);
  }

  remove(competence, indx): void {
    this.competencesList.splice(indx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.competencesList.push(event.option.value);
    this.competenceInput.nativeElement.value = '';
    this.competenceCtrl.setValue(null);
  }

  private _filter(value: any): any[] { 
    if(value.length){
      return this.allCompetences.filter(competence =>
        competence.name.toLowerCase().includes(value.toLowerCase())
      );  
    }
    
  }
 


}
