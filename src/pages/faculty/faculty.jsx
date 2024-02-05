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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "../../axios/axios";
import FacultyTableHead from "./faculty-table-head";
import FacultyTableToolbar from "./faculty-table-toolbar";
import { getComparator, stableSort } from "./utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

export default function FacultyPage() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [faculties, setFaculties] = React.useState([]);

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

    if (name === "images") {
      const selectedFile = files[0];
      setFileName(selectedFile ? selectedFile.name : "");
    }
  };

  const clearFormData = () => {
    document.getElementById("teachersForm").reset();
  };

  const notify = () => toast("Successfully Inserted");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const image = formJson.images;
    let image_url;
    await axios
      .post(
        "/image-library",
        { image },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        image_url = response.data?.data[0]?.fileName;
      });
    console.log(formJson, image_url);
    await axios
      .post("/faculty", {
        faculty_name: formJson.faculty_name,
        slug: "string",
        dean: "6568b48a569d05372e19ac16",
        description: formJson.description,
        address: formJson.address,
        contact: { email: formJson.email, phone: formJson.phone },
        social_links: {},
        images: [image_url],
      })
      .then((response) => {
        clearFormData();
        handleCloseModal();
        setFileName("");
        toast.success("Inserted Successfully!!");
        axios.get("/faculty").then((response) => {
          setFaculties(response?.data?.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    axios.get("/faculty").then((response) => {
      setFaculties(response?.data?.data);
      setLoader(false);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = faculties.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - faculties.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(faculties, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, faculties]
  );

  console.log(faculties);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          p={2}
        >
          <Typography variant="h5">Faculty</Typography>
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
            transition={Bounce}
          />
          {/* Same as */}
          <ToastContainer />
          <Button variant="outlined" onClick={handleOpenModal}>
            <AddIcon></AddIcon>New Faculty
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={openModal}
            onClose={handleCloseModal}
          >
            <DialogTitle>Add New Faculty</DialogTitle>
            <form method="post" onSubmit={handleSubmit} id="teachersForm">
              <DialogContent>
                <DialogContentText p={1}></DialogContentText>
                <Box mb={3}>
                  <TextField
                    label="Faculty Name"
                    variant="outlined"
                    fullWidth
                    name="faculty_name"
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Dean"
                    variant="outlined"
                    fullWidth
                    name="dean"
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name="description"
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="address"
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
                    label="Social Links"
                    variant="outlined"
                    fullWidth
                    name="social_links"
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
                    name="images"
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
        <FacultyTableToolbar numSelected={selected.length} />
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
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <FacultyTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={faculties.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
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
                          {row.faculty_name}
                        </TableCell>
                        <TableCell align="right">{row.dean}</TableCell>
                        <TableCell align="right">
                          {row.contact?.email}
                        </TableCell>
                        <TableCell align="right">
                          {row.contact?.phone}
                        </TableCell>
                      </TableRow>
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
              count={faculties.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
