import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import {
    Typography,
    Grid,
    Container,
    Card,
    CardMedia,
    CardContent,
    TextField,
    InputAdornment,
    IconButton,
    Rating,
    Box,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { orange } from "@mui/material/colors"
import MELogo from "../asserts/MELogo.png";

const TrendingMovies = ({ timeWindow = "week" }) => {
    document.title = "MOVIE EXPLORER | Trending Movies";
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    // Fetch all the genres of the movies
    const fetchGenres = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
            );
            setGenres(res.data.genres);
        } catch (err) {
            console.error("Error fetching genres:", err);
        }
    }, [API_KEY]);

    // Fetch Trending movies
    const fetchTrending = useCallback(async (currentPage = 1, append = false) => {
        try {
            let baseUrl = "";
            let params = {
                api_key: API_KEY,
                language: "en-US",
                sort_by: "popularity.desc",
                include_adult: false,
                include_video: false,
                page: currentPage,
            };

            // If there is a search query, use the search endpoint
            if (query.trim()) {
                baseUrl = `https://api.themoviedb.org/3/search/movie`;
                params.query = query;
            } else if (selectedGenre || selectedYear || selectedRating) {
                // If filters are applied, use discover endpoint
                baseUrl = `https://api.themoviedb.org/3/discover/movie`;
                if (selectedGenre) params.with_genres = selectedGenre;
                if (selectedYear) params.primary_release_year = selectedYear;
                if (selectedRating) params["vote_average.gte"] = selectedRating;
            } else {
                // Endpoint to fetch trending movies
                baseUrl = `https://api.themoviedb.org/3/trending/movie/${timeWindow}`;
            }

            const res = await axios.get(baseUrl, { params });
            setMovies(prev => append ? [...prev, ...res.data.results] : res.data.results);
            setHasMore(currentPage < res.data.total_pages);
            setPage(currentPage);
        } catch (err) {
            console.error("Error fetching trending movies: ", err);
        }
    }, [API_KEY, query, selectedGenre, selectedYear, selectedRating, timeWindow]);

    useEffect(() => {
        fetchGenres();
        fetchTrending();
    }, [fetchGenres, fetchTrending, selectedGenre, selectedYear, selectedRating]);

    useEffect(() => {
        const savedQuery = localStorage.getItem("lastSearchedMovie");
        if (savedQuery) {
            setQuery(savedQuery);
            fetchTrending();
        }
    }, [fetchTrending, selectedGenre, selectedYear, selectedRating]);

    // Method for search handling
    const handleSearch = () => {
        if (query.trim()) {
            localStorage.setItem("lastSearchedMovie", query);
        }
        fetchTrending();
    };

    // Method for deleting search history
    const clearSearchQuery = () => {
        setQuery("");
        localStorage.removeItem("lastSearchedMovie");
        fetchTrending();
    }

    // Method for load more button handling
    const handleLoadMore = () => {
        const nextPage = page + 1;
        fetchTrending(nextPage, true);
    }

    return (
        <Container sx={{ mt: 10, px: { xs: 2, sm: 3, md: 4 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <>
                {/* Site Logo and Name */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={3}
                    flexWrap="wrap"
                >
                    <Avatar
                        src={MELogo}
                        alt="Logo"
                        sx={{ width: { xs: 40, sm: 60, md: 80 }, height: { xs: 40, sm: 60, md: 80 }, mr: 1, borderRadius: 2, mb: { md: 0 } }}
                    />
                    <Box textAlign="center">
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            MOVIE&nbsp;
                            <Box component="span" sx={{ color: orange[600] }}>
                                EXPLORER
                            </Box>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: "bold",
                                fontFamily: "Roboto",
                                color: "text.primary",
                                letterSpacing: { xs: "0.4em", sm: "0.6em", md: "0.72em" },
                                ml: 0.5,
                                fontSize: { xs: "0.47rem", sm: "0.52rem", md: "0.58rem", lg: "0.7rem" },
                            }}
                        >
                            DISCOVER YOUR FAVORITE FILMS
                        </Typography>
                    </Box>
                </Box>
                <br />
            </>

            {/* Search Bar */}
            <Box sx={{ mb: 2, mt: 2, width: "100%", maxWidth: 1040 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search your trending movies..."
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
                    sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                />
            </Box>

            {/* Filters */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 5, width: "100%", maxWidth: 1040, "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }} >
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

                {/* Filter by released year */}
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

            {/* Movie Grid */}
            <Grid container spacing={5} sx={{ ml: { sm: 6 } }}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                            <Card sx={{ bgcolor: "background.paper" }} >
                                {/* Movie Poster */}
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={TrendingMovies.title}
                                />

                                {/* Movie Title */}
                                <CardContent>
                                    <Typography varient="h6" sx={{ color: orange[600], fontWeight: "bold" }}>
                                        {movie.title}
                                    </Typography>

                                    {/* Movie release date */}
                                    <Typography varient="body2" color="text-primary">
                                        {new Date(movie.release_date).getFullYear()}
                                    </Typography>

                                    {/* Movie Rating */}
                                    <Rating
                                        value={movie.vote_average / 2}
                                        precision={0.5}
                                        readOnly
                                        size="small"
                                    />
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            {/* Load more button */}
            {hasMore && (
                <Box sx={{ mt: 4, mb: 6, display: "flex", justifyContent: "center", boxShadow: 5 }}>
                    <Button
                        varient="contained"
                        sx={{ backgroundColor: orange[600], color: "white", '&:hover': { backgroundColor: orange[700] }, px: 4, py: 1.5, fontWeight: "bold", }}
                        onClick={handleLoadMore}
                    >
                        LOAD MORE
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default TrendingMovies;