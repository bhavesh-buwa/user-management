import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { RoleContext } from '../contexts/RoleContext'
import Home from './Home';

export default function Roles() {

    const { rolesList, dispatch } = useContext(RoleContext);

    const [newRole, setNewRole] = useState('');

    const addNewRole = () => {
        if (newRole.length > 0) {
            dispatch({
                type: 'GET_ROLES',
                newRole: {
                    id: Math.floor((Math.random() * 100) + 1),
                    name: newRole
                }
            })
            setNewRole('');
        } else {
            alert('Please enter valid role!');
        }
    }

    const rolesHtml = rolesList.length ? (
        rolesList.map(role => {
            return (
                <ListItem key={role.id}>
                    <ListItemAvatar>
                        <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={role.name}></ListItemText>
                </ListItem>
            )
        })
    ) : (
        <ListItem>
            <ListItemText primary="No roles created yet!"></ListItemText>
        </ListItem>
    )

    return (
        <>
            <Home></Home>
            <div className='container'>
                <Box component="form">
                    <TextField variant="outlined" label="Role" size="small" sx={{ m: 2 }} value={newRole} onChange={(e) => {
                        setNewRole(e.target.value)
                    }} />
                    <Button variant="contained" size="medium" sx={{ m: 2 }} onClick={addNewRole}>Add New Role</Button>
                </Box>
            </div>
            <div className='container'>
                <List>
                    {rolesHtml}
                </List>
            </div>
        </>
    )
}
