import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";


export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomData = querySnapshot.docs.map((doc) => ({
        roomNo: doc.id,
        ...doc.data(),
      }));
      setRooms(roomData);
    };
    fetchRooms();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Room Numbers
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link
                    component="button"
                    variant="body1"
                    onClick={() => navigate(`/room/${room.roomNo}`)}
                  >
                    {room.roomNo}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
