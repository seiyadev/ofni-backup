import "leaflet/dist/leaflet.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import CustomBackdrop from "./CustomBackdrop";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  IconButton,
  Popover,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import VerifyTheme from "../General/verifyTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowMap,
  setCenter,
  setCity,
} from "../../../features/fairing/ubicationSlice";
import { useRouter } from "next/router";
import SnackBarApp from "./SnackBarApp";
import { getStoreState } from "next-redux-wrapper";
import { store } from "@/pages/api/store";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const LeafletMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const LeafletTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const LeafletCircle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

export default function MapView() {
  const theme = VerifyTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const center = useSelector((state) => state.ubication.center);
  const city = useSelector((state) => state.ubication.city);
  const showMap = useSelector((state) => state.ubication.showMap);
  const [userLocation, setUserLocation] = useState([]); // Current location, sirve para deshabilitar el botón de ubicación actual
  const [radius, setRadius] = useState(10000); // Default radius in meters
  const mapRef = useRef(); // Define la referencia del mapa
  const [buttonDisabled, setButtonDisabled] = useState(false); // Deshabilita el botón de ubicación actual
  const mapURL =
    theme === "light"
      ? "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const [loading, setLoading] = useState(false);
  const [isLoadingAutoComplete, setIsLoadingAutoComplete] = useState(false);

  React.useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      dispatch(setShowMap(true));
    }
  }, [dispatch, center]);

  const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation([lat, lng]);
          dispatch(setCenter([lat, lng]));
          if (mapRef.current) {
            mapRef.current.setView([lat, lng], mapRef.current.getZoom());
          }
          await setButtonDisabled(true);
          await setLoading(true);
          const response = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
              params: {
                q: `${lat}+${lng}`,
                countrycode: "mx",
                key: "9792c59eb22f459996a0ebcb11d02ce6",
              },
            }
          );
          // Extraer el nombre de la ciudad y el país de la dirección
          const cityComponents = [];
          if (response.data.results[0].components.city) {
            cityComponents.push(response.data.results[0].components.city);
          }
          if (response.data.results[0].components.country) {
            cityComponents.push(response.data.results[0].components.country);
          }
          const city = cityComponents.join(", ");
          await setInputFieldValue(city);
          await dispatch(setCity(city));
          await setShowMap(true);
          await setLoading(false);
          await setButtonDisabled(false);
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        setShowMap(false);
        if (error) {
          if (error.code) {
            if (error.code === 1) {
              setErrorText(
                "Debes permitir el acceso a tu ubicación actual para poder usar esta función."
              );
            }
            if (error.code === 2 || error.code === 3) {
              setErrorText(
                "No se pudo obtener tu ubicación actual, por favor intenta de nuevo."
              );
            }
          }
        }
        setOpenSnackBar(true);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleLocationAutoComplete = (location) => {
    dispatch(setCenter([location.geometry.lat, location.geometry.lng]));
    if (mapRef.current) {
      mapRef.current.setView(
        [location.geometry.lat, location.geometry.lng],
        mapRef.current.getZoom()
      );
    }
  };

  // Autocomplete
  const [options, setOptions] = React.useState([]);
  const [inputSearchValue, setInputSearchValue] = React.useState("");
  const [inputFieldValue, setInputFieldValue] = React.useState(city);

  const handleSearch = async (value) => {
    if (
      value.trim().length === 0 ||
      value === null ||
      value === undefined ||
      value.length < 3
    ) {
      setOptions([]);
      return;
    }
    try {
      await setIsLoadingAutoComplete(true);
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: value,
            countrycode: "mx",
            limit: 100,
            key: "9792c59eb22f459996a0ebcb11d02ce6",
          },
        }
      );
      await setIsLoadingAutoComplete(false);
      await setOptions(response.data.results);
    } catch (error) {
      if (error.response.status && error.response.status === 400) {
        return;
      }
    }
  };

  // SnackBar
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          minWidth: "300px",
        }}
        className="relative"
      >
        <Autocomplete
          id="search-location"
          loading={isLoadingAutoComplete}
          loadingText="Buscando..."
          value={inputFieldValue}
          onChange={(event, newValue) => {
            if (newValue) {
              console.log(newValue);
              setInputFieldValue(newValue);
              dispatch(setCity(newValue.formatted));
              handleLocationAutoComplete(newValue);
              setUserLocation([]);
            }
          }}
          inputValue={inputSearchValue}
          onInputChange={(event, newInputSearchValue) => {
            setInputSearchValue(newInputSearchValue);
            handleSearch(newInputSearchValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar por ciudad o localidad" />
          )}
          options={options}
          getOptionLabel={(option) => {
            if (option.formatted) {
              return option.formatted;
            } else {
              return option;
            }
          }}
          fullWidth
          sx={{
            pb: 1,
          }}
          noOptionsText="No se encontraron resultados"
          autoHighlight
          isOptionEqualToValue={(option, value) => option.id === value?.id}
        />
        {showMap ? (
          <>
            <LeafletMap
              center={center}
              zoom={10}
              zoomControl={false}
              scrollWheelZoom={false}
              dragging={false}
              ref={mapRef}
              doubleClickZoom={false}
              className="rounded-lg"
            >
              <LeafletTileLayer
                url={mapURL}
                onLoad={() => setLoading(false)}
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              />
              <LeafletMarker
                position={center}
                draggable={false}
                interactive={false}
              />
              <LeafletCircle
                center={center}
                radius={radius}
                interactive={false}
                color={"#a5a5a5"}
              />
            </LeafletMap>
            <div className="flex justify-end flex-row gap-2 mt-2">
              <Button
                variant="outlined"
                color="error"
                sx={{
                  textTransform: "none",
                }}
              >
                Eliminar ubicación
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
              >
                Aceptar
              </Button>
            </div>
          </>
        ) : (
          <>
            <Divider
              sx={{
                pb: 1,
              }}
            >
              <Typography
                variant="body2"
                fontStyle={"italic"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                o
              </Typography>
            </Divider>
            <Button
              variant="contained"
              fullWidth
              sx={{
                textTransform: "none",
              }}
              onClick={() => {
                handleLocation();
              }}
              disabled={buttonDisabled}
            >
              <NearMeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                }}
              />
              &nbsp;Usar mi ubicación actual
            </Button>
            <Typography variant="body2" fontStyle={"italic"}>
              <small>
                Mientras no establezcas una ubicación, se mostrarán todas las
                publicaciones existentes.
              </small>
            </Typography>
          </>
        )}
      </div>
      <CustomBackdrop open={loading} />
      <SnackBarApp
        open={openSnackBar}
        message={errorText}
        severity="error"
        handleClose={handleCloseSnackbar}
        vertical="bottom"
        horizontal="center"
        width="100%"
      />
    </>
  );
}
