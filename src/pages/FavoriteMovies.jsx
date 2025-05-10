import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, Rating, IconButton, Container, Box, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey, orange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MELogo from "../asserts/MELogo.png";

const FavoriteMovies = () => {
    document.title = "MOVIE EXPLORER | Favorite Movies";
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    // Fetch favorite movies
    const fetchFavorites = useCallback(async () => {
        try {
            const res = await axios.get("https://movieexplorerbackend-production.up.railway.app/api/favorite-movies", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(res.data);
        } catch (err) {
            console.error("Error fetching favorites", err);
        }finally{
            setLoading(false);
        }
    }, [token]);

    // Remove from favorites
    const removeFavorite = async (movieId) => {
        try {
            await axios.delete(`https://movieexplorerbackend-production.up.railway.app/api/favorite-movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(favorites.filter(f => f.movieId !== movieId));
        } catch (err) {
            console.error("Error removing favorite", err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

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
                <br /><br />
            </>

            {/* Set the loading of the favorite movies */}
            {loading ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>Loading your favorites movies...</Typography>
            ) : favorites.length === 0 ? (
                <Typography sx={{fontSize: {xs: '12px', sm: '14px', md: '16px' }, mb: { xs: 7, sm: 7, md: 12 }, color: grey[500]}}>No favorite movies added yet!</Typography>
            ) : (
                <>
                    {/* Movie Grid */}
                    <Grid container spacing={5} sx={{ ml: { sm: 6 } }}>
                        {favorites.map((movie) => (
                            <Grid item key={movie.movieId} xs={12} sm={6} md={4} lg={3} position="relative">
                                <Link to={`/movie/${movie.movieId}`} style={{ textDecoration: "none" }}>
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
                                <IconButton onClick={() => removeFavorite(movie.movieId)} sx={{ position: "absolute", top: 8, right: 8, color: "red" }}>
                                    <FavoriteIcon />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                    <br/><br/>
                </>)}
        </Container>
    );
};

export default FavoriteMovies;


