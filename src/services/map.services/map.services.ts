import axios from 'axios';
import type { IMapBoxPlace } from './map.interface';

const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

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
