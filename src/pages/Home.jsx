import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function HomePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    file: null,
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const selectedFile = files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            multiple
            type="file"
            name="file"
            onChange={handleChange}
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Upload File
            </Button>
          </label>
          {fileName && <span style={{ marginLeft: "8px" }}>{fileName}</span>}
        </Box>
        <Box mb={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      <Box></Box>
    </Box>
  );
}

export default HomePage;
