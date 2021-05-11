import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Colors from '../styles/Colors';
import { Typography } from '@material-ui/core';

interface Props {
    index: number,
    id: string,
    url: string,
    title: string,
    role: string | any,
    parent: string,
    status: boolean,
}

const ImageCard: React.FC<Props> = (props) => {
    const { index, id, url, title, role, parent, status } = props;
    const classes = useStyles();
    return (
        <div className={classes.container} key={index}>
            <img className={classes.image} src={!!url && url.length ? url : require("../assets/images/placeholder.jpg") } />
            <div className={classes.detailsContainer}>
                <Typography className={classes.title}>{title}</Typography>
                <div className={classes.statusContainer}>
                    <Typography className={classes.id}>{parent === "user" ? !!role ? "Admin" : "Viewer" : id}</Typography>
                    {
                        parent === "user" && (
                            !!status
                                ?
                                <Typography className={classes.statusActive}>Active</Typography>
                                :
                                <Typography className={classes.statusInActive}>In-Active</Typography>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: Colors.white,
            borderRadius: "10px",
            // height: "260px"
            minHeight: "260px",
            maxWidth: "215px",
            margin: "0 0px 40px 0",
            // border: "0.5px solid #707070",
        },
        image: {
            width: "215px",
            height: "185px",
            objectFit: "cover",
            borderRadius: "10px",
            overflow: "hidden"
        },
        detailsContainer: {
            padding: "10px"
        },
        title: {
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "22px",
            color: "black",
            paddingBottom: "10px"
        },
        id: {
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "19px",
            color: "black",
            paddingBottom: "5px"
        },
        statusActive: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            color: "#39AF78",
            paddingBottom: "5px",
            fontStyle: "italic"
        },
        statusInActive: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            color: "#c72c2c",
            paddingBottom: "5px",
            fontStyle: "italic"
        },
        statusContainer: {
            display: "flex",
            justifyContent: "space-between"
        }
    })
);

ImageCard.defaultProps = {};

export default ImageCard;
