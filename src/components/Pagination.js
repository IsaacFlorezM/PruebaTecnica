import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomPagination(props) {
  const classes = useStyles();

  const handleChange = (event, value) => {
    props.onChange(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={props.count} page={props.page} onChange={handleChange} color="primary" />
    </div>
  );
}
