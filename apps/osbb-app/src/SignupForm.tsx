import React from 'react';
import { useFormik } from 'formik';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { User } from './User';
import { pickBy, identity } from 'lodash';

const clearObj = (obj: any) =>
  pickBy(obj, identity);

export interface Property {
  id?: string;
  name: string;
  type: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

interface SignupFormProps {
  user: User;
  onSubmit: () => void;
  onCancel: () => void;
}

export const SignupForm = ({user, onSubmit, onCancel}: SignupFormProps) => {
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      patName: '',
      phone: '',
      email: '',
      ...clearObj(user)
    },
    enableReinitialize: true,
    onSubmit,
  });
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="lastName"
            label="Прізвище"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="firstName"
            label="Ім'я"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="patName"
            label="По-батькові"
            name="patName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.patName}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Ел. адреса"
            onChange={formik.handleChange}
            value={formik.values.email}
            style={{width:'100%'}}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            style={{width:'100%'}}
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            inputComponent={TextMaskCustom as any}
            value={formik.values.phone}
          />
        </Grid>
      </Grid>
      <Button type="submit" color="primary">Submit</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </form>
  );
};
