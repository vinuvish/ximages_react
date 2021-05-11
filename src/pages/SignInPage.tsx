import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Input from "../components/Common/Textfield/CustomTextField";
import Colors from '../styles/Colors';

interface Props { }

const SignIn: React.FC<Props> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography className={classes.heading}>
                Sign in to GK Images
            </Typography>
            <Input
                id="email-input"
                type="email"
                label={"Email"}
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
            <Input
                id="password-input"
                type="password"
                label={"Password"}
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
            />
            <Link to="/dashboard/summary">
                <Button className={classes.submitButton} variant="contained" color="primary">
                    <Typography className={classes.submitButtonText}>
                        Sign In
                    </Typography>
                </Button>
            </Link>
        </div>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "370px"
        },
        heading: {
            alignSelf: "left",
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "45px"
        },
        submitButton: {
            width: "370px",
            height: "50px",
            borderRadius: "10px",
            background: Colors.themeBlue,
        },
        submitButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        }
    })
);

SignIn.defaultProps = {};

export default SignIn;
