import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  apiUrl = environment.apiUrl;


  dataTitle = new BehaviorSubject(null);
  currentdataTitle = this.dataTitle.asObservable();
  dataSubTitle = new BehaviorSubject(null);
  currentdataSubTitle = this.dataSubTitle.asObservable();
  dataBackTo = new BehaviorSubject(null);
  currentdataBackTo = this.dataBackTo.asObservable();

  currentLinkParam = new BehaviorSubject<any>([]);
  changeVar = this.currentLinkParam.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getStatistics():any {
    return this.http.get(this.apiUrl + 'admin/statistiques');
  }
  getChartData(filtre):any {
    return this.http.post(this.apiUrl + 'admin/pubStatistiques', { filtre: filtre } );
  }
  getRecentUsers(perPage, page):any {
    return this.http.get(this.apiUrl + 'admin/getRecentUsers/'+perPage+'?page='+page);
  }

  getUsers(data, page): any{
    return this.http.post(this.apiUrl + 'admin/getAllUsers?page='+page, data);
  }
  changeUserStatus(id): any{
    return this.http.put(this.apiUrl + 'admin/activateDesactivateAccount/'+id, id);
  }
  sendAlert(data){
    return this.http.post(this.apiUrl + 'admin/sendAlert/'+data.email, data);
  }

  getReports(data, page, type): any{
    let api;
    switch(type){
      case 'PROJECTS': api = 'getAllProjectsReports'; break;
      case 'PROFILES': api = 'getAllUsersReports'; break;
      case 'JOBS': api = 'getAllJobReports'; break;
      case 'PUBLICATIONS': api = 'getAllPostReports'; break;
    }
    return this.http.post(this.apiUrl + 'admin/'+ api +'?page='+page, data);
  }

  archive(data): any{
    return this.http.put(this.apiUrl + 'admin/addReportToArchive', data);
  }

  getReport(data): any{
    return this.http.post(this.apiUrl + 'admin/showReport', data);
  }

  getInvoices(data, page): any{
    return this.http.post(this.apiUrl + 'admin/getAllInvoices?page='+page, data);
  }

  downloadInvoices(data){
    return this.http.post(this.apiUrl + 'admin/downloadAllInvoices', data, {responseType: 'blob' as 'json'} );
  }

  verifyCodePromo(code, subscription_type):any{
    return this.http.post(this.apiUrl + 'admin/verifyPromoCode', {
      codePromo: code,
      subscription_type: subscription_type
    });
  }

}
