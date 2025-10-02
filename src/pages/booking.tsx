
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Navbar from "@/components/Booking";

interface Room {
  id: number;
  name: string;
  price: number;
  guests: number;
  image: string;
}

const rooms: Room[] = [
  { id: 2, name: "Suite", price: 200, guests: 4, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Single Room", price: 80, guests: 1, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Family Room", price: 180, guests: 4, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Luxury Villa", price: 350, guests: 6, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Presidential Suite", price: 500, guests: 6, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Ocean View Room", price: 220, guests: 3, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80" },
  { id: 9, name: "Penthouse", price: 600, guests: 8, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "Budget Room", price: 60, guests: 1, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { id: 11, name: "Business Room", price: 150, guests: 2, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
  { id: 12, name: "Executive Suite", price: 280, guests: 4, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
];

function BookingModal({
  open,
  onClose,
  room,
}: {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}) {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [guestName, setGuestName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") || 1 : 1;

  useEffect(() => {
    if (open) {
      setGuestName("");
      setCheckIn(dayjs());
      setCheckOut(dayjs().add(1, "day"));
    }
  }, [open]);

  const handleConfirm = () => {
    if (room && checkIn && checkOut && guestName) {
      setAlertMessage(
        `Booking Confirmed!\nRoom: ${room.name}\nGuest: ${guestName}\nFrom: ${checkIn.format("DD/MM/YYYY")}\nTo: ${checkOut.format("DD/MM/YYYY")}\nNights: ${nights}\nTotal: $${room.price * nights}`
      );
      setAlertSeverity("success");
      setAlertOpen(true);
      onClose();
    } else {
      setAlertMessage("⚠️ Please fill all details.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => setAlertOpen(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Book {room?.name}</DialogTitle>
        <DialogContent dividers>
          {room && (
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <CardMedia
                component="img"
                height="120"
                image={room.image}
                alt={room.name}
                sx={{ borderRadius: 2, width: "40%" }}
              />
              <Box>
                <Typography variant="h6">{room.name}</Typography>
                <Typography variant="body2">Guests: {room.guests}</Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  ${room.price} / night
                </Typography>
              </Box>
            </Box>
          )}

          <TextField
            fullWidth
            label="Guest Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={(newValue) => setCheckIn(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={(newValue) => setCheckOut(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
          </LocalizationProvider>

          {room && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${room.price * nights} ({nights} night{nights > 1 ? "s" : ""})
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage.split("\n").map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function HotelBooking() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenBooking = (room: Room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={3} sx={{ textAlign: "center" }}>
          Hotel Room Booking
        </Typography>

        {/* Rooms grid using CSS Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {rooms.map((room) => (
            <Card
              key={room.id}
              sx={{
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={room.image}
                alt={room.name}
              />
              <CardContent>
                <Typography variant="h6">{room.name}</Typography>
                <Typography variant="body2">Guests: {room.guests}</Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "bold", mb: 2 }}
                >
                  ${room.price} / night
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOpenBooking(room)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          room={selectedRoom}
        />
      </Box>
    </>
  );
}
