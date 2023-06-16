import { MapServices } from '@/services/map.services/map.services';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

const MapboxMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<Map | null> = useRef(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const handleMapClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    markers.forEach((marker) => {
      marker.remove();
    });
    setMarkers([]);

    if (map.current) {
      const mapServices = new MapServices();

      mapServices.reverseGeocoding(e.lngLat.lng, e.lngLat.lat).then((res) => {
        console.log(res);

        return res;
      });

      const newMarker = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current);
      const temp = markers;
      temp.push(newMarker);
      setMarkers(temp);
    }
  };

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // Set initial longitude and latitude
        zoom: 1, // Set initial zoom level
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
        console.log('User Location:', latitude, longitude);
      });

      map.current.on('click', (e) => {
        handleMapClick(e);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default MapboxMap;
