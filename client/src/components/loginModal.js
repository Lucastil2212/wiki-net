import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function Login({ open, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={{ ...style }}>
        <Typography id="modal-title" component="h2">
          Login
        </Typography>
        <TextField
          id="username"
          label="Enter Username"
          value={username}
          onChange={handleUserNameChange}
          required
        />
        <TextField
          id="password"
          label="Enters Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button id="login" variant="contained">
          Login
        </Button>
      </Box>
    </Modal>
  );
}
