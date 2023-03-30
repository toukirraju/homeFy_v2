import React, { useEffect, useState, useRef } from "react";
import locationIcon from "../../../assets/location6.png";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "./CustomMap.css";
import { UilSearch, UilTimes, UilMapPinAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getMarkerHomeID } from "../../../redux/features/map/mapSlice";
import { fetchFilteredPosts } from "../../../redux/features/posts/postSlice";
import { useFetchMapAddressQuery } from "../../../redux/features/map/mapRTKqueryApi";

//change marker icon
const fixedMarkerIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [38, 40],
  iconAnchor: [22, 41],
  popupAnchor: [-3, -50],
});

const markerIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3477/3477419.png",

  iconSize: [38, 40],
  iconAnchor: [22, 41],
  popupAnchor: [-3, -50],
});

const CustomMap = ({ setIsMapOn }) => {
  const [mapCenter, setMapCenter] = useState([23.777176, 90.399452]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const markerRef = useRef(null);

  const { markerAddressHomeID } = useSelector((state) => state.map);
  const { data: addresses } = useFetchMapAddressQuery();
  // console.log(markerPosition);
  // console.log(markerAddress);

  useEffect(() => {
    if (markerAddressHomeID) {
      dispatch(
        fetchFilteredPosts({
          homeId: markerAddressHomeID,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getMarkerHomeID(""));
          setIsMapOn(false);
        });
    }
  }, [markerAddressHomeID]);

  // search location and auto movementmap on this location
  function AutoMovementMap({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position);
      }
    }, [position]);

    return null;
  }

  //map created here
  const onMapCreated = (map) => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      autoComplete: true,
      autoCompleteDelay: 250,
    });
    const searchContainer = L.DomUtil.create("div", "leaflet-control-search");
    searchContainer.appendChild(searchControl.onAdd(map));
    L.DomEvent.disableClickPropagation(searchContainer);
    map
      ?.getContainer()
      .querySelector(".leaflet-top.leaflet-left")
      .appendChild(searchContainer);
  };

  //user current location first render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setMarkerPosition([latitude, longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  //user current location
  const GetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // setSearchLocation([latitude, longitude]);
        setMarkerPosition([latitude, longitude]);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  };

  //marker dragable to get position
  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    setMarkerPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
  };

  // marker position will change when change marker position
  const AddMarkerOnDoubleClick = () => {
    const map = useMapEvents({
      dblclick: (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };

  const dispatch = useDispatch();
  const handleMarkerClick = (houseId) => {
    console.log(`Marker ${houseId} clicked`);

    dispatch(getMarkerHomeID(houseId));
  };

  return (
    <div className="map">
      <MapContainer
        center={mapCenter}
        zoom={11}
        tap={false}
        touchZoom={false}
        whenCreated={onMapCreated}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <Search /> */}
        <SearchInput setSearchLocation={setMarkerPosition} />
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            icon={markerIcon}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
            ref={markerRef}
          >
            <Popup>{` Lat: ${markerPosition[0]}, Lng: ${markerPosition[1]}`}</Popup>
          </Marker>
        )}

        {/* Map auto movement */}
        {markerPosition && <AutoMovementMap position={markerPosition} />}

        {/* here shows all fixed marker */}
        {addresses?.map(({ id, lat, lon, address_display_name, house }) => (
          <Marker
            key={id}
            position={[lat, lon]}
            icon={fixedMarkerIcon}
            eventHandlers={{ click: () => handleMarkerClick(house) }}
          >
            <Popup>{address_display_name}</Popup>
          </Marker>
        ))}

        <AddMarkerOnDoubleClick />
      </MapContainer>
      <button className="current__location" onClick={GetCurrentLocation}>
        <UilMapPinAlt />
      </button>
    </div>
  );
};

export default CustomMap;

// search component
function SearchInput({ setSearchLocation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchTerm
      )}&format=jsonv2`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length !== 0) {
            setSearchResults(data);
            setMessage(false);
          } else {
            setMessage(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  };

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchResultClick(result) {
    setSearchLocation([Number(result.lat), Number(result.lon)]);
    setSearchResults([]);
    setSearchTerm(result.display_name);
  }

  return (
    <>
      <div className="search-box">
        <form className="card" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search location"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          {searchTerm && (
            <span
              onClick={() => {
                setSearchTerm("");
                setMessage(false);
                setSearchResults([]);
              }}
            >
              <UilTimes />
            </span>
          )}

          <button type="submit">
            <UilSearch />
          </button>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="search__results">
          <ul className="search__list">
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleSearchResultClick(result)}
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {message && (
        <div className="search__results">
          <h4 style={{ textAlign: "center" }}>Location not found</h4>{" "}
        </div>
      )}
    </>
  );
}
