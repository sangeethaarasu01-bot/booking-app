import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const LoginPage = dynamic(() => import('auth/pages'), { ssr: false })

  const handleLogout = () => {
    Cookies.remove("userRole");
    const authUrl = process.env.NEXT_PUBLIC_AUTH_API_URL
    window.location.href=`${authUrl}`;
  };;

  const handleProfile = () => {
    window.location.href="/profile";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <HeaderPage/> */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Left side Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>

          {/* Right side Profile + Logout */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" onClick={handleProfile}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
