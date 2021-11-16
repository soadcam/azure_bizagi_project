import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import LeftNavigation from '../common/LeftNavigation';
import Footer from '../common/Footer';
import { getRequest } from "../../../helper/handleRequest";

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
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function ListCases() {
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    let history = useHistory();

    useEffect(() => {
        const getCases = async () => {
            const url = path.join('/credit', 'analyst');
            const cases = await getRequest(url, history);
            if (cases)
                setRows(cases.map(function(row) {
                    return { ...row, id : row.credit_id }
                }));
        }
        getCases();
    }, [history]);

    const columns = [
        { field: 'credit_id', headerName: 'Id', width: 100 },
        { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
        { field: 'identity_number', headerName: 'Número de Identificación', width: 250 },
        { field: 'amount_requested', headerName: 'Monto Solicitado', width: 200 },
        { field: 'date_requested', headerName: 'Fecha de Solicitud', width: 200 },
        {
            field: 'eval', headerName: 'Acciones', width: 150,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {redirectToEvaluateCase(params.id)}}
                    >
                        Evaluar
              </Button>
                </strong>
            )
        }
    ];

    function redirectToEvaluateCase(id) {
        history.push(`/case/${id}`);
    }

    return (
        <div>
            <div className={classes.root}>
                <LeftNavigation title="CASOS" />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <div style={{ height: 250, width: '100%' }}>
                            <DataGrid
                                columns={columns}
                                rows={rows}
                            />
                        </div>
                    </Container>
                </main>
            </div >
            <Footer />
        </div>
    );
}