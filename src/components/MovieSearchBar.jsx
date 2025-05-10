import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { orange } from "@mui/material/colors";

const MovieSearchBar = ({ query, setQuery, handleSearch, clearSearchQuery, label}) => {
  return (
    <Box sx={{ mb: 2, mt: 2, width: "100%", maxWidth: 1040 }}>
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              {query && (
                <IconButton onClick={clearSearchQuery}>
                  <span style={{ fontSize: "18px" }}>X</span>
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          "& label.Mui-focused": { color: orange[600] },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: orange[600] },
          },
        }}
      />
    </Box>
  );
};

export default MovieSearchBar;
