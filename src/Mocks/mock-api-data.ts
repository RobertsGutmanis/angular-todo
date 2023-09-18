import {ImageResponse} from "../app/Todo/Interfaces/image-response.interface";

export const mockData: ImageResponse = {
  page: 1,
  per_page: 1,
  total_results: 8000,
  next_page: "https://api.pexels.com/v1/search/?page=2&per_page=1&query=%24cat",
  photos: [
    {
      id: 18287650,
      width: 5184,
      height: 3888,
      url: "https://www.pexels.com/photo/cute-black-kitten-lying-on-windowsill-18287650/",
      photographer: "Lisa Fotios",
      photographer_url: "https://www.pexels.com/@fotios-photos",
      photographer_id: 26735,
      avg_color: "#AAA9AE",
      src: {
        original: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg",
        large2x: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&h=350",
        small: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/18287650/pexels-photo-18287650.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      liked: false,
      alt: "Free stock photo of black cat, cat, kitten"
    },
  ],
}
