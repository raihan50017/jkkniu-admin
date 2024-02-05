import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../axios/axios";
import { Oval } from "react-loader-spinner";
import { getComparator, stableSort } from "./utils";
import TeacherTableHead from "./teacher-table-head";
import { TeacherTableToolbar } from "./teacher-table-toolbar";

export default function TeacherPage() {
  const [teachersDara, setTeachersData] = React.useState([]);

  const [loader, setLoader] = React.useState(true);

  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  true;
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [fileName, setFileName] = React.useState("");

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      const selectedFile = files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };

  const [faculties, setFaculties] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);

  React.useEffect(() => {
    axios.get("/teacher").then((response) => {
      setTeachersData(response?.data?.data);
      setLoader(false);
    });
    axios.get("/faculty").then((response) => {
      setFaculties(response?.data?.data);
    });
    axios.get("/department").then((response) => {
      setDepartments(response?.data?.data);
    });
  }, []);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("first_name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = teachersDara.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teachersDara.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(teachersDara, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, teachersDara]
  );

  const [filterName, setFilterName] = React.useState("");

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const clearFormData = () => {
    document.getElementById("teachersForm").reset();
  };

  const notify = () => toast("Successfully Inserted");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const image = formJson.image;
    let image_url;
    await axios
      .post(
        "/image-library",
        { image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        image_url = response.data.data[0].fileName;
      });
    console.log(formJson, image_url);
    await axios
      .post("/teacher", {
        teacher_id: formJson.teacher_id,
        first_name: formJson.first_name,
        last_name: formJson.last_name,
        designation: formJson.designation,
        email: formJson.email,
        phone: toString(formJson.phone),
        password: formJson.password,
        department: formJson.department,
        faculty: formJson.faculty,
        image: image_url ? image_url : "default.jpg",
      })
      .then((response) => {
        clearFormData();
        handleCloseModal();
        setFileName("");
        notify();
        axios.get("/teacher").then((response) => {
          setTeachersData(response?.data?.data);
          setLoader(false);
        });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
            p={2}
          >
            <Typography variant="h5">Teachers</Typography>

            {/***************************  Add New Teacher Form ***************************/}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ToastContainer />
            <Button variant="outlined" onClick={handleOpenModal}>
              <AddIcon></AddIcon>New Teacher
            </Button>
            <Dialog
              fullWidth={true}
              maxWidth={"md"}
              open={openModal}
              onClose={handleCloseModal}
            >
              <DialogTitle>Add New Teacher</DialogTitle>
              <form method="post" onSubmit={handleSubmit} id="teachersForm">
                <DialogContent>
                  <DialogContentText p={1}></DialogContentText>
                  <Box mb={3}>
                    <TextField
                      label="Teacher ID"
                      variant="outlined"
                      fullWidth
                      name="teacher_id"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      name="first_name"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      name="last_name"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      name="phone"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Designation"
                      variant="outlined"
                      fullWidth
                      name="designation"
                    />
                  </Box>
                  <Box mb={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="select-faculty">
                        Select Faculty
                      </InputLabel>
                      <Select
                        labelId="select-faculty"
                        id="faculty"
                        label="Select Option"
                        name="faculty"
                      >
                        {faculties.map((faculty) => (
                          <MenuItem key={faculty._id} value={faculty._id}>
                            {faculty.faculty_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="select-department">
                        Select Department
                      </InputLabel>
                      <Select
                        labelId="select-department"
                        id="department"
                        label="Select Option"
                        name="department"
                      >
                        {departments.map((department) => (
                          <MenuItem key={department._id} value={department._id}>
                            {department.department_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Education"
                      variant="outlined"
                      fullWidth
                      name="education"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Experience"
                      variant="outlined"
                      fullWidth
                      name="experience"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Award"
                      variant="outlined"
                      fullWidth
                      name="award"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Cources"
                      variant="outlined"
                      fullWidth
                      name="cources"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Contac"
                      variant="outlined"
                      fullWidth
                      name="contac"
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      name="password"
                    />
                  </Box>
                  <Box mb={3}>
                    <input
                      onChange={handleChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      id="file-upload"
                      multiple
                      type="file"
                      name="image"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="contained" component="span">
                        Upload Image
                      </Button>
                    </label>
                    {fileName && (
                      <span style={{ marginLeft: "8px" }}>{fileName}</span>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Stack>
          {/****************************** Teachers Data Table *****************************/}
          {loader ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </Box>
          ) : (
            <>
              <TeacherTableToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
                numSelected={selected.length}
              />
              <TableContainer sx={{ overflow: "unset" }}>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <TeacherTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={teachersDara.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row._id}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                onClick={(event) => handleClick(event, row._id)}
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={row.image} />
                                <Typography variant="subtitle2" noWrap>
                                  {row.first_name + " " + row.last_name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">
                              {row.designation}
                            </TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">
                              {row.department}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton onClick={handleOpenMenu}>
                                <MoreVertIcon></MoreVertIcon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <Popover
                            open={!!open}
                            anchorEl={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{
                              sx: { width: 140 },
                            }}
                          >
                            <MenuItem onClick={handleCloseMenu}>
                              <EditIcon sx={{ me: 2 }}></EditIcon>
                              Edit
                            </MenuItem>

                            <MenuItem
                              onClick={handleCloseMenu}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon sx={{ me: 2 }}></DeleteIcon>
                              Delete
                            </MenuItem>
                          </Popover>
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={teachersDara.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
