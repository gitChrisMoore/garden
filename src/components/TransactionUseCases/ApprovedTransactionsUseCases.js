import { ApprovedTransactions } from "../ApprovedTransactions/ApprovedTransactions";
import { Balances } from "../Balances/Balances";



export const ApprovedTransactionsUseCases = () => {
    const { createApprovedTransaction, 
            getApprovedTransactions,
            updateApprovedTransactionProcessed} = ApprovedTransactions()

    const {getCurrentBalance} = Balances()


    async function processApprovedTransactions() {

        // console.log('Begining process approved Transactions ')
        const approvedTxs = await getApprovedTransactions().catch(e => console.log('Error: ', e.message));
        
        if(approvedTxs.length >0) {
            console.log("found approved transactions")
            // console.log(approvedTxs)
            handleApprovedTxLoop(approvedTxs)
            // const res = await handleApprovedTxLoop(approvedTxs).catch(e => console.log('Error: ', e.message));
        }
        
    }

    async function handleApprovedTxLoop(array) {
        console.log('handleApprovedTxLoop')
        for (const item of array) {
            // console.log("Loop Array")
            // console.log(item)
            // handleApprovedUsecase(item)
            // let res = await handleApprovedUsecase(item)

            // await new Promise(next=> {
            //     handleApprovedUsecase(item, function(err, data){
            //         /*.... code here and when you finish...*/
            //         console.log(err)
            //         console.log('data')
            //         next()
            //     })
            // })        

            await handleApprovedUsecase(item)

            // if (error) console.log('error')
            // console.log(res)
            // handleApprovedUsecase(item).then(() => {
            //     // let objectURL = URL.createObjectURL(blob);
            //     // let image = document.createElement('img');
            //     // image.src = objectURL;
            //     // document.body.appendChild(image);
            //     console.log('handle 1')
            //     console.log item
            // }).catch(e => console.log(e));

        }
        console.log('Loop Complete')
        
    }

    
    async function handleApprovedUsecase( tx ) {

        console.log('UseCase Start')
        // console.log(tx)
        // let uc_uid = tx.user_id

        const currentAccount = await getCurrentBalance(tx.user_id).catch(e => console.log('Error: ', e.message));
        
        
        // console.log(currentAccount)

        if(tx.type === "FUNDS_ADD") {
            
            try {
                if(currentAccount.balance) {
                    await handleAddFundsExisting(tx, currentAccount);
                }
            } catch (e) {
                await handleAddFundsNewAccount(tx);
            }
            
        } else {
            console.log('NOT A ADD FUNDS')
        }
        
    }

    //
    //
    //
    //
    //
    async function handleAddFundsExisting(tx, account) {

        console.log('FUNDS_ADD - EXISTING BALANCE')
        console.log(tx.id)
        
        await updateApprovedTransactionProcessed(tx.id).catch(e => console.log('Error: ', e.message));
        let transaction = {
            user_id: tx.user_id,
            account_number: tx.account_number,
            amount: tx.amount,
            balance: tx.amount + account.balance,
            prior_balance: account.balance,
            type: "FUNDS_ADD",
            source: "Web",
            status: "FINAL",
            processed: false
        }
        const newTx = await createApprovedTransaction(transaction).catch(e => console.log('Error: ', e.message));
        return newTx

    }

    async function handleAddFundsNewAccount(tx) {

        console.log('FUNDS_ADD - NEW ACCOUNT')
        console.log(tx.id)
        
        await updateApprovedTransactionProcessed(tx.id).catch(e => console.log('Error: ', e.message));
        let transaction = {
            user_id: tx.user_id,
            account_number: tx.account_number,
            amount: tx.amount,
            balance: tx.amount,
            prior_balance: 0.00,
            type: "FUNDS_ADD",
            source: "Web",
            status: "FINAL",
            processed: false
        }
        const newTx = await createApprovedTransaction(transaction).catch(e => console.log('Error: ', e.message));
        return newTx

    }



    return {
        processApprovedTransactions
    }

}