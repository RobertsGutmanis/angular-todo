import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {mockData} from '../../../Mocks/mock-api-data'
import {ImageResponse} from "../Interfaces/image-response.interface";
import {ImageService} from "./image.service";

describe("Tests API GET method", async () => {
  let httpClient: HttpClient;

  const MockData = mockData;
  let imageService: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService, HttpClient]
    });
    TestBed.inject(ImageService);
    httpClient = TestBed.inject(HttpClient);
    imageService = new ImageService(httpClient);
  })

  it("should return data on service method call", (): void=>{
    imageService.fetchImages("cat").subscribe({
      next: (data: ImageResponse):void=>{
        console.log("test")
      }
    })
  })
  it("should return error on empty query", ()=>{

  })
  // it("Should return data", () => {
  //   httpClient.get<ImageResponse>(APIurl, httpOption).subscribe({
  //     next: (data: ImageResponse) => {
  //       expect(data).toEqual(MockData)
  //     }
  //   })
  //
  //   const req = httpClientTestingController.expectOne(APIurl)
  //   expect(req.request.method).toEqual('GET')
  //
  //   req.flush(MockData)
  //
  // })
  //
  // it("Should handle empty query", () => {
  //   httpClient.get<ImageResponse>(`${environment.ApiEndpoint}`, httpOption).subscribe({
  //     next: (data: ImageResponse): void => {
  //       expect(data.total_results).toBeUndefined()
  //     }
  //   })
  //   const req = httpClientTestingController.expectOne(`${environment.ApiEndpoint}`)
  //   req.flush("");
  // })
  //
  // it('can handle network error', () => {
  //   const mockError = new ProgressEvent('error')
  //   httpClient.get<ImageResponse>(APIurl).subscribe({
  //     next: () => fail("Should have failed with network error"),
  //     error: (error: HttpErrorResponse) => {
  //       expect(error.error).toBe(mockError)
  //     }
  //   })
  //   const req = httpClientTestingController.expectOne(APIurl)
  //   req.error(mockError)
  // })
  // afterEach(() => {
  //   httpClientTestingController.verify()
  // });
})
