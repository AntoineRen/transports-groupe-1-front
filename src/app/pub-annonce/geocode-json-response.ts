export class GeocodeJSON {

  // REQUIRED. GeocodeJSON result is a FeatureCollection.
  type: string;

  // REQUIRED. Namespace.
  geocoding: {

    // REQUIRED. A semver.org compliant version number. Describes the version of
    // the GeocodeJSON spec that is implemented by this instance.
    version: string,

    // OPTIONAL. Default: null. The licence of the data. In case of multiple sources,
    // and then multiple licences, can be an object with one key by source.
    licence?: string,

    // OPTIONAL. Default: null. The attribution of the data. In case of multiple sources,
    // and then multiple attributions, can be an object with one key by source.
    attribution?: string,

    // OPTIONAL. Default: null. The query that has been issued to trigger the
    // search.
    query?: string,

  };

  // REQUIRED. As per GeoJSON spec.
  features: FeatureGeocodeJSON[];
}

export class FeatureGeocodeJSON {
  // REQUIRED. As per GeoJSON spec.
  properties: {

      // REQUIRED. One of "house", "street", "locality", "city", "region", "country".
      // isn't meant to be closed.
      type: string,

      // OPTIONAL. Result accuracy, in meters.
      accuracy?: number,

      // RECOMMENDED. Suggested label for the result.
      label: string,

      // OPTIONAL. Name of the place.
      name?: string,

      // OPTIONAL. Housenumber of the place.
      housenumber?: string,

      // OPTIONAL. Street of the place.
      street?: string,

      // OPTIONAL. Locality of the place.
      locality?: string,

      // OPTIONAL. Postcode of the place.
      postcode?: string,

      // OPTIONAL. City of the place.
      city?: string,

      // OPTIONAL. District of the place.
      district?: string,

      // OPTIONAL. County of the place.
      county?: string,

      // OPTIONAL. State of the place.
      state?: string,

      // OPTIONAL. Country of the place.
      country?: string,

      // OPTIONAL. Administratives boundaries the feature is included in,
      // as defined in http://wiki.osm.org/wiki/Key:admin_level#admin_level
      admin?: {
        level2: string,
        level4: string,
        level6: string
      },

      // OPTIONAL. Geohash encoding of coordinates (see http://geohash.org/site/tips.html).
      geohash?: string,
  };

  // REQUIRED. As per GeoJSON spec.
  type?: string;

  // REQUIRED. As per GeoJSON spec.
  geometry: {
    coordinates: [],
    type: string
  };
}
