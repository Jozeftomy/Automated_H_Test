import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Result = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const user = response.data[0];
        if (user) {
          setStatus(user.status);
        } else {
          setStatus("No user found");
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        setStatus("Error fetching status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div>{isLoading ? <CircularProgress /> : <div>Status: {status}</div>}</div>
  );
};

export default Result;
