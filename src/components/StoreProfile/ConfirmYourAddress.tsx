/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import debounce from 'lodash.debounce';
import MapboxMap from '@/common/MapBox/MapBoxMap';
import type { IMapBoxPlace } from '@/services/map.services/map.interface';
import { MapServices } from '@/services/map.services/map.services';
import { useAppDispatch } from '@/store/hook';
import { Search } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import mapboxgl from 'mapbox-gl';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import type { LngLat } from 'react-map-gl';

import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from './helper';
import { sxTextField } from '@/utils/helper/styles';
import AddYourLocation from './AddYourLocation';

const ConfirmYourAddress = () => {
  const dispatch = useAppDispatch();
  const [showAddYourLocation, setShowAddYourLocation] =
    useState<boolean>(false);

  const [yourAddress, setYourAddress] = useState<IMapBoxPlace | null>(null);
  const [listPlace, setListPlace] = useState<IMapBoxPlace[]>([]);

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
                }}
              />
            </div>

            <Button
              className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize "
              variant="contained"
              disabled={!yourAddress}
              onClick={() => {
                handleForwardProgressSetupStore(dispatch);
              }}
            >
              CONTINUE
            </Button>
            <div className="mt-4 text-center ">
              <span>Can&apos;t find your address? </span>
              <Button
                variant="text"
                onClick={() => setShowAddYourLocation(true)}
                className="font-bold capitalize text-mango-primary-blue hover:!bg-none"
              >
                Add your location
              </Button>
            </div>
          </div>
        </Box>
      )}
    </LayoutStoreProfile>
  );
};
export default ConfirmYourAddress;
