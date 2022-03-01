import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import { stableSort, getComparator } from "../scripts/tableFunctions";
import { getCellColor } from "../scripts/getSeverityColor";
import axios from "axios";
import Severities from "./Severities";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const DataTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [severities, setSeverities] = React.useState({});

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    console.log("Use Effect Executed");
    handleRefresh();
    handleGetAlarmCount();
  }, []);

  const handleRefresh = () => {
    console.log("refresh");
    // setRows([]);
    axios
      .get("http://172.28.2.212:5000/api/get-all-cleared-alarms")
      .then((response) => {
        // console.log(response.data);
        setSelected([]);
        console.log(response.data);
        setRows(response.data);
        // handleGetAlarmCount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearAlarm = () => {
    console.log("Clear Alarms");
    axios
      .put("http://172.28.2.212:5000/api/update-alarm-normal", selected)
      .then((response) => {
        console.log(response.data);
        setSelected([]);
        handleRefresh();
        handleGetAlarmCount();
        // setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAlarm = () => {
    console.log("Delete Alarms");
    axios
      .delete("http://172.28.2.212:5000/api/delete-alarm/" + selected)
      .then((response) => {
        console.log(response.data);
        // setRows([]);
        setSelected([]);
        handleRefresh();
        handleGetAlarmCount();
        // setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetAlarmCount = () => {
    axios
      .get("http://172.28.2.212:5000/api/get-cleared-severity-count")
      .then((response) => {
        setSeverities(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const cellsFontSize = 12;
  return (
    <Paper sx={{ width: "100%", mb: 2 }} elevation={6}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleRefresh={handleRefresh}
        handleClearAlarm={handleClearAlarm}
        handleDeleteAlarm={handleDeleteAlarm}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 1500 }}
          aria-label="a dense table"
          aria-labelledby="Alarms"
          size="small"
          // size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
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
                      align="center"
                      sx={{
                        ...getCellColor(row.severity),
                        fontWeight: "bold",
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                    >
                      {row.severity}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row.createdAt}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row.updatedAt}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row.application}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row.message}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row.userId}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {row.comments}
                        <IconButton aria-label="delete">
                          <EditIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "grey.300",
                        fontSize: cellsFontSize,
                      }}
                      align="center"
                    >
                      {row._id}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ alignItems: "center" }}
      >
        <Severities severities={severities} />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Paper>
  );
};

export default DataTable;
