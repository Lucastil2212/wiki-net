import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";

export default function Projects({ open, handleClose, currentUser, networks }) {
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

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={{ ...style }}>
        <Typography id="modal-title" component="h2" sx={{ marginBottom: "1%" }}>
          {`Projects for ${currentUser}`}
        </Typography>
        {networks.length === 0
          ? "No Saved Projects"
          : networks.map((network) => {
              return <div>{network}</div>;
            })}
      </Box>
    </Modal>
  );
}
