import prisma from "../DB/db.config.js";

// get all user
export const fetchPost = async (req, res) => {
    const users = await prisma.post.findMany({
        include: {
            Comment:{
                include:{
                    user:{
                        select:{
                            name:true,
                            email:true
                        }
                    }
                }
            },
        },
        // get data with asc or dsc
        // orderBy:{
        //     id:"desc"
        // },
        // filter data with lessa and greter number
        // where:{
        //     comment_count:{
        //         lte:0
        //     }
        // }
        where:{
            title:{
                startsWith:"next"
            }
        }
    });
    return res.json({
        status: 200,
        data: users,
        message: "All post hare"
    });
};
// show single user 
export const showPost = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId)
        },
        include:{
            Comment:true
        }
    });
    if(!post){
        return res.json({
            status: 404,
            message: "user not found"
        });  
    }
    return res.json({
        status: 200,
        data: post,
        message: "single user hare"
    });
};

// create user 
export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;

    const newPost = await prisma.post.create({
        data: {
            user_id: Number(user_id),
            title,
            description
        }
    });
    return res.json({
        status: 200,
        data: newPost,
        msg: "post created "
    });

};

// Update user 
export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { user_id, title, description } = req.body;

    await prisma.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            user_id,
            title,
            description
        }
    });
    return res.json({
        status: 200,
        message: "User updated successfully"
    });

};
// delete user 
export const deletePost = async (req, res) => {
    const userId = req.params.id

    const post = await prisma.post.findUnique({
        where: {
            id: Number(userId),
        },
    });

    // If user not found, return an error message
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "post not found",
        });
    }

    await prisma.post.delete({
        where: {
            id: Number(userId),
        },
    });

    return res.json({
        status: 200,
        message: "post deleted successfully"
    });

};