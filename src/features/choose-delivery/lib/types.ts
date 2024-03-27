export type StatisticsType = {
  specificationId: number,
  customerLocation: LocationType,
  customerDelivery: {
    countryId: number | null,
    cityId: number | null,
  },
  utm: {
    utm_content: string | null,
    utm_medium: string | null,
    utm_campaign: string | null,
    utm_source: string | null,
    utm_term: string | null,
    utm_referrer: string | null,
    roistat: string | null,
    referrer: string | null,
    openstat_service: string | null,
    openstat_campaign: string | null,
    openstat_ad: string | null,
    openstat_source: string | null,
    from: string | null,
    gcclientid: string | null,
    _ym_uid: string | null,
    _ym_counter: string | null,
    gclid: string | null,
    yclid: string | null,
    fbclid: string | null,
  },
};

export type LocationType = {
  latitude: number | null,
  longitude: number | null,
};
