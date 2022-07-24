import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../contexts/UserContext';

const Home =() => {

    const navigate = useNavigate();

    const { dispatch, usersList } = useContext(UserContext);

    // Fetch users
    if (usersList.length === 0) {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(result => {
            // Default values for role and feature access
            for (let item of result.data) {
                item['role'] = 'Default';
                item['feature1'] = {
                    read: true,
                    write: false
                }
                item['feature2'] = {
                    read: true,
                    write: true
                }
            }
            dispatch({
                type: 'GET_USERS',
                usersList: result.data
            });
            localStorage.setItem('users', JSON.stringify(result));
        });
    }

    const loadUsers = () => {
        navigate('/users');
    }

    const loadRoles = () => {
        navigate('/roles');
    }

    return (
        <div className='container'>
            <Button variant="contained" sx={{ m: 2 }} onClick={loadUsers}>Users</Button>
            <Button variant="contained" sx={{ m: 2 }} onClick={loadRoles}>Roles</Button>
        </div>
    )
}

export default Home;
