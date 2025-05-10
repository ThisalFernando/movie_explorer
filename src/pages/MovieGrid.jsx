import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardMedia,
    Typography,
    Container,
    Rating,
    CardContent,
    IconButton,
    Box,
    Button,
} from "@mui/material";
import MovieHeader from "../components/MovieHeader";
import MovieSearchBar from "../components/MovieSearchBar";
import MovieFilterBars from "../components/MovieFilterBars";
import { orange, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MovieGrid = () => {
    document.title = "MOVIE EXPLORER | Popular Movies";
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

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
        }finally{
            setLoading(false);
        }
    }, [API_KEY]);

    // Fetch Movies
    const fetchMovies = useCallback(async (currentPage = 1, append = false) => {
        try {
            const baseUrl = query
                ? `https://api.themoviedb.org/3/search/movie`
                : `https://api.themoviedb.org/3/discover/movie`;

            const params = {
                api_key: API_KEY,
                language: "en-US",
                sort_by: "popularity.desc",
                include_adult: false,
                include_video: false,
                page: currentPage,
                query: query || undefined,
                with_genres: selectedGenre || undefined,
                primary_release_year: selectedYear || undefined,
                "vote_average.gte": selectedRating || undefined,
            };

            const res = await axios.get(baseUrl, { params });
            const newMovies = res.data.results;

            setHasMore(res.data.page < res.data.total_pages);

            if (append) {
                setMovies((prev) => [...prev, ...newMovies]);
            } else {
                setMovies(newMovies);
            }
        } catch (err) {
            console.error("Error fetching movies:", err);
        }
    }, [API_KEY, query, selectedGenre, selectedYear, selectedRating]);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    useEffect(() => {
        const savedQuery = localStorage.getItem("lastSearchedMovie");
        if (savedQuery) {
            setQuery(savedQuery);
        }
    }, []);

    useEffect(() => {
        setPage(1);
        fetchMovies(1, false);
    }, [query, selectedGenre, selectedYear, selectedRating, fetchMovies])

    // Method of handling searching
    const handleSearch = () => {
        if (query.trim()) {
            localStorage.setItem("lastSearchedMovie", query);
        }
        setPage(1);
        fetchMovies(1, false);
    };

    // Method for clearing search history
    const clearSearchQuery = () => {
        setQuery("");
        localStorage.removeItem("lastSearchedMovie");
        setPage(1);
        fetchMovies(1, false);
    }

    // Method for load more button handling
    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage, true);
    }

    // Fetch favorite movies
    const fetchFavorites = useCallback(async () => {
        if(!token) return;
        try{
            const res = await axios.get("https://movieexplorerbackend-production.up.railway.app/api/favorite-movies", {
                headers: {Authorization: `Bearer ${token}`}
            });
            setFavorites(res.data.map(f => f.movieId));
        }catch(err){
            console.error("Failed to load favorites", err);
        }
    }, [token]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    //Handling toggle button
    const toggleFavorite = async (movie) => {
        if(!token) return alert("Please login to add favorites!");

        const isFav = favorites.includes(movie.id);
        try{
            if(isFav){
                await axios.delete(`https://movieexplorerbackend-production.up.railway.app/api/favorite-movies/${movie.id}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setFavorites(favorites.filter(id => id !== movie.id));
            }else{
                await axios.post("https://movieexplorerbackend-production.up.railway.app/api/favorite-movies", {
                    movieId: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                }, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setFavorites([...favorites.movie.id]);
            }
        }catch(err){
            console.error("Favorite toggle failed: ", err);
        }
    };

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
                label="Search your favorite movies..."
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

            {/* Set the loading of the movies */}
            {loading ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>Loading movies...</Typography>
            ) : movies.length === 0 ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>No movies found!</Typography>
            ) : (
                <>
                    {/* Movie Grid */}
                    <Grid container spacing={5} sx={{ ml: { sm: 6 } }}>
                        {movies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} position="relative">
                                <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                                    <Card sx={{ bgcolor: "background.paper", height: "100%" }}>
                                        {/* Movie Poster */}
                                        <CardMedia
                                            component="img"
                                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                        <CardContent>
                                            {/* Movie Poster */}
                                            <Typography variant="h6" component="div" sx={{ color: orange[600], fontWeight: "bold" }}>
                                                {movie.title}
                                            </Typography>

                                            {/* Movie release year */}
                                            <Typography variant="body2" color="text.secondary">
                                                Year: {movie.release_date?.split("-")[0]}
                                            </Typography>

                                            {/* Movie Rating */}
                                            <Typography variant="body2" color="text.secondary">
                                                Rating: {movie.vote_average}
                                            </Typography><br />

                                            {/* Movie Rating in stars */}
                                            <Rating
                                                value={movie.vote_average / 2}
                                                precision={0.5}
                                                readOnly
                                                size="medium"
                                            />
                                        </CardContent>
                                    </Card>
                                </Link>
                                <IconButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(movie);
                                    }}
                                    sx={{position: "absolute", top: 8, right: 8, color: "red"}}
                                >
                                    {favorites.includes(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </>)}
            {/* Load More Button */}
            {hasMore && (
                <Box sx={{ mt: 4, mb: 6, display: "flex", justifyContent: "center", boxShadow: 5 }}>
                    <Button
                        variant="contained"
                        onClick={loadMore}
                        sx={{ backgroundColor: orange[600], color: "white", '&:hover': { backgroundColor: orange[700] }, px: 4, py: 1.5, fontWeight: "bold", }}
                    >
                        LOAD MORE
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default MovieGrid;