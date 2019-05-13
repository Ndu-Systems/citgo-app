import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {


  constructor(private http: HttpClient) {}

  getClientDocuments(ClientId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/documents/get-client-documents.php?ClientId=${ClientId}`);
  }
 


}
