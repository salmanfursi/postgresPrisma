import prisma from "../DB/db.config.js";

// get all user
export const fetchUser = async (req, res) => {
    const users = await prisma.user.findMany({
        //to get post also @relation between two model or table,retreiev data from multiple mngodb collection even you can also retereive specefic field from post  
        select: {
        _count: {
            Post: {
                select:{
                    title:true,
                    Comment:true
                }
            }
            }
        },
        // get data with asc or dsc
        orderBy:{
            id:"desc"
        }
    });
    return res.json({
        status: 200,
        data: users,
        message:'all users'
    });
};
// show single user 
export const showUser = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        },
        include: {
            Post: {
                select:{
                    title:true,
                    Comment:true
                }
            }
        }
    });
    return res.json({
        status: 200,
        data: user,
        msg: "single user hare"
    });
};

// create user 
export const createUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (findUser) {
        return res.json({ status: 400, message: "Email Already Taken. Please use another email." });
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
    
    return res.json({
        status: 200,
        data: newUser,
        msg: "User created successfully"
    });

};

// Update user 
export const updateUser = async (req, res) => {
    const userId = req.params.id
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name,
            email,
            password
        }
    });

    return res.json({
        status: 200,
        message: "User updated successfully"
    });

};
// delete user 
export const deleteUser = async (req, res) => {
    const userId = req.params.id

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        },
    });

    // If user not found, return an error message
    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "User not found",
        });
    }

    await prisma.user.delete({
        where: {
            id: Number(userId),
        },
    });

    return res.json({
        status: 200,
        message: "User deleted successfully"
    });

};