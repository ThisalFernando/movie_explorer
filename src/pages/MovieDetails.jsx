import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Typography,
    Container,
    CardMedia,
    Box,
    Chip,
    Button,
    Stack,
    Avatar,
} from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import MELogo from "../asserts/MELogo.png";

const MovieDetails = () => {
    document.title = "MOVIE EXPLORER | Movie Info";
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch movie details
                const movieRes = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
                );
                setMovie(movieRes.data);

                // Fetch movie cast
                const creditsRes = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
                );
                // Display top 5 cast members
                setCast(creditsRes.data.cast.slice(0, 5));

                // Display trailer links
                const videoRes = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
                );
                const trailers = videoRes.data.results.filter(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                if (trailers.length > 0) {
                    setTrailer(`https://www.youtube.com/watch?v=${trailers[0].key}`);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    // Stay until the movies are loaded
    if (!movie) {
        return <Typography>Loading...</Typography>;
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

            <Box display="flex" alignItems="center" justifyContent="center" gap={4} flexWrap="wrap" sx={{ flexDirection: { xs: "column", md: "row" }, px: 2 }}>

                {/* Back button */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: -4 }}>
                    <Link to="/movies" style={{ textDecoration: "none" }} ><Button sx={{ color: "text.primary", '&:hover': { color: orange[700] }, textTransform: "none", fontWeight: "bold", fontSize: { xs: "0.6rem", sm: "1rem" }, px: { xs: 0.5, sm: 2 }, py: { xs: 0.5, sm: 1 } }} startIcon={<ArrowBackIcon sx={{ color: orange[600] }} />}>BACK TO HOME</Button></Link>
                </Box>

                {/* Movie Poster */}
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ width: { xs: "100%", sm: "90%", md: "400px" }, maxWidth: "100%", borderRadius: 2, boxShadow: 5, }}
                />

                <Box sx={{ maxWidth: { xs: "100%", md: "650px" }, width: "100%" }}>
                    {/* Movie Title */}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: orange[600] }}>
                        {movie.title}
                    </Typography>

                    {/* Movie release date */}
                    <Typography variant="subtitle1" color="text.secondary">
                        Release Date: {movie.release_date}
                    </Typography>

                    {/* Movie Rating */}
                    <Typography varient="subtitle1" color="text.secondary">
                        Rating: {movie.vote_average}
                    </Typography>

                    {/* Movie runtime (Duration) */}
                    <Typography varient="subtitle1" color="text.secondary">
                        Runtime: {movie.runtime} mins
                    </Typography>
                    
                    {/* Movie Genres */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt={2} mb={2} flexWrap="wrap" justifyContent={{ xs: "flex-start", sm: "flex-start" }}>
                        {movie.genres.map((genre) => (
                            <Chip key={genre.id} label={genre.name} sx={{ backgroundColor: orange[600], fontWeight: "bold", width: { xs: "100%", sm: "auto" } }} />
                        ))}
                    </Stack>

                    <hr style={{ borderColor: grey[50] }} />

                    {/* Movie Cast (Top 5) */}
                    <Typography varient="h6" mt={3} sx={{ fontSize: "25px", color: "text.primary" }}>
                        Top Cast of the Movie
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={1} flexWrap="wrap" justifyContent={{ xs: "flex-start", sm: "flex-start" }}>
                        {cast.map((member) => (
                            <Chip key={member.id} label={member.name} varient="outlined" sx={{ bgcolor: "background.paper", width: { xs: "100%", sm: "auto" } }} />
                        ))}
                    </Stack><br />

                    <hr style={{ borderColor: grey[50] }} />

                    {/* Movie Trailer Link */}
                    <Typography varient="h6" mt={3} sx={{ fontSize: "25px", color: "text.primary" }}>
                        {movie.title} Trailer - Watch on YouTube
                    </Typography>
                    {trailer && (
                        <Box sx={{ mt: 2 }}>
                            <Button
                                varient="contained"
                                href={trailer}
                                target="_blank"
                                sx={{ backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "black" }, px: 4, py: 1.5, fontWeight: "bold", width: { xs: "100%" } }}
                            >
                                WATCH ON YOUTUBE
                            </Button>
                        </Box>
                    )}<br />

                    <hr style={{ borderColor: grey[50] }} />

                    {/* Movie Overview */}
                    <Typography varient="h6" mt={3} sx={{ fontSize: "25px", color: "text.primary" }}>
                        Overview
                    </Typography>
                    <Typography varient="body1" mt={2} color="text.primary">
                        {movie.overview}
                    </Typography><br />
                </Box>
            </Box><br /><br />
        </Container>
    )
}

export default MovieDetails;