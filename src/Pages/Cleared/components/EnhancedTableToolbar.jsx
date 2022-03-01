import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React from "react";

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleRefresh, handleClearAlarm, handleDeleteAlarm } =
    props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.error.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Alarms
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteAlarm}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Alarm(s)">
            <IconButton onClick={handleClearAlarm}>
              <DoneAllIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <Tooltip title="Refresh list">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
