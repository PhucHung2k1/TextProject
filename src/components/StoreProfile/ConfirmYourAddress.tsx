/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import debounce from 'lodash.debounce';
import MapboxMap from '@/common/MapBox/MapBoxMap';
import type { IMapBoxPlace } from '@/services/map.services/map.interface';
import { MapServices } from '@/services/map.services/map.services';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Search } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import type { LngLat } from 'react-map-gl';

import { handlePreviousProgressSetupStore } from './helper';
import { sxTextField } from '@/utils/helper/styles';
import AddYourLocation from './AddYourLocation';
import { updateLocationStoreProfile } from '@/store/store/storeAction';
import mapboxgl from 'mapbox-gl';
import Cookies from 'js-cookie';

const ConfirmYourAddress = () => {
  const dispatch = useAppDispatch();
  const [showAddYourLocation, setShowAddYourLocation] =
    useState<boolean>(false);
  const mapServices = new MapServices();

  const [listPlace, setListPlace] = useState<IMapBoxPlace[]>([]);
  const curStoreCustomerId = Cookies.get('store-customer');
  const curStoreCustomer = useAppSelector(
    (state) => state.storeSlice.storeCustomer
  ).find((store) => store.Id === curStoreCustomerId);
  const lngStore = Number(curStoreCustomer?.GeoLongitude);
  const latStore = Number(curStoreCustomer?.GeoLatitude);

  const [marker, setMarkers] = useState<LngLat>(
    new mapboxgl.LngLat(lngStore, latStore)
  );

  const [yourAddress, setYourAddress] = useState<IMapBoxPlace | null>(null);
  const handleSearchMap = debounce(
    async (value: string, event?: SyntheticEvent<Element, Event>) => {
      if (event) {
        mapServices.findAddressAndPlaces(value).then((res) => {
          setListPlace(res);
        });
      }
    },
    800
  );

  const handleUpdateAddress = () => {
    dispatch(
      updateLocationStoreProfile({
        id: curStoreCustomer?.Id || '',
        body: [
          {
            op: 'replace',
            path: `/GeoLongitude`,
            value: marker?.lng,
          },
          {
            op: 'replace',
            path: `/GeoLatitude`,
            value: marker?.lat,
          },
        ],
      })
    );
  };

  useEffect(() => {
    const defaultYourAddress = mapServices.reverseGeocoding(lngStore, latStore);
    defaultYourAddress.then((res) => {
      const value = res[0];
      if (
        value &&
        value.geometry &&
        value.geometry.coordinates &&
        typeof value.geometry.coordinates[0] === 'number' &&
        typeof value.geometry.coordinates[1] === 'number'
      ) {
        setYourAddress(value);
      }
    });
  }, []);
  return (
    <LayoutStoreProfile>
      {showAddYourLocation ? (
        <AddYourLocation />
      ) : (
        <Box>
          <div className=" text-center">
            <div className="flex items-center justify-center ">
              <ArrowBackIcon
                onClick={() => handlePreviousProgressSetupStore(dispatch)}
                className="cursor-pointer text-3xl"
              />

              <p className="mx-auto text-[32px] font-semibold">
                Confirm your address
              </p>
            </div>
            <div className="mt-10">
              <Autocomplete
                value={yourAddress}
                onChange={(_event, value) => {
                  if (
                    value &&
                    value.geometry &&
                    value.geometry.coordinates &&
                    typeof value.geometry.coordinates[0] === 'number' &&
                    typeof value.geometry.coordinates[1] === 'number'
                  ) {
                    setYourAddress(value);
                    const [lng, lat] = value.geometry.coordinates;
                    const lngLat = new mapboxgl.LngLat(lng, lat);

                    setMarkers(lngLat);
                  }
                }}
                options={listPlace}
                getOptionLabel={(option) => option.place_name}
                filterOptions={(options) => options}
                onInputChange={(event, value) => handleSearchMap(value, event)}
                noOptionsText="No locations"
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <div className="flex flex-row px-[20] py-[22]">
                        <LocationOnIcon sx={{ color: 'text.secondary' }} />
                        {option.place_name}
                      </div>
                    </li>
                  );
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Search"
                      label="Search your address"
                      sx={sxTextField}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="mt-5 flex h-56 w-full items-center justify-center border border-mango-text-gray-1">
              <MapboxMap
                center={[-74.5, 40]}
                marker={marker || undefined}
                onMapChangeMarker={(v: any) => {
                  setYourAddress(v as IMapBoxPlace);
                  console.log('v', v);

                  // const [lng, lat] = v.geometry.coordinates;
                  // const lngLat = new mapboxgl.LngLat(lng, lat);

                  // setMarkers(lngLat);
                }}
              />
            </div>

            <Button
              className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize "
              variant="contained"
              disabled={marker?.lat === 0 && marker?.lng === 0}
              onClick={handleUpdateAddress}
            >
              CONTINUE
            </Button>
            <div className="mt-4 flex items-center justify-center gap-1 text-center ">
              <span>Can&apos;t find your address? </span>
              <Typography
                variant="body1"
                onClick={() => setShowAddYourLocation(true)}
                className="cursor-pointer !bg-none font-bold capitalize text-mango-primary-blue hover:!bg-none hover:underline"
              >
                Add your location
              </Typography>
            </div>
          </div>
        </Box>
      )}
    </LayoutStoreProfile>
  );
};
export default ConfirmYourAddress;
