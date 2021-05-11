import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Input from "../components/Common/Textfield/CustomTextField";
import Colors from "../styles/Colors";

interface Props { }

const ForgotPassword: React.FC<Props> = () => {
    const [email, setEmail] = useState("");
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.heading}>
                Forgot Password?
            </Typography>
            <Typography className={classes.description}>
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
            </Typography>
            <Typography className={classes.description}>
                For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
            </Typography>
            <Input
                id="email-input"
                type="email"
                label={"Email"}
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
            <Link to="/auth/auth-success">
                <Button className={classes.submitButton} variant="contained" color="primary">
                    <Typography className={classes.submitButtonText}>
                        Send Reset Instructions
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
            marginBottom: "25px"
        },
        description: {
            marginBottom: "25px"
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

ForgotPassword.defaultProps = {};

export default ForgotPassword;
