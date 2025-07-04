import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import {
    Typography,
    Grid,
    Container,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Box,
    Button,
} from "@mui/material";
import MovieHeader from "../components/MovieHeader";
import MovieSearchBar from "../components/MovieSearchBar";
import MovieFilterBars from "../components/MovieFilterBars";
import { Link } from "react-router-dom";
import { orange , grey} from "@mui/material/colors"

const TrendingMovies = ({ timeWindow = "week" }) => {
    document.title = "MOVIE EXPLORER | Trending Movies";
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
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
        }finally{
            setLoading(false);
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
                <MovieHeader />
                <br />
            </>

            {/* Search Bar */}
            <MovieSearchBar 
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                clearSearchQuery={clearSearchQuery}
                label="Search your trending movies..."
            />

            {/* Filters */}
            <MovieFilterBars 
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
            />

            {/* Set the loading of the trending movies */}
            {loading ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>Loading trending movies...</Typography>
            ) : movies.length === 0 ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>No trending movies found!</Typography>
            ) : (
                <>
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
                </>)}
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