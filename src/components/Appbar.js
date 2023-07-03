import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// const drawerWidth = 240;
const navItems = ["Elections", "Results", "Logout"];

// function DrawerAppBar(props) {
//     const { window } = props;
//     const [mobileOpen, setMobileOpen] = React.useState(false);

//     // const handleDrawerToggle = () => {
//     //   setMobileOpen((prevState) => !prevState);
//     // };

//     const drawer = (
//       <Box  sx={{ textAlign: 'center' }}>
//         <Typography variant="h6" sx={{ my: 2 }}>
//           MUI
//         </Typography>
//         <Divider />
//         <List>
//           {navItems.map((item) => (
//             <ListItem key={item} disablePadding>
//               <ListItemButton sx={{ textAlign: 'center' }}>
//                 <ListItemText primary={item} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     );

//     const container = window !== undefined ? () => window().document.body : undefined;

const Appbar = () => {
  return (
    <Box>
      <AppBar component="nav" color="transparent">
        <Toolbar>
          <Button
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#01579B",
              fontSize: "18px",
            }}
            href="/home"
          >
            School Voting
          </Button>

          <Box>
            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
              href="/home/poll"
            >
              Elections
            </Button>
            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
              href="/home/results"
            >
              Results
            </Button>
            <Button
              sx={{ color: "#000000", fontSize: "16px" }}
              href="/home/register"
            >
              Register Student
            </Button>
            <Button sx={{ color: "#F50312", fontSize: "16px" }}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
