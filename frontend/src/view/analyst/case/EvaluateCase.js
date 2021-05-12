import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
import { DataGrid } from '@material-ui/data-grid';
import { useHistory, useParams } from "react-router-dom";
import LeftNavigation from '../common/LeftNavigation';
import Footer from '../common/Footer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
    fixedHeight: {
        height: 240,
    },
}));

export default function EvaluateCase() {
    const classes = useStyles();

    const { id } = useParams();

    return (
        <div className={classes.root}>
            <LeftNavigation title={`EVALUAR CASO ${id}`} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Datos del cliente
                                </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormHelperText>Monto solicitado</FormHelperText>
                                    <TextField
                                        required
                                        fullWidth
                                        id="number_id"
                                        name="number_id"
                                        autoComplete="id"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormHelperText>Destino del crédito</FormHelperText>
                                    <TextField
                                        required
                                        fullWidth
                                        id="number_id"
                                        name="number_id"
                                        autoComplete="id"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormHelperText>Formato de solicitud</FormHelperText>
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
                                    <FormHelperText>Imagen de inmueble</FormHelperText>
                                    <TextField
                                        required
                                        fullWidth
                                        id="number_id"
                                        name="number_id"
                                        autoComplete="number_id"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>
                                Evaluación
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormHelperText>Observaciones</FormHelperText>
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
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => { }}
                                >
                                    Aprobar
                                    </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={() => { }}
                                >
                                    Rechazar
                                    </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Container>
            </main>
            <Footer />
        </div >
    );
}