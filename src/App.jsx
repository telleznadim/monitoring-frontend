import * as React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AlarmsPage from "./Pages/Alarms/AlarmsPage";
import ClearedPage from "./Pages/Cleared/ClearedPage";

function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (e) => {
    setValue(e.target.name);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Active Alarms" value="1" name="1" />
              <Tab label="Cleared Alarms" value="2" name="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AlarmsPage />
          </TabPanel>
          <TabPanel value="2">
            <ClearedPage />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
