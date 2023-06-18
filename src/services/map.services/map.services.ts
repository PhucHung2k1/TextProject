import axios from 'axios';
import type { IMapBoxPlace } from './map.interface';

const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
// https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoidGFubmQiLCJhIjoiY2w5ZmduaTJvMjNoaDN3cDhoMzY5NWd0aiJ9.1yahs7z_E7plHsjJeaIIAg

export class MapServices {
  public findAddressAndPlaces = async (
    place: string
  ): Promise<IMapBoxPlace[]> => {
    const encodedUrl = encodeURI(
      `${URL}/${place}.json?&access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    const response = await axios.get(encodedUrl);

    const placeList: IMapBoxPlace[] = response.data.features;

    return placeList;
  };

  //

  public reverseGeocoding = async (
    longitude: Number,
    latitude: Number
  ): Promise<IMapBoxPlace[]> => {
    const encodedUrl = encodeURI(
      `${URL}/${longitude.toString()},${latitude.toString()}.json?&access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    const response = await axios.get(encodedUrl);

    const placeList: IMapBoxPlace[] = response.data.features;

    return placeList;
  };
}
