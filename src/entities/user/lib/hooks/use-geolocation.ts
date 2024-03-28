import { useState } from "react";

import { LocationType } from "../types";

export const useGeolocation = () => {
  const [ location, setLocation ] = useState<LocationType>({latitude: null, longitude: null});
  navigator.geolocation.getCurrentPosition((position) => setLocation(
    {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
  ));
  return location;
}
