const validateInsertPurchase = (req,res,next)=>{
    const data = req.body
    console.log("validation cinoket");
    next()
}

module.exports={validateInsertPurchase}