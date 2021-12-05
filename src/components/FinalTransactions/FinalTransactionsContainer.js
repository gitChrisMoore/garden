import * as React from 'react';
import { useState } from 'react'

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';


import { FinalTransactions } from './FinalTransactions';


export function FinalTransactionsContainer() {
    const {getFinalTransactions} = FinalTransactions()
    const [finalTransactions, setFinalransactions] = useState([])


    async function handleUpdateFinalTransactions() {
        const txs = await getFinalTransactions()
        setFinalransactions(txs)
    }

  return (
    <div>
        <Grid display= 'flex' p={2}>
        <Box sx={{ flexGrow: 1 }} >
        <Paper
                  sx={{
                    p: 1,
                    md: 8,
                  }}
        >
        <List
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Final Transactions
                </ListSubheader>
            }
        >
            
            <Divider />
            <ListItem button key='1' onClick={handleUpdateFinalTransactions}>
                <ListItemText primary='Get All Final Transactions' />
            </ListItem>
        
        </List>
        </Paper>
        </Box>
        </Grid>



        <Grid display= 'flex' p={2}>
        <Box sx={{ flexGrow: 1 }} >
        <Paper 
        sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',

        }}>
        {/* <Title>Recent Activity</Title> */}
        
        
            <TableContainer>

            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Type</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {finalTransactions.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {moment(row.effective_date).format('l')}
                        </TableCell>
                        <TableCell align="right">
                            {`$${Number(row.amount).toFixed(2)}`}
                        </TableCell>
                        <TableCell align="right">
                            {row.type}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
        </Box>
        </Grid>



    </div>
  );
}