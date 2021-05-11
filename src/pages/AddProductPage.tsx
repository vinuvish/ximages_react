import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import ImagePicker from "../components/ImagePicker";
import Input from "../components/Common/Textfield/CustomTextField";
import Colors from "../styles/Colors"
import LoadingSpinner from "../components/Common/LoadingSpinner";
import TextField from "../components/ZTextField";
import SnackBar from "../components/Common/SnackBar";
import { FirestoreService } from "../Firebase/FirestoreService";
import { firebase, db } from '../Firebase/firebase';
import { useForm } from 'react-hook-form';

import Resizer from 'react-image-file-resizer';
import { v4 as uuidv4 } from 'uuid';

interface Props { }

type FormData = {};

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

const AddProductPage: React.FC<Props> = (props: any) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = React.useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackBarVariant, setSnackBarVariant] = React.useState("success");
    const [images, setImages] = React.useState([] as any);
    const [name, setName] = React.useState("");
    const [vsadr, setVsadr] = React.useState("");
    const [isActive, setIsActive] = React.useState<boolean>(true);

    const { errors, handleSubmit, control } = useForm<FormData>({});

    const setImageCallback = (value: []): void => {
        setImages([...images, value]);
    }

    const onSubmit = async (data: FormData) => {

        setIsLoading(true);

        let imagesArray: string[] = [];

        for await (const image of images) {
            console.log("#####", image);

            let imageFile = image[0];

            let downloadUrl;
            let imageUri;

            if (imageFile) {
                imageUri = (await imageResizeFileUri({ file: imageFile })) as string;

                console.log("imageUri", imageUri);

                const storageRef = firebase
                    .storage()
                    .ref()
                    .child('products')
                    .child(`${uuidv4()}.jpeg`);

                if (imageUri) {
                    await storageRef.putString(imageUri, 'data_url');
                    downloadUrl = await storageRef.getDownloadURL();
                }
            }
            imagesArray.push(downloadUrl)
        }

        const productData = {
            "name": name,
            "timestampAdded": new Date(),
            "images": !!imagesArray ? imagesArray : "",
            "isActive": isActive,
        }
        FirestoreService.addProduct(productData)
            .then((res) => {
                console.log("user added ######", res)
                setIsLoading(false);
                setShowSnackBar(true);
                setSnackBarMessage("Product added successfully!")
                setSnackBarVariant("success")
            })
            .catch((err) => {
                console.log("error adding user ######", err)
                setIsLoading(false);
                setShowSnackBar(true);
                setSnackBarMessage("Error adding product!")
                setSnackBarVariant("error")
            })
    }

    const count = 9;
    const classes = useStyles();
    return (
        <>
            <div className={classes.form}>
                <Typography className={classes.heading}>
                    New Product
                </Typography>
                <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.container}>
                        <div className={classes.inputContainer}>
                            <Input
                                id="product-name"
                                value={name}
                                placeholder={"Product Name"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <Input
                                id="Vsadr32"
                                value={vsadr}
                                placeholder={"Vsadr32"}
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setVsadr(e.target.value)}
                                customClassName="whiteInput"
                            />
                        </div>
                    </div>
                    <Grid container spacing={0} className={classes.imageContainer}>
                        <Grid
                            // className={classes.leftContainer}
                            lg={12} md={12} sm={12} xs={12}
                            item
                        >
                            <Grid container spacing={0}
                            // className={classes.cardsContainer}
                            >
                                {[...Array(count)].map((e, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            className={classes.cards}
                                            lg={4} md={4} sm={6} xs={6}
                                            container
                                            item
                                        >
                                            <ImagePicker
                                                image={images}
                                                setImage={setImageCallback}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button type='submit' className={classes.saveButton} variant="contained" color="secondary">
                        <Typography className={classes.saveButtonText}>
                            Save
                        </Typography>
                    </Button>
                </form>
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
        },
        heading: {
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "70px",
        },
        inputContainer: {
            width: "370px",
            marginRight: "60px"
        },
        imageContainer: {
            marginTop: "10px",
            marginBottom: "50px"
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
        cards: {
            margin: "0 0px 40px 0",
            minHeight: "200px",
        }
    })
);

AddProductPage.defaultProps = {};

export default AddProductPage;
