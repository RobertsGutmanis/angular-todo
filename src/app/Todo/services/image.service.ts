import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ImageResponse} from "../Interfaces/image-response.interface";
import {Observable} from "rxjs";

const httpOption = {
  headers: new HttpHeaders({
    'Authorization': 'TzAPTpVgBpPm1c5vz5nZ0skEGsjdDipQteTMbcJ3rmZt6elRD1QeUgAO',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor(private http: HttpClient) { }

  // Fetch 9 images from pexels API
  fetchImages(query: string): Observable<any>{
    return this.http.get<ImageResponse>(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, httpOption)
  }
}
