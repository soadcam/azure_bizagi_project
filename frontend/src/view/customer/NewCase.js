import React, { useState } from "react";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Visaji
          </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function NewCase() {
    const [showConfirmation, setShowConfirmation] = useState(false);

    let history = useHistory();
    const classes = useStyles();

    function redirectStartPage() {
        history.push("/");
    }

    function confirmCaseCreated() {
        setShowConfirmation(true);
        window.scrollTo(0, 0);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        VISAJI
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                showConfirmation &&
                <Alert variant="filled" severity="success">
                    El caso ha sido creado y será evaluado por uno de nuestro analistas. Al tener una respuesta, se notificará al correo.
                </Alert>
            }
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Solicitud
                    </Typography>
                    <React.Fragment>
                        <FormControl className={classes.formControl}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" gutterBottom>
                                    Datos del cliente
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Nombre completo</FormHelperText>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Fecha de nacimiento</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="birthday"
                                            type="date"
                                            autoComplete="birthday"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Tipo de identificación</FormHelperText>
                                        <Select
                                            required
                                            fullWidth
                                            id="type_id"
                                            labelId="type_id"
                                        >
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Número de identificación</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="number_id"
                                            name="number_id"
                                            autoComplete="id"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Número de identificación</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="number_id"
                                            name="number_id"
                                            autoComplete="id"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Correo</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Celular</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            type=""
                                            name="phone"
                                            autoComplete="phone"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Ingresos mensuales</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="number_id"
                                            name="number_id"
                                            autoComplete="number_id"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" gutterBottom>
                                    Datos del crédito
                            </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Monto solicitado</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="ammount"
                                            name="ammount"
                                            autoComplete="ammount"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Inmueble</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="ammount"
                                            name="ammount"
                                            type="file"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormHelperText>Comments</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            id="comments"
                                            name="comments"
                                            autoComplete="comments"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={confirmCaseCreated}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        onClick={redirectStartPage}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}