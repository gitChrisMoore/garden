import * as React from 'react';

import { Login } from './login/Login';

import { ApprovedTransactionsContainer } from './ApprovedTransactions/ApprovedTransactionsContainer'
import { FinalTransactionsContainer } from './FinalTransactions/FinalTransactionsContainer';

export function Dashboard() {

    return (
    <>
        dashboard
        <br />

        <Login />
        <ApprovedTransactionsContainer />

        <FinalTransactionsContainer />
    
    </>
    )
}