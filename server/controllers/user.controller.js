export const getCurrentUser = async(req,res)=>{
    try{
        if(!req.user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        return res.json(req.user)
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:`Get current user failed ${err.message}`
        })
    }
}