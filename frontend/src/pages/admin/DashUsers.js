import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { allUserAction } from '../../redux/actions/userAction';

const DashUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, [dispatch]); // Added dispatch to the dependency array

    const { users, loading } = useSelector(state => state.allUsers);

    // Safely handle the users array, even if it's undefined or empty
    const data = users && users.length > 0 ? users : [];

    // Placeholder function for deleting user by ID
    const deleteUserById = (e, id) => {
        console.log(id);
    };

    const columns = [
        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'User Status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular User"
            )
        },
        {
            field: 'createdAt',
            headerName: 'Creation Date',
            width: 200,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
            ),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                All Users
            </Typography>

            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}>
                    Create User
                </Button>
            </Box>

            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'white',
                            },
                            color: 'white',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.secondary.main,
                            },
                            button: {
                                color: '#ffffff',
                            },
                        }}
                        getRowId={(row) => row._id}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                        slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default DashUsers;
