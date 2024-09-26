import { useSearchParams } from "react-router-dom";

export const useUtm = () => {
  const [ searchParams, _setSearchParams ] = useSearchParams();

  return {
    utm_content: searchParams.get('utm_content'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_source: searchParams.get('utm_source'),
    utm_term: searchParams.get('utm_term'),
    utm_referrer: searchParams.get('utm_referrer'),
    roistat: searchParams.get('roistat'),
    referrer: searchParams.get('referrer'),
    openstat_service: searchParams.get('openstat_service'),
    openstat_campaign: searchParams.get('openstat_campaign'),
    openstat_ad: searchParams.get('openstat_ad'),
    openstat_source: searchParams.get('openstat_source'),
    from: searchParams.get('from'),
    gcclientid: searchParams.get('gcclientid'),
    _ym_uid: searchParams.get('_ym_uid'),
    _ym_counter: searchParams.get('_ym_counter'),
    gclid: searchParams.get('gclid'),
    yclid: searchParams.get('yclid'),
    fbclid: searchParams.get('fbclid'),
  }
}
