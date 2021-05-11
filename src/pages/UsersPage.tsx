import * as React from 'react';
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import Input from "../components/Common/Textfield/CustomTextField";
import UserCard from "../components/ImageCard";
import Spinner from "../components/Spinner";
import Colors from "../styles/Colors";
import { FirestoreService } from "../Firebase/FirestoreService";
import { User } from '../models/user';

interface Props { }

const Users: React.FC<Props> = () => {
    const [searchInput, setSearchInput] = React.useState("")
    const [users, setUsers] = React.useState<User[]>();
    const classes = useStyles();

    React.useEffect(() => {
        FirestoreService.getUsers()
            .then((res) => {
                console.log("res ######", res)
                setUsers(res)
            })
            .catch((err) => {
                console.log("error ######", err)
            })
    }, [])

    return (
        <>
            <div className={classes.inputContainer}>
                <Input
                    id="user-search"
                    value={searchInput}
                    placeholder={"Search users..."}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchInput(e.target.value)}
                    customClassName="whiteInput"
                />
            </div>
            <div className={classes.addImagerow}>
                <Typography className={classes.heading}>
                    Users
                </Typography>
                <Link to="/dashboard/addUser">
                    <Button className={classes.addButton} variant="contained" color="primary">
                        <Typography className={classes.addButtonText}>
                            New User
                        </Typography>
                    </Button>
                </Link>
            </div>
            <Grid container direction="row" spacing={0}>
                <Grid container spacing={1}>
                    {!!users && users.length >= 1
                        ?
                        users.map((user, index) => {
                            return (
                                <Grid key={index} item xs>
                                    <UserCard
                                        index={index}
                                        id={user.uuid}
                                        url={user.profileImage}
                                        title={user.firstName}
                                        role={user.isAdmin}
                                        status={user.isActive}
                                        parent={"user"}
                                    />
                                </Grid>
                            )
                        })
                        :
                        <Spinner />
                    }
                </Grid>
            </Grid>
        </>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "22px",
        },
        addImagerow: {
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "40px"
        },
        inputContainer: {
            marginTop: "40px"
        },
        addButton: {
            width: "185px",
            height: "40px",
            borderRadius: "5px",
            background: Colors.themeBlue,
        },
        addButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        }
    })
);

Users.defaultProps = {};

export default Users;
