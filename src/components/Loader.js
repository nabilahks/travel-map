import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, color: "black" }}>
        Preparing your experience...
      </Typography>
      <Box sx={{ width: "50%" }}>
        <LinearProgress sx={{ height: 10, borderRadius: 5, color: "#1e88e5" }} />
      </Box>
    </Box>
  );
};

export default Loader;
