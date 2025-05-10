import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Close, Logout } from "@mui/icons-material";
import { orange, grey } from "@mui/material/colors";
import MELogo from "../asserts/MELogo.png";
import { useThemeContext } from "../components/ThemeContext";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeContext();

    const currentPath = location.pathname;
    const isAuthPage = currentPath === "/login" || currentPath === "/register";

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        if (!token && !isAuthPage) {
            navigate("/login");
            return;
        }

        // Fetch logged user details
        const fetchUser = async () => {
            try {
                if (!token) return;
                const res = await axios.get("https://movieexplorerbackend-production.up.railway.app/api/auth/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user", err);
            }
        };

        if (token && !user) {
            fetchUser();
        }
    }, [navigate, currentPath, isAuthPage, user]);

    // Method to handle logout
    const handleLogout = () => {
        Swal.fire({
            title: "Logout!",
            text: "Do you need to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes. Logout!",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'mui-swal-popup',
                title: 'mui-swal-errortitle',
                confirmButton: 'mui-swal-confirm-button',
                cancelButton: 'mui-swal-cancel-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                navigate("/login");
            }
        });
    };

    if (isLoggedIn === null) return null;

    const menuItems = isLoggedIn
        // After log in to the system
        ? [
            { label: "POPULAR", path: "/movies" },
            { label: "TRENDING", path: "/trending" },
            { label: "FAVORITES", path: "/favorites" },
            { label: "LOGOUT", action: handleLogout },
        ]
        // Before login to the system
        : [
            { label: "SIGN UP", path: "/register" },
            { label: "LOGIN", path: "/login" },
        ];

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "black", p: 1 }}>
                <Toolbar>
                    {/* Logo */}
                    <Box
                        component={RouterLink}
                        to="https://res.cloudinary.com/fmart/image/upload/v1746781969/MELogo_zs3cyd.png"
                        sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
                    >
                        <Avatar src={MELogo} sx={{ width: { xs: 30, sm: 48 }, height: { xs: 30, sm: 48 }, mr: 2 }} />
                        <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}>
                                MOVIE <span style={{ color: orange[600] }}>EXPLORER</span>
                            </Typography>
                            {user?.name && !isAuthPage && (
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem" } }}>Welcome back, {user.name} 👋</Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Desktop Menu */}
                    {!isMobile && (
                        <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
                            {menuItems.map((item, index) =>
                                item.path ? (
                                    <Button
                                        key={index}
                                        component={RouterLink}
                                        to={item.path}
                                        variant={currentPath === item.path ? "contained" : "text"}
                                        sx={{
                                            color: currentPath === item.path ? "black" : "#fff",
                                            bgcolor: currentPath === item.path ? orange[600] : "transparent",
                                            "&:hover": { bgcolor: currentPath === item.path ? orange[700] : grey[800], }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ) : (
                                    <Button
                                        key={index}
                                        onClick={item.action}
                                        variant="outlined"
                                        startIcon={<Logout />}
                                        sx={{ color: "#fff", borderColor: "#fff" }}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            )}
                            {/* Theme toggle button */}
                            <IconButton sx={{ ml: 2 }} onClick={toggleTheme} color="inherit">
                                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Box>
                    )}

                    {/* Mobile Toggle */}
                    {isMobile && (
                        <IconButton sx={{ ml: "auto", color: "#fff" }} onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <Box display="flex" justifyContent="flex-end" p={1}>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    if (item.action) item.action();
                                    setDrawerOpen(false);
                                }}
                                component={item.path ? RouterLink : "div"}
                                to={item.path}
                            >
                                <ListItemText primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: currentPath === item.path ? "bold" : "normal",
                                        color: currentPath === item.path ? "orange" : "text.primary",
                                    }}
                                />
                            </ListItem>
                        ))}
                        {/* Theme toggle button */}
                        <Box display="flex" alignItems="center" mt={1}>
                            <Typography sx={{ ml: 2, fontWeight: "bold" }}>SWITCH MODE</Typography>
                            <IconButton onClick={toggleTheme} color="inherit">
                                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Box>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
