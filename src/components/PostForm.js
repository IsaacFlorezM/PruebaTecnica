import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function PostForm({ initialValues, onSubmit, loading }) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValues,
  });

  const onSubmitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmitHandler)}>
      <TextField
        name="title"
        label="Title"
        inputRef={register({ required: true })}
        error={!!errors.title}
        helperText={errors.title && "Title is required"}
      />
      <TextField
        name = "body"
        label = "Body"
        inputRef = {register({ required: true })}
        error={!!errors.body}
        helperText = {errors.body && "Body is required"}
        multiline
        rows = {4}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Save"}
      </Button>
    </form>
  );
}

export default PostForm;
