import {PhotosSrc} from "./photos-src.interface";

export interface PhotosReponse{
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: PhotosSrc;
  url: string;
  width: number;
}
