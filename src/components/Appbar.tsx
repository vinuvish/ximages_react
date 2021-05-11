import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer'
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import nav from '../static/_nav';

interface Props { }

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            display: "none",
            [theme.breakpoints.down('md')]: {
                display: "block",
                marginRight: theme.spacing(1),
            },
        },
        logo: {
            flexGrow: 1,
            display: "flex",
        },
        headerBar: {
            boxShadow: "unset"
        },
        userImage: {
            marginRight: "10px",
        },
        container: {
            // padding: "0px !important"
        },
        userName: {
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "19px"
        },
        sideDrawer: {
            minWidth: "30vw",
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'space-between',
          },
        drawerPaper: {
            width: drawerWidth,
            background: "white"
        },
        drawerIcon: {
            width: "31px",
            height: "31px",
            objectFit: "contain"
        }
    })
);

const Appbar: React.FC<Props> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [sideCartOpen, setSideCartOpen] = React.useState<boolean>(false);

    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setSideCartOpen(!sideCartOpen)
    }

    const onDrawerItemPress = (value: string) => {
        setSideCartOpen(false);
    }

    const classes = useStyles();
    return (
        <AppBar position="sticky" classes={{ root: classes.headerBar }}>
            <Drawer
                open={sideCartOpen}
                onClose={() => toggleDrawer()}
                className={classes.sideDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography>X-Images</Typography>
                    <IconButton onClick={toggleDrawer}>

                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                        nav.items.map((item, index) => {
                            return (
                                <Link key={index} to={`/dashboard${item.url}`}>
                                    <ListItem onClick={() => onDrawerItemPress(item.name)} button>
                                        <ListItemIcon>
                                            <img src={require(`../assets/images/${item.icon}@2x.png`)} className={classes.drawerIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </List>
            </Drawer>
            <Toolbar className={classes.container}>
                <div className={classes.logo}>
                    <IconButton
                        edge='start'
                        onClick={() => toggleDrawer()}
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <img src={require("../assets/images/logo.png")} />
                </div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <img className={classes.userImage} src={require("../assets/images/user.png")} alt="user-img" />
                    <Typography className={classes.userName}>Damion Davy</Typography>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

Appbar.defaultProps = {};

export default Appbar;
