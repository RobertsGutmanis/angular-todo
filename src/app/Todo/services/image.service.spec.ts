import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { ImageService } from './image.service'
import { ImageResponse } from '../Interfaces/image-response.interface';
import { environment } from '../../../environments/environment.prod'
import {mockData} from "../../../Mocks/mock-api-data";
import {HttpErrorResponse} from "@angular/common/http";

const mockResponse: ImageResponse = mockData
describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable', () : void => {
    service.fetchImages('test').subscribe((images: ImageResponse): void => {
      expect(images).toBe(mockData);
    });

    const req: TestRequest = httpMock.expectOne(`${environment.ApiEndpoint}test&per_page=9`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error', () => {
    service.fetchImages('').subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error: HttpErrorResponse) => expect(error.status).toEqual(404)
    });
    const req = httpMock.expectOne(`${environment.ApiEndpoint}&per_page=9`);
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});
