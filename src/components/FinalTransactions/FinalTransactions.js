import { supabase } from '../../supabase'

export const FinalTransactions = () => {
    
    async function getFinalTransactions() {

        let { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq('status', 'FINAL')
            .eq('processed', false)
            .order("id", { ascending: false });
        if (error) {
            console.log("error: ", error);
        } else {
            console.log(data)
            return(data)
        }
    };

    return {
        getFinalTransactions
    }



}