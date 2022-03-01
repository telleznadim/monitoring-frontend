import * as React from "react";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import Box from "@mui/material/Box";
import { StyledBadge } from "../components/StyledBadges";

import { Chip, Stack } from "@mui/material";

export default function Severities(props) {
  const { severities } = props;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          width: "fit-content",
          m: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <StyledBadge
            customStyles={{
              color: "black",
              borderColor: "red",
              backgroundColor: "white",
            }}
            badgeContent={severities.Critical}
          >
            <Chip
              icon={<DangerousOutlinedIcon style={{ color: "white" }} />}
              label="Critical"
              size="small"
              sx={{ color: "white", bgcolor: "red" }}
            />
          </StyledBadge>

          <StyledBadge
            customStyles={{
              color: "black",
              borderColor: "orange",
              backgroundColor: "white",
            }}
            badgeContent={severities.Major}
          >
            <Chip
              icon={<DangerousOutlinedIcon style={{ color: "white" }} />}
              label="Major"
              size="small"
              sx={{ color: "white", bgcolor: "orange" }}
            />
          </StyledBadge>
          <StyledBadge
            customStyles={{
              color: "black",
              borderColor: "yellow",
              backgroundColor: "white",
            }}
            badgeContent={severities.Minor}
          >
            <Chip
              icon={<ReportProblemOutlinedIcon style={{ color: "black" }} />}
              label="Minor"
              size="small"
              sx={{ color: "black", bgcolor: "yellow" }}
            />
          </StyledBadge>
          <StyledBadge
            customStyles={{
              color: "black",
              borderColor: "#35baf6",
              backgroundColor: "white",
            }}
            badgeContent={severities.Info}
          >
            <Chip
              icon={<ReportProblemOutlinedIcon style={{ color: "black" }} />}
              label="Info"
              size="small"
              sx={{ color: "black", bgcolor: "#35baf6" }}
            />
          </StyledBadge>
          <StyledBadge
            customStyles={{
              color: "black",
              borderColor: "#76ff03",
              backgroundColor: "white",
            }}
            badgeContent={severities.Normal}
          >
            <Chip
              icon={
                <CheckCircleOutlineOutlinedIcon style={{ color: "black" }} />
              }
              label="Normal"
              size="small"
              sx={{ color: "black", bgcolor: "#76ff03" }}
            />
          </StyledBadge>
        </Stack>
      </Box>
    </div>
  );
}
