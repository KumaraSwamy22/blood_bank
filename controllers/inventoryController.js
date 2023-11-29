const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req,res)=>{
    try {
        const {email,inventoryType} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error('user not found');
        }
        if(inventoryType === 'in' && user.role !== 'donar'){
            // return throw new Error('Not a donar account')
            throw new Error('Not a donar account');
        }
        if(inventoryType === 'out' && user.role !== 'hospital'){
            // return throw new Error('Not a hospital')
            throw new Error('Not a hospital');
        }
        //save inventory
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        res.status(201).send({
            success:true,
            message : "new blood record added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in creating inventory api",
            error
        });
    }
};


//get all blood records 
// const getInventoryController = async (req,res)=>{
//     try {
//         const inventory = await inventoryModel.find({organisation:req.body.userId}) 
//         return res.status(200).send({
//             success:true,
//             message:"got all records successfully",
//             inventory
//         });     
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({
//             success:false,
//             message:"error in get all inventory",
//             error
//         });
//     }
// };

const getInventoryController = async (req, res) => {
    try {
      const inventory = await inventoryModel
        .find({
          organisation: req.body.userId,
        })
        .populate("donar")
        .populate("hospital")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get all records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get All Inventory",
        error,
      });
    }
  };


module.exports = {createInventoryController,getInventoryController};