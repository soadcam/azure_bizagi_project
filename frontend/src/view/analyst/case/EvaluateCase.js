import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CloudDownloadTwoToneIcon from '@material-ui/icons/CloudDownloadTwoTone';
import { useHistory, useParams } from "react-router-dom";
import LeftNavigation from '../common/LeftNavigation';
import Footer from '../common/Footer';
import { getDownloadFile, getRequest, postRequest } from "../../../helper/handleRequest";

var path = require('path');

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
    const [amountRequested, setAmountRequested] = useState('');
    const [comments, setComments] = useState('');
    const [formatCreditUrl, setFormatCreditUrl] = useState('');
    const [propertyUrlModified, setPropertyUrlModified] = useState('');
    const [evaluationComments, setEvaluationComments] = useState('');

    let history = useHistory();

    const classes = useStyles();

    const { id } = useParams();

    useEffect(() => {
        async function getCase() {
            const url = path.join('/credit', id);
            const result = await getRequest(url, history);
            setAmountRequested(result.amount_requested);
            setComments(result.comments);
            setFormatCreditUrl(result.format_credit_url);
            setPropertyUrlModified(result.property_url_modified);
        }
        getCase();
    }, [], id)

    async function downloadFormatFile(fullPath) {
        if (fullPath) {
            const url = path.join('/credit', id, 'download', 'format');
            const fileName = fullPath.split(/(\\|\/)/g).pop();
            await getDownloadFile(url, fileName, history);
        }
    }

    async function downloadPropertyFile(fullPath) {
        if (fullPath) {
            const url = path.join('/credit', id, 'download', 'property');
            const fileName = fullPath.split(/(\\|\/)/g).pop();
            await getDownloadFile(url, fileName, history);
        }
    }

    async function evaluateCredit(isApproved) {
        const url = path.join('/credit', 'evaluate');
        await postRequest(url, history, {
            'credit_id': id,
            'is_approved': isApproved,
            'comments': evaluationComments,
        });
        history.push("/cases");
    }

    return (
        <div>
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
                                            id="amount"
                                            name="amount"
                                            autoComplete="amount"
                                            value={amountRequested}
                                            aria-readonly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Destino del crédito</FormHelperText>
                                        <TextField
                                            required
                                            fullWidth
                                            id="comments"
                                            name="comments"
                                            autoComplete="comments"
                                            value={comments}
                                            aria-readonly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Formato de solicitud</FormHelperText>
                                        <CloudDownloadTwoToneIcon
                                            color="primary"
                                            fontSize="large"
                                            onClick={() => downloadFormatFile(formatCreditUrl)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormHelperText>Imagen de inmueble</FormHelperText>
                                        <CloudDownloadTwoToneIcon
                                            color="primary"
                                            fontSize="large"
                                            onClick={() => downloadPropertyFile(propertyUrlModified)} />
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
                                            value={evaluationComments}
                                            onChange={(e) => setEvaluationComments(e.target.value)}
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
                                        onClick={() => evaluateCredit(true)}
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
                                        onClick={() => evaluateCredit(false)}
                                    >
                                        Rechazar
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Container>
                </main>
            </div >
            <Footer />
        </div>
    );
}