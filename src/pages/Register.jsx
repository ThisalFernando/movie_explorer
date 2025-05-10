import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    Divider,
} from "@mui/material";
import { orange } from "@mui/material/colors";

const Register = () => {
    document.title = "MOVIE EXPLORER | User Sign Up";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            Swal.fire({
                title: "Success!",
                text: "Registration successful!",
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
                    navigate("/login");
                }
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Something went wrong!",
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
                <Paper elevation={10} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                        USER REGISTRATION
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ "& label.Mui-focused": { color: orange[600] }, "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: orange[600] } } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: orange[600],
                                "&:hover": { backgroundColor: "#000" },
                                fontWeight: "bold",
                            }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" mt={5}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: orange[600], textDecoration: "none" }}>
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
