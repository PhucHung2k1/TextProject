export interface IMapBoxPlace {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  short_code: string;
  wikidata: string;
  mapbox_id: string;
  text: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  short_code: string;
  wikidata: string;
  mapbox_id: string;
}
