import { MapServices } from '@/services/map.services/map.services';
import mapboxgl, { AnyLayer, LngLat, LngLatLike, Map, Marker } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { MapStyles } from './MapStyle';

interface IMapboxMap {
  center: LngLatLike;
  marker?: LngLat;
  onMapChangeMarker?: Function;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const MapboxMap = ({ marker, center, onMapChangeMarker }: IMapboxMap) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<Map | null> = useRef(null);
  const [listMarkers, setListMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    marker && addMarkerToMap(marker);
  }, [marker]);

  const addMarkerToMap = (markerSelected: LngLat, isChange?: boolean) => {
    setLoading(true);

    // Xóa tất cả marker
    listMarkers.forEach((m) => {
      m.remove();
    });
    setListMarkers([]);

    const mapServices = new MapServices();

    const { lng, lat } = markerSelected;

    mapServices.reverseGeocoding(lng, lat).then((res) => {
      if (res.length > 0 && onMapChangeMarker) {
        isChange && onMapChangeMarker(res[0]);
        if (map.current) {
          map.current.flyTo({
            center: markerSelected,
            essential: true,
            zoom: 17,
            pitch: 55,
          });
          // Thêm marker mới vào map
          const newMarker = new mapboxgl.Marker()
            .setLngLat(markerSelected)
            .addTo(map.current);
          // setListMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          const temp = listMarkers;
          temp.push(newMarker);
          setListMarkers(temp);
        }
        setLoading(false);
        return;
      }
      setLoading(false);

      return res;
    });
  };

  useEffect(() => {
    setLoading(true);

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center, // Set initial longitude and latitude
        zoom: 10, // Set initial zoom level
      });

      const navigationControl = new mapboxgl.NavigationControl();
      map.current.addControl(navigationControl, 'bottom-right');

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      map.current.addControl(geolocateControl, 'bottom-right');

      geolocateControl.on('geolocate', (e: any) => {
        const { latitude, longitude } = e.coords;
        const lngLat = new mapboxgl.LngLat(longitude, latitude);
        addMarkerToMap(lngLat, true);
      });
      marker && new mapboxgl.Marker().setLngLat(marker).addTo(map.current);

      map.current.on('click', (e) => {
        const lngLat = new mapboxgl.LngLat(e.lngLat.lng, e.lngLat.lat);
        addMarkerToMap(lngLat, true);
      });
      map.current.on('load', () => {
        map.current?.addLayer(MapStyles as AnyLayer);
        setLoading(false);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }}>
      {loading && (
        <div className="absolute bg-opacity-60 bg-white h-full w-full flex items-center justify-center z-[999]">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
