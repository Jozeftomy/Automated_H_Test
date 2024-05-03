import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";

const DriveTestEasy = () => {
  const [user, setUser] = useState("George");
  const [slotNo, setSlotNo] = useState(3);
  const [testDate, setTestDate] = useState("2024-04-14");
  const [status, setStatus] = useState("Learners");
  const [result, setResult] = useState("Passed");
  const [data, setData] = useState([]);
  const [connectionActive, setConnectionActive] = useState(true);
  const [buttonText, setButtonText] = useState("Start");
  const [buttonColor, setButtonColor] = useState("primary");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!connectionActive) return;

    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.onmessage = (event) => {
      console.log("Data received:", event.data);
      setData((prevData) => [...prevData, event.data]);

      if (event.data === "4") {
        setButtonText("PASSED");
        setButtonColor("success");
        setIsLoading(false); // Stop loading once message is received
      } else if (event.data === "8") {
        setButtonText("FAILED");
        setButtonColor("error");
        setIsLoading(false); // Stop loading once message is received
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsLoading(false);
    };

    return () => {
      ws.close();
    };
  }, [connectionActive]);

  const handleStart = () => {
    if (!connectionActive) {
      setConnectionActive(true);
    }
    setIsLoading(true);
    fetch("http://localhost:8000/test")
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error("Error triggering data:", error);
        setIsLoading(false);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Drive Test Easy
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Slot No.</TableCell>
                <TableCell>Test Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>{user}</TableCell>
                <TableCell>{slotNo}</TableCell>
                <TableCell>{testDate}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <Button
                    onClick={handleStart}
                    variant="contained"
                    color={buttonColor}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      buttonText
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default DriveTestEasy;
