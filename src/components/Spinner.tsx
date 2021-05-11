import React from "react";
import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props { }

const Loader: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.loadingContainer}>
        <CircularProgress className={classes.spinner} size={"large"} color="primary" />
        <h3>Loading....</h3>
      </div>
    </>
    )
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      position: "absolute",
      left: "50%",
      top: "50%",
    },
    spinner: {
      width: "100%",
    }
  })
)

Loader.defaultProps = {};


export default Loader;
