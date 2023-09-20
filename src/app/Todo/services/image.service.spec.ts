import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {mockData} from '../../../Mocks/mock-api-data'
import {ImageResponse} from "../Interfaces/image-response.interface";
import {environment} from "../../../environments/environment";

describe("Tests API GET method", () => {
  let httpClient: HttpClient;
  let httpClientTestingController: HttpTestingController;

  const httpOption = {
    headers: new HttpHeaders({
      'Authorization': environment.Authorization,
    })
  }
  const APIurl = `${environment.ApiEndpoint}$test&per_page=1`
  const MockData = mockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    httpClient = TestBed.inject(HttpClient)
    httpClientTestingController = TestBed.inject(HttpTestingController)
  })

  let responseData: ImageResponse;
  it("Should return data", () => {
    httpClient.get<ImageResponse>(APIurl, httpOption).subscribe({
      next: (data: ImageResponse) => {
        expect(data).toEqual(MockData)
      }
    })

    const req = httpClientTestingController.expectOne(APIurl)
    expect(req.request.method).toEqual('GET')

    req.flush(MockData)

  })

  // it("can handle 404", ()=>{
  //   const errormsg = "Images not found"
  //   httpClient.get<ImageResponse>(APIurl, httpOption).subscribe({
  //     next: ()=>fail("Should fail with 404"),
  //     error: (error: HttpErrorResponse) =>{
  //       expect(error.status).withContext('status').toEqual(404)
  //       expect(error.error).withContext('message').toEqual(errormsg)
  //     }
  //   })
  //
  //   const req = httpClientTestingController.expectOne(APIurl)
  //   req.flush(errormsg, {status: 404, statusText: 'Not found'})
  // })

  it("Should handle empty query", () => {
    httpClient.get<ImageResponse>(`${environment.ApiEndpoint}`, httpOption).subscribe({
      next: (data: ImageResponse): void => {
        expect(data.total_results).toBeUndefined()
      }
    })
    const req = httpClientTestingController.expectOne(`${environment.ApiEndpoint}`)
    req.flush("");
  })

  it('can handle network error', () => {
    const mockError = new ProgressEvent('error')
    httpClient.get<ImageResponse>(APIurl).subscribe({
      next: () => fail("Should have failed with network error"),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError)
      }
    })
    const req = httpClientTestingController.expectOne(APIurl)
    req.error(mockError)
  })
  afterEach(() => {
    httpClientTestingController.verify()
  });
})
