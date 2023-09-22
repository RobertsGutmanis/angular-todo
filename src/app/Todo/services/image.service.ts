import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageResponse } from '../Interfaces/image-response.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const httpOption = {
  headers: new HttpHeaders({
    Authorization: environment.Authorization,
  }),
};

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  // Fetch 9 images from pexels API
  fetchImages(query: string): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(
      `${environment.ApiEndpoint}${query}&per_page=9`,
      httpOption
    );
  }
}
