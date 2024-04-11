import { useEffect, useState } from "react";

import { LocationType } from "../types";

export const useGeolocation = (storedLocation: LocationType) => {
  const [ location, setLocation ] = useState<LocationType>({latitude: null, longitude: null});
  useEffect(() => {
    if (!storedLocation.latitude && !storedLocation.longitude) {
      navigator.geolocation.getCurrentPosition((position) => setLocation(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      ));
    }
  }, [storedLocation.latitude, storedLocation.longitude]);
  return location.latitude ? location : storedLocation;
}
