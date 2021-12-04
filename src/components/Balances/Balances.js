import { supabase } from '../../supabase'

export const Balances = () => {
    
    async function getCurrentBalance(req_user_id) {

        let { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq('user_id', req_user_id)
            .eq('status', 'FINAL')
            .limit(1)
            .single()
            .order("id", { ascending: false });
        if (error) {
            console.log("error", error);
        } else {
            // console.log("getBalanceByUID found transaction");
            // console.log(data)
            return(data)
        }
    };


    return {
        getCurrentBalance
    }



}