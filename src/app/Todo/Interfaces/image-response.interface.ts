import { PhotosReponse } from './photos-response.interface';

export interface ImageResponse {
  next_page: string;
  page: number;
  per_page: number;
  photos: PhotosReponse[];
  total_results: number;
}
