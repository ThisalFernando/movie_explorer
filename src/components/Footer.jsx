import React from "react";
import { Box, Typography, Avatar, Link, Grid } from "@mui/material";
import MELogo from "../asserts/MELogo(Footer).png";
import facebook from "../asserts/facebook.svg";
import instagram from "../asserts/instagram.svg";
import twitter from "../asserts/twitter.svg";

const socialMedia = [
  { src: facebook, alt: "Facebook logo", href: "https://facebook.com" },
  { src: twitter, alt: "Twitter logo", href: "https://twitter.com" },
  { src: instagram, alt: "Instagram logo", href: "https://instagram.com" },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        py: 5,
        mt: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Link
        href="https://res.cloudinary.com/fmart/image/upload/v1746781969/MELogo_zs3cyd.png"
        underline="none"
        sx={{ display: "flex", alignItems: "center"}}
      >
        <Avatar src={MELogo} alt="Movie Explorer Logo" sx={{ width: "200px", height: "200px" , borderRadius: 2}} />
      </Link>

      {/* Follow Us Text */}
      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mt: 2 }}>
        Follow us on
      </Typography>

      {/* Social Media Icons */}
      <Grid container justifyContent="center" spacing={3} sx={{ mt: 2 }}>
        {socialMedia.map((icon) => (
          <Grid item key={icon.alt}>
            <Link href={icon.href} target="_blank" rel="noopener">
              <Avatar
                src={icon.src}
                alt={icon.alt}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 3,
                  padding: 1,
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Copyright */}
      <Typography variant="body2" sx={{ mt: 5 , fontWeight: "bold"}}>
        &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
