import * as React from 'react';
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import Input from "../components/Common/Textfield/CustomTextField";

interface Props { }

const Summary: React.FC<Props> = () => {
    const classes = useStyles();
    return (
        <>
            <Link to="/auth/signin">
                <Button variant="contained" color="secondary">
                    Sign in
                </Button>
            </Link>
        </>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "25px",
            textAlign: "center"
        },
    })
);

Summary.defaultProps = {};

export default Summary;
