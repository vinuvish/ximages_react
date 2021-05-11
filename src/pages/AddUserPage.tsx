import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';
import ImagePicker from "../components/ImagePicker";
import Input from "../components/Common/Textfield/CustomTextField";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import TextField from "../components/ZTextField";
import SnackBar from "../components/Common/SnackBar";
import Colors from "../styles/Colors";
import { FirestoreService } from "../Firebase/FirestoreService";
import { firebase, db } from '../Firebase/firebase';
import { useForm } from 'react-hook-form';
import { createUser } from '../api';

type FormData = {
};

interface Props { };

const imageResizeFileUri = ({ file }: { file: File }) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            700,
            700,
            'JPEG',
            95,
            0,
            (uri: string) => {
                resolve(uri);
            },
            'base64'
        );
    });

const AddUserPage: React.FC<Props> = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = React.useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackBarVariant, setSnackBarVariant] = React.useState("success");
    const [image, setImage] = React.useState([])
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isActive, setIsActive] = React.useState<boolean>(true);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    const [imageFile, setImageFile] = React.useState<File | null>();
    const [imageStr, setImageStr] = React.useState<string | null>();
    const { errors, handleSubmit, control } = useForm<FormData>({});

    const setImageCallback = (value: []): void => {
        setImage(value);
    }

    const onSubmit = async (data: FormData) => {

        setIsLoading(true);

        //removed if value use from object
        let imageFile = image[0];

        let downloadUrl;
        let imageUri;

        if (imageFile) {
            imageUri = (await imageResizeFileUri({ file: imageFile })) as string;

            const storageRef = firebase
                .storage()
                .ref()
                .child('users')
                .child(`${uuidv4()}.jpeg`);

            if (imageUri) {
                await storageRef.putString(imageUri, 'data_url');
                downloadUrl = await storageRef.getDownloadURL();
            }
        }

        const userData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "isActive": isActive,
            "isAdmin": isAdmin,
            "timestampRegister": new Date(),
            "profileImage": !!downloadUrl ? downloadUrl : "",
        }

        createUser(userData)
            .then((res) => {
                console.log("user added ######", res)
                setIsLoading(false);
                setShowSnackBar(true);
                setSnackBarMessage("User created successfully!")
                setSnackBarVariant("success")
            })
            .catch((err) => {
                console.log("error adding user ######", err)
                setIsLoading(false);
                setShowSnackBar(true);
                setSnackBarMessage("Error creating user!")
                setSnackBarVariant("error")
            })
    }

    async function updateImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            if (event.target.files[0]) {
                setImageFile(event.target.files[0]);
                setImageStr(URL.createObjectURL(event.target.files[0]));
            }
        }
    }

    const classes = useStyles();
    return (
        <>
            <div className={classes.form}>
                <Typography className={classes.heading}>
                    New User
                </Typography>
                <div className={classes.container}>
                    <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.imageInputContainer}>
                            <ImagePicker
                                image={image}
                                setImage={setImageCallback}
                                required={true}
                            />
                        </div>

                        <div className={classes.inputContainer}>
                            <Input
                                required
                                id="first-name"
                                value={firstName}
                                placeholder={"First Name"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <Input
                                required
                                id="last-name"
                                value={lastName}
                                placeholder={"Last Name"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <Input
                                required
                                id="user-email"
                                type="email"
                                value={email}
                                placeholder={"Email"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <Input
                                required
                                id="user-password"
                                type="password"
                                value={password}
                                placeholder={"Password"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                        <div className={classes.checkboxContainer}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={() => setIsAdmin(!isAdmin)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Admin"
                            />
                        </div>
                        <div className={classes.checkboxContainer}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Active"
                            />
                        </div>
                        <Button type='submit' className={classes.saveButton} variant="contained" color="secondary">
                            <Typography className={classes.saveButtonText}>
                                Save
                        </Typography>
                        </Button>
                    </form>
                </div>
            </div>
            {isLoading && (
                <LoadingSpinner
                    loading={true}
                />
            )}
            {showSnackBar && (
                <SnackBar
                    open={showSnackBar}
                    message={snackBarMessage}
                    onClose={() => setShowSnackBar(false)}
                    variant={snackBarVariant}
                    autoHideDuration={2000}
                />
            )}
        </>
    )
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            margin: "50px 0 50px 0px",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        heading: {
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "70px",
        },
        imageInputContainer: {
            width: "370px",
            height: "200px",
            marginBottom: "40px",
        },
        checkboxContainer: {
            marginBottom: "40px",
        },
        inputContainer: {
            width: "370px",
        },
        saveButton: {
            width: "370px",
            height: "50px",
            borderRadius: "5px",
            background: Colors.themePink,
        },
        saveButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        },
    })
);

AddUserPage.defaultProps = {};

export default AddUserPage;
