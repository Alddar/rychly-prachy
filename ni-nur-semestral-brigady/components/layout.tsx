import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import GradeIcon from "@mui/icons-material/Grade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


export default function Layout({children}: { children: any }) {

    const [menuBarState, setState] = React.useState(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                console.log(event);
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <Link href="/">
                    <ListItem key="home" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Domů"/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem key="myWork" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <GradeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Moje brigády"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem key="logout" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Odhlásit se"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ml: 2}}
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                    <div style={{flexGrow: 1}}></div>
                    <React.Fragment key="menu">
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={toggleDrawer(true)}
                            key={"menu"}
                        >
                            <MenuIcon/>

                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={menuBarState}
                            onClose={toggleDrawer(false)}
                        >
                            {list()}
                        </Drawer>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
            <Box component={"main"} pt={"1.2em"}>
                <Container>{children}</Container>
            </Box>
        </>
    );
}
