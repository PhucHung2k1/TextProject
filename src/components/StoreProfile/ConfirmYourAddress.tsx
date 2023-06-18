/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Autocomplete,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import debounce from 'lodash.debounce';
import Link from 'next/link';

import MapboxMap from '@/common/MapBox/MapBoxMap';
import type { IMapBoxPlace } from '@/services/map.services/map.interface';
import { MapServices } from '@/services/map.services/map.services';
import { useAppDispatch } from '@/store/hook';
import { setModalContentMUI, showModalMUI } from '@/store/modal/modalSlice';
import { Search } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import mapboxgl from 'mapbox-gl';
import { useRouter } from 'next/router';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import type { LngLat } from 'react-map-gl';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

const ConfirmYourAddress = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [yourAddress, setYourAddress] = useState<IMapBoxPlace | null>(null);
  const [listPlace, setListPlace] = useState<IMapBoxPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [marker, setMarkers] = useState<LngLat>();

  const handleSearchMap = debounce(
    async (value: string, event?: SyntheticEvent<Element, Event>) => {
      if (event) {
        const mapServices = new MapServices();
        mapServices.findAddressAndPlaces(value).then((res) => {
          setListPlace(res);
        });
      }
    },
    800
  );

  return (
    <div className="flex justify-center pt-[90px] ">
      <div className="w-[568px]  rounded-2xl bg-white shadow-md">
        <LinearProgressWithLabel value={30} />
        <div className="px-8 pb-8 pt-12">
          <div className=" text-center">
            <div className="flex items-center justify-center ">
              <ArrowBackIcon
                onClick={() => router.back()}
                className="cursor-pointer text-3xl"
              />

              <p className="mx-auto text-[32px] font-semibold">
                Confirm your address
              </p>
            </div>

            <p className="text-mango-text-gray-2">
              Where can clients find you?
            </p>
          </div>

          {/*  */}
          <div className="mt-10">
            <Autocomplete
              value={yourAddress}
              onChange={(event, value) => {
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
              loading={loading}
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
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
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
              }}
            />
          </div>

          <Button
            className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize "
            variant="contained"
            //
            onClick={() => {
              dispatch(setModalContentMUI(<p>asda</p>));

              dispatch(showModalMUI());
            }}
          >
            CONTINUE
          </Button>
          <div className="mt-4 text-center ">
            <span>Can&apos;t find your address? </span>
            <Link href="/" passHref>
              <a className="font-bold text-mango-primary-blue">
                Add your location
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmYourAddress;
