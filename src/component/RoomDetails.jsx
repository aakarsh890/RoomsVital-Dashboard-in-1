import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";


export default function RoomDetails() {
  const { roomNo } = useParams();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const docRef = doc(db, "rooms", roomNo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRoomData(docSnap.data());
      } else {
        setRoomData(null);
      }
    };
    fetchRoom();
  }, [roomNo]);

  if (roomData === null) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>No data found for Room {roomNo}</Typography>
        <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Room {roomNo} Details
      </Typography>
      <Typography>Name: {roomData.name}</Typography>
      <Typography>Gender: {roomData.gender}</Typography>
      <Typography>Occupation: {roomData.occupation}</Typography>
      <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
        Back
      </Button>
    </Container>
  );
}
