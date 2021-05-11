import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import { Grid, Button, Typography } from '@material-ui/core';
import Colors from '../styles/Colors';

import SignIn from "../pages/SignInPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import AuthSuccess from "../pages/AuthSuccessPage";

interface Props {
    history: object
}

const Auth: React.FC<Props> = (props: any) => {
    const classes = useStyles();
    const hideBackButton = props.match.params.tab === "signin";

    const backButtonHandler = () => {
        props.history.goBack();
    }

    return (
        <div className="auth-container">
            <Grid container spacing={0} className={classes.container}>
                <Grid
                    className={classes.leftContainer}
                    lg={3} md={4} sm={4} xs={12}
                    item
                >
                    <img
                        className={classes.sideImage}
                        src={require("../assets/images/auth-image.png")}
                    />
                </Grid>
                <Grid

                    lg={9} md={8} sm={8} xs={12}
                    item
                >
                    {!hideBackButton && (
                        <div onClick={() => backButtonHandler()} className={classes.backButton}>
                            <Typography className={classes.backButtonText}>
                                Back
                        </Typography>
                        </div>
                    )}
                    <div className={classes.rightContainer}>
                        <Switch>
                            <Route
                                path="/auth/signin"
                                render={props => <SignIn {...props} />}
                            />
                            <Route
                                path="/auth/forgot-password"
                                render={props => <ForgotPassword {...props} />}
                            />
                            <Route
                                path="/auth/auth-success"
                                render={props => <AuthSuccess {...props} />}
                            />
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: Colors.white,
            height: "100vh"
        },
        sideImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        leftContainer: {
            [theme.breakpoints.down('xs')]: {
                display: "none",
            },
        },
        rightContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
        },
        backButton: {
            position: "relative"
        },
        backButtonText: {
            top: "30px",
            left: "35px",
            position: "absolute",
            fontSize: 21,
            fontWeight: 600,
            lineHeight: "35px",
            color: Colors.black,
            cursor: "pointer"
        }
    })
);

Auth.defaultProps = {};

export default Auth;
