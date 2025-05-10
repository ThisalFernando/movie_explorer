import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const MovieFilterControls = ({
  genres = [],
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 5,
        width: "100%",
        maxWidth: 1040,
        "& label.Mui-focused": { color: orange[600] },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": { borderColor: orange[600] },
        },
      }}
    >
      {/* Filter by Genre */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <InputLabel>Filter By Genre of the movie</InputLabel>
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          label="Filter By Genre of the movie"
        >
          <MenuItem value="">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filter by Released Year */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <TextField
          label="Filter by Released Year of the movie"
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </FormControl>

      {/* Filter by Rating */}
      <FormControl fullWidth sx={{ minWidth: 150 }}>
        <TextField
          label="Filter by Min Rating"
          type="number"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default MovieFilterControls;
