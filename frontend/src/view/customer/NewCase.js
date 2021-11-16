import React, { useState, useEffect } from "react";
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
import { getRequestUnauthorized, postRequestUnauthorized, postFileUnauthorized } from "../../helper/handleRequest";

var path = require('path');

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
    const [fullname, setFullname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [identityTypeId, setIdentityTypeId] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [salary, setSalary] = useState('');
    const [ammountRequested, setAmmountRequested] = useState('');
    const [comments, setComments] = useState('');

    const [propertyFile, setPropertyFile] = useState(null);

    const [identityTypes, setIdentityTypes] = useState([]);

    const [showConfirmation, setShowConfirmation] = useState(false);

    let history = useHistory();
    const classes = useStyles();

    function redirectStartPage() {
        history.push("/");
    }

    async function confirmCaseCreated() {
        const formData = new FormData();
        formData.append('property', propertyFile[0])

        const urlUploadFile = path.join('/credit', 'property');
        const uploadResponse = await postFileUnauthorized(urlUploadFile, formData, history);
        const creditId = uploadResponse.credit_id;

        const urlRequestCredit = path.join('/credit');
        await postRequestUnauthorized(urlRequestCredit, history, {
            'customer' : {
                'fullname': fullname,
                'birthdate': birthdate,
                'identity_type': {
                    'identity_type_id': identityTypeId
                },
                'identity_number': identityNumber,
                'email': email,
                'phone': phone,
                'salary': salary
            },
            'amount_requested': ammountRequested,
            'comments': comments,
            'credit_id': creditId
        });

        setShowConfirmation(true);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const getIdentityTypes = async () => {
            const url = path.join('/parametric_entity', 'identity_type');
            const identityTypes = await getRequestUnauthorized(url, history);
            setIdentityTypes(identityTypes);
        }
        getIdentityTypes();
    }, [history]);

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
                                            value={fullname}
                                            onChange={e => setFullname(e.target.value)}
                                            autoFocus
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
                                            value={birthdate}
                                            onChange={e => setBirthdate(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Tipo de identificación</FormHelperText>
                                        <Select
                                            required
                                            fullWidth
                                            id="type_id"
                                            labelId="type_id"
                                            onChange={e => setIdentityTypeId(e.target.value)}
                                            defaultValue={''}
                                        >
                                            {identityTypes.map(item => (
                                                <option
                                                    key={item.identity_type_id}
                                                    value={item.identity_type_id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
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
                                            value={identityNumber}
                                            onChange={e => setIdentityNumber(e.target.value)}
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
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
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
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
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
                                            value={salary}
                                            onChange={e => setSalary(e.target.value)}
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
                                            value={ammountRequested}
                                            onChange={e => setAmmountRequested(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Inmueble</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="property"
                                            name="property"
                                            type="file"
                                            onChange={e => setPropertyFile(e.target.files)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormHelperText>Destino del crédito</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            multiline
                                            id="comments"
                                            name="comments"
                                            autoComplete="comments"
                                            value={comments}
                                            onChange={e => setComments(e.target.value)}
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
                                        disabled={!propertyFile}
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