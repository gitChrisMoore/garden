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


import { ApprovedTransactions } from './ApprovedTransactions';
import {ApprovedTransactionsUseCases} from '../TransactionUseCases/ApprovedTransactionsUseCases'

export function CreateApprovedTransaction() {
    const {createApprovedTransaction, getApprovedTransactions} = ApprovedTransactions()
    const [approvedTransactions, setApprovedTransactions] = useState([])
    const {processApprovedTransactions} = ApprovedTransactionsUseCases()


    async function handleNewTransaction() {
        // e.preventDefault()
        let transaction = {
            user_id: '407b160f-48eb-4d8e-8e4e-486c2ad5a74c',
            account_number: '407b160f-48eb-4d8e-8e4e-486c2ad5a74c',
            amount: 55.00,
            balance: 0.00,
            prior_balance: 0.00,
            type: "FUNDS_ADD",
            source: "Web",
            status: "APPROVED",
            processed: false
        }
        createApprovedTransaction(transaction)
    }

    async function handleUpdateApprovedTransactions() {
        // e.preventDefault()
        // getApprovedTransactions()
        // const fish = await getApprovedTransactions().then(response => response.json());
        const txs = await getApprovedTransactions()
        setApprovedTransactions(txs)
    }

    async function handleProcessApprovedTransactions() {
        // e.preventDefault()
        // getApprovedTransactions()
        // const fish = await getApprovedTransactions().then(response => response.json());
        const res = await processApprovedTransactions().catch(e => console.log('Error: ', e.message));
        console.log(res)
        // if(res)
        // setApprovedTransactions(txs)
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
                Create Transaction
                </ListSubheader>
            }
        >
            <Divider />

            <ListItem button key='2' onClick={handleNewTransaction}>
                <ListItemText primary='Create New Approved Transaction' />
            </ListItem>
            
            <Divider />
            <ListItem button key='3' onClick={handleUpdateApprovedTransactions}>
                <ListItemText primary='Get All Approved Transactions' />
            </ListItem>

            <Divider />
            <ListItem button key='4' onClick={handleProcessApprovedTransactions}>
                <ListItemText primary='Process Approved Transactions' />
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
                {approvedTransactions.map((row) => (
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