const User = require("../models/userSchema");

exports.userDetail = async (req , res) =>{

    try{

        // select -password means this will exclude the password field 
        const allUser = await User.find({}).select('-password');
        // allUser = allUser.password = undefined;
        console.log(allUser);
        console.log(allUser.password);
        return res.status(200).json({
            success : true,
            message : "All users are fetched",
            data : allUser
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Error occur while fetching Owner detail"
        })
    }


}