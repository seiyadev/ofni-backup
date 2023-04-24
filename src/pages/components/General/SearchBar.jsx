import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const AutocompleteComponent = () => {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    const response = await axios.get(`https://api.example.com/autocomplete`, {
      params: {
        q: inputValue,
      },
    });
    const data = response.data;
    setOptions(data);
  };

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Buscar publicaciones"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon
                color="disabled"
                sx={{
                  marginLeft: "0.5rem",
                }}
              />
            ),
          }}
          size="small"
        />
      )}
      freeSolo
      size="small"
      sx={{
        "& .MuiAutocomplete-inputRoot": {
          borderRadius: "0.6rem",
        },
        width: "250px",
      }}
    />
  );
};

export default AutocompleteComponent;
