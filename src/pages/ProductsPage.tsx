import * as React from 'react';
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid } from '@material-ui/core';
import Input from "../components/Common/Textfield/CustomTextField";
import ImageCard from "../components/ImageCard";
import Spinner from "../components/Spinner";
import Colors from "../styles/Colors";
import {FirestoreService} from "../Firebase/FirestoreService";
import { Product } from '../models/product';

interface Props { }

const Products: React.FC<Props> = () => {
    const [searchInput, setSearchInput] = React.useState("")
    const [products, setProducts] = React.useState<Product[]>();
    const classes = useStyles();
    
    React.useEffect(() => {
        FirestoreService.getProducts()
        .then((res) => {
            console.log("res ######", res)
            setProducts(res)
        })
        .catch((err) => {
            console.log("error ######", err)
        })
    }, [])

    return (
        <>
            <div className={classes.inputContainer}>
                <Input
                    id="product-search"
                    value={searchInput}
                    placeholder={"Search products..."}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchInput(e.target.value)}
                    customClassName="whiteInput"
                />
            </div>
            <div className={classes.addImagerow}>
                <Typography className={classes.heading}>
                    Images
                </Typography>
                <Link to="/dashboard/addProduct">
                    <Button className={classes.addButton} variant="contained" color="primary">
                        <Typography className={classes.addButtonText}>
                            New Product
                    </Typography>
                    </Button>
                </Link>
            </div>
            <Grid container direction="row" spacing={0}>
                <Grid container spacing={1}>
                    {!!products && products.length >= 1
                        ?
                        products.map((product, index) => {
                        return (
                            <Grid key={index} item xs>
                                <ImageCard
                                    index={index}
                                    id={product.uuid}
                                    url={product.images[0]}
                                    title={product.name}
                                    status={false}
                                    parent={"product"}
                                    role={null}
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
        imageContainer: {
            marginTop: "10px",
            marginBottom: "50px"
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
        },
    })
);

Products.defaultProps = {};

export default Products;
