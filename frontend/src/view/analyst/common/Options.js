import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from "react-router-dom";

export default function Items() {
    let history = useHistory();

    return (
        <div>
            <ListItem button onClick={() => { history.push("/cases"); }}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Casos" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => { history.push("/sign_out"); }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
            </ListItem>
        </div>
    );
}