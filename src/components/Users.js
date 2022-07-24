import { Link, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { RoleContext } from '../contexts/RoleContext';
import { UserContext } from '../contexts/UserContext'
import Home from './Home';

export default function Users() {

    const navigate = useNavigate();

    const { usersList, dispatch } = useContext(UserContext);

    const { rolesList } = useContext(RoleContext);

    const handleRoleChange = (userId, changedRole) => {
        let oldUsersList = [...usersList];
        for (let i = 0; i < usersList.length; i++) {
            if (oldUsersList[i].id === userId) {
                oldUsersList[i].role = changedRole;
                break;
            }
        }
        dispatch({
            type: 'CHANGE_ROLE',
            updatedUsersList: oldUsersList
        });
        // Add API call here
        localStorage.setItem('users', JSON.stringify(oldUsersList));
    }

    const handleAccessChange = (userId, newAccessValue, accessType, feature) => {
        let oldUsersList = [...usersList];
        let featureName = 'feature' + feature;
        for (let i = 0; i < usersList.length; i++) {
            if (oldUsersList[i].id === userId) {
                oldUsersList[i][featureName][accessType] = newAccessValue;
                break;
            }
        }
        dispatch({
            type: 'CHANGE_ACCESS',
            updatedUsersList: oldUsersList
        });
        // Add API call here
        localStorage.setItem('users', JSON.stringify(oldUsersList));
    }

    const handleFeatureRedirect = (userid, feature) => {
        navigate('/feature' + feature + '/' + userid);
    }

    const users = usersList.length ? usersList.map(user => {
        return (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Link onClick={(e) => {
                        handleFeatureRedirect(user.id, '1')
                    }}>Feature 1</Link>
                    <br />
                    <input type="checkbox" id={`feature1_read_${user.id}`} checked={user.feature1.read} onChange={(e) => {
                        handleAccessChange(user.id, e.target.checked, 'read',  1)
                    }} />
                    <label htmlFor={`feature1_read_${user.id}`}>Read</label>
                    <br />
                    <input type="checkbox" id={`feature1_write_${user.id}`} checked={user.feature1.write} onChange={(e) => {
                        handleAccessChange(user.id, e.target.checked, 'write', 1)
                    }} />
                    <label htmlFor={`feature1_write_${user.id}`}>Write</label>
                </TableCell>
                <TableCell>
                <Link onClick={(e) => {
                        handleFeatureRedirect(user.id, '2')
                    }}>Feature 2</Link>
                    <br />
                    <input type="checkbox" id={`feature2_read_${user.id}`} checked={user.feature2.read} onChange={(e) => {
                        handleAccessChange(user.id, e.target.checked, 'read', 2)
                    }} />
                    <label htmlFor={`feature2_read_${user.id}`}>Read</label>
                    <br />
                    <input type="checkbox" id={`feature2_write_${user.id}`} checked={user.feature2.write} onChange={(e) => {
                        handleAccessChange(user.id, e.target.checked, 'write', 2)
                    }} />
                    <label htmlFor={`feature2_write_${user.id}`}>Write</label>
                </TableCell>
                <TableCell>
                    <Select size="small" value={user.role} onChange={(e) => {
                        handleRoleChange(user.id, e.target.value)
                    }}>
                        {
                            rolesList.length ? (rolesList.map(role => {
                                return (
                                    <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                                )
                            })) : (<MenuItem></MenuItem>)
                        }
                    </Select>
                </TableCell>
            </TableRow>
        )
    }) : (
        <TableRow>
            <TableCell>Loading...</TableCell>
        </TableRow>
    )

    return (
        <>
            <Home></Home>
            <div className='container'>
                <TableContainer>
                    <Table sx={{ width: 800 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Feature 1 Access (R/W)</TableCell>
                                <TableCell>Feature 2 Access (R/W)</TableCell>
                                <TableCell>Change Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
