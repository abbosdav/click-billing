const crypto = require("crypto");
class Click{
    constructor(options){
        this.options = options;
    }

    

    create_obj_val(req = {}, order = {}){
        let { click_trans_id,
            service_id,
            click_paydoc_id,
            merchant_trans_id,
            amount,
            action,
            error,
            error_note,
            sign_time,
            sign_string,
            merchant_prepare_id
        } = req;

        if((!click_trans_id || !service_id || !click_paydoc_id || !merchant_trans_id || !amount || !action || !error || !error_note || !sign_time || !sign_string ) || (action == '1' && !merchant_prepare_id)){
            return {
                error: '-8',
                error_note: 'Error in request from click'
            }
        }
    
        if(!merchant_prepare_id){
            merchant_prepare_id = ''
        }
    
        const signString = click_trans_id.toString()+service_id+this.options.secret_key+merchant_trans_id+merchant_prepare_id+amount+action+sign_time;
        
        const hash = crypto.createHash('md5').update(signString).digest('hex');
    
        
        if(hash != sign_string){
            return {
                error: '-1',
                error_note: 'Sign check failed'
            }
        }
    
        if((parseFloat(amount) - parseFloat(order.amount)) > 0.01){
            return {
                error: '-2',
                error_note: 'Incorrect parameter amount'
            }
        }
    
    
        if(order.status == 2){
            return {
                error: '-4',
                error_note: "Already paid"
            }
        }
    
        if(!order._id){
            return {
                error: '-5',
                error_note: "User does not exist"
            }
        }
    
        if(action == 1){
            if(order._id != merchant_prepare_id){
                return {
                    error: '-6',
                    error_note: 'Transaction not found'
                }
            }
        }
    
        if(parseInt(error) < 0){
            return {
                error: '-9',
                error_note: "Transaction cancelled"
            }
        }

        if(action == 0){
            return {
                error: 0,
                error_note: "Success",
                click_trans_id: click_trans_id,
                merchant_trans_id: merchant_trans_id,
                merchant_prepare_id: merchant_trans_id
            }
        }
    
    
        return {
            error: 0,
            error_note: "Success",
            click_trans_id: click_trans_id,
            merchant_trans_id: merchant_trans_id,
            merchant_prepare_id: merchant_prepare_id,
            merchant_confirm_id: merchant_prepare_id,
        }
    }
}

module.exports = Click;