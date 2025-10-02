
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Navbar from "@/components/Booking";

// User profile page with banner image and profile info side by side
export default function UserProfile() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // stack on mobile
          gap: 2,
          p: 3,
        }}
        style={{ minHeight: "90vh" }}
      >
        {/* Left Side - Banner Image */}
        <Box
          sx={{
            flex: 1,
           
           backgroundImage: `url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        />

        {/* Right Side - User Profile Info */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src="https://via.placeholder.com/150"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            John Doe
          </Typography>
          <Typography variant="body1" color="text.secondary">
            johndoe@example.com
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            📍 Location: New York
          </Typography>
          <Typography variant="body2">
            📞 Phone: +1 234 567 890
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Short bio about the user goes here. You can add more details like
            designation, company, or preferences.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
