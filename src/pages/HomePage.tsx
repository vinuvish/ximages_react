import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

//components
import Header from "../components/Appbar";

//static
import nav from '../static/_nav';


//pages
import Summary from "./SummaryPage";
import Products from "./ProductsPage";
import Users from "./UsersPage";
import AddProductForm from "./AddProductPage";
import AddUserForm from "./AddUserPage";


interface Props { }

const HomePage: React.FC<Props> = () => {
    const classes = useStyles();
    return (
        <div className={classes.toolbar}>
            <Header />
            <Grid container spacing={0} className={classes.container}>
                <Grid
                    className={classes.leftContainer}
                    xl={2} lg={2} md={2} sm={2} xs={2}
                    item
                >
                    <List>
                        {
                            nav.items.map((item, index) => {
                                return (
                                    <Link key={index} to={`/dashboard${item.url}`}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <img src={require(`../assets/images/${item.icon}@2x.png`)} className={classes.tabIcon} />
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} />
                                        </ListItem>
                                    </Link>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid
                    className={classes.rightContainer}
                    xl={10} lg={10} md={12} sm={12} xs={12}
                    item
                >
                    <Container>
                        <div className={classes.rightContainer}>
                            <Switch>
                                <Route
                                    path="/dashboard/summary"
                                    render={props => <Summary {...props} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/dashboard/products"
                                    render={props => <Products {...props} />}
                                />
                                <Route
                                    exact
                                    path="/dashboard/addProduct"
                                    render={props => <AddProductForm {...props} />}
                                />
                                <Route
                                    exact
                                    path="/dashboard/users"
                                    render={props => <Users {...props} />}
                                />
                                <Route
                                    exact
                                    path="/dashboard/addUser"
                                    render={props => <AddUserForm {...props} />}
                                />
                            </Switch>
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        container: {
            // marginBottom: "100px"
            height: "calc(100vh - 65px)"
        },
        leftContainer: {
            background: "white",
            [theme.breakpoints.down('md')]: {
                display: "none",
            },
            [theme.breakpoints.down('lg')]: {
                maxWidth: "280px",
            },
        },
        rightContainer: {
            background: "#f5f5f5",
        },
        tab: {
            width: "100%",
            padding: "25px 0 25px 0",
        },
        tabContainer: {
            color: "#4A636F",
            textAlign: "left",
            textTransform: "capitalize",
            position: "absolute",
            left: "25px",
            display: "flex",
            alignItems: "center",

            [theme.breakpoints.down('xs')]: {
                justifyContent: "center",
                alignItems: "center",
            },
        },
        tabLabel: {
            fontSize: "18px",
            fontWeight: 500,
            [theme.breakpoints.down('xs')]: {
                display: "none",
            },
        },
        tabIcon: {
            marginRight: "16px",
            width: "31px",
            height: "31px",
            objectFit: "contain"
        }
    })
);

HomePage.defaultProps = {};

export default HomePage;
