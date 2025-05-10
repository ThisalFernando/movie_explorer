import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import MELogo from "../asserts/MELogo.png"

const MovieHeader = () => {
    return (
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
                sx={{
                    width: { xs: 40, sm: 60, md: 80 },
                    height: { xs: 40, sm: 60, md: 80 },
                    mr: 1,
                    borderRadius: 2,
                    mb: { md: 0 },
                }}
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
                        letterSpacing: {
                            xs: "0.4em",
                            sm: "0.6em",
                            md: "0.72em",
                        },
                        ml: 0.5,
                        fontSize: {
                            xs: "0.47rem",
                            sm: "0.52rem",
                            md: "0.58rem",
                            lg: "0.7rem",
                        },
                    }}
                >
                    DISCOVER YOUR FAVORITE FILMS
                </Typography>
            </Box>
        </Box>
    );
};

export default MovieHeader;
