import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface Props { }

const AuthSuccess: React.FC<Props> = () => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.heading}>
                Request was sent!
            </Typography>
            <div className={classes.container}>
                <img src={require("../assets/images/success.png")} />
            </div>
        </>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        heading: {
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "25px",
            textAlign: "center"
        },
    })
);

AuthSuccess.defaultProps = {};

export default AuthSuccess;
