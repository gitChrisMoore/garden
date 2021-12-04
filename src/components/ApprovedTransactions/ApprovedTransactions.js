// import { useState, useEffect } from 'react'
import { supabase } from '../../supabase'

export const ApprovedTransactions = () => {
    // const [approvedTransactions, setApprovedTransactions] = useState([])
    
    // const getApprovedTransactions = async () => {
    async function getApprovedTransactions() {

        let { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq('status', 'APPROVED')
            .eq('processed', false)
            .order("id", { ascending: false });
        if (error) {
            console.log("error: ", error);
        } else {
            console.log(data);
            // return data
            // return setTransactions(data);
            // setApprovedTransactions(data);
            return(data)
            // console.log(data)
        }
    };


    const createApprovedTransaction = async (tx) => {
        console.log("createTransaction - start: ", tx)

        let { data: res, error } = await supabase
            .from("transactions")
              .insert(tx)
              .single();
        if (error) {
            console.log("createTransaction - error: ", error);
            console.log(error)
        } else if (res) {
            console.log("createTransaction - success ")
            console.log(res)
            
        }
    };

    const updateApprovedTransactionProcessed = async (id) => {
        // console.log("createTransaction - start: ", tx)

        // console.log("Updating ID: ", id)
        let { data: res, error } = await supabase
            .from("transactions")
            .update({ processed: true})
            .match({ id: id })
            .select("*")
            .eq('id', id)
            .limit(1);
        if (error) {
            console.log("error", error);
            // console.log(error)
        } else if (res) {
            console.log("updated transaction : ")
            // console.log(res)
            // return
        }
    };

    return {
        // approvedTransactions,
        getApprovedTransactions,
        createApprovedTransaction,
        updateApprovedTransactionProcessed
    }



}