import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Divider,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const Login = () => {
    document.title = "MOVIE EXPLORER | User Login";
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit user credentials to login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem("token", res.data.token);

            Swal.fire({
                title: "Success!",
                text: "Login successful!",
                icon: "success",
                confirmButtonText: "Okay",
                customClass: {
                    popup: 'mui-swal-popup',
                    title: 'mui-swal-title',
                    confirmButton: 'mui-swal-confirm-button',
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/movies");
                }
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Invalid credentials!",
                icon: "error",
                confirmButtonText: "Try Again!",
                customClass: {
                    popup: 'mui-swal-popup',
                    title: 'mui-swal-errortitle',
                    confirmButton: 'mui-swal-cancel-button',
                },
                buttonsStyling: false,
            });
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url('https://res.cloudinary.com/fmart/image/upload/v1746775903/top-view-clapperboard-halloween-concept_wlw71k.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: 8,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{ p: 5, borderRadius: 3 }}>
                    <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                        USER LOGIN
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 5,
                                backgroundColor: orange[600],
                                ":hover": { backgroundColor: "black" },
                                fontWeight: "bold"
                            }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" mt={5}>
                        Don't have an account?{" "}
                        <a href="/register" style={{ color: orange[600], textDecoration: "none" }}>
                            Register
                        </a>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
