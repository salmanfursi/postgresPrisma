import prisma from "../DB/db.config.js";

// get all user
export const fetchComments = async (req, res) => {
    const comments = await prisma.comment.findMany({
        include:{
            user:true,
            post:{
                include:{
                    user:true
                }
            }
        }
    });
    return res.json({
        status: 200,
        data: comments,
        message: "All comment hare"
    });
};
// show single user 
export const showComment = async (req, res) => {
    const commentId = req.params.id;
    console.log(commnentId)
    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(commentId)
        }
    });
    if(!comment){
        return res.json({
            status: 404,
            message: "user not found"
        });  
    }
    return res.json({
        status: 200,
        data: comment,
        message: "single user hare"
    });
};

// create user 
export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;
    await prisma.post.update({
        where: {
            id: Number(post_id),
        },
        data: {
            comment_count: {
                increment: 1,
            },
        },
    });
    const newcomment = await prisma.comment.create({
        data: {
            user_id: Number(user_id),
            post_id:Number(post_id),
            comment
        }
    });
    return res.json({
        status: 200,
        data: newcomment,
        msg: "comment created "
    });

};

// Update user 
export const updateComment = async (req, res) => {
    const commentId = req.params.id
    const { user_id, title, description } = req.body;

    await prisma.comment.update({
        where: {
            id: Number(commentId),
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
export const deleteComment = async (req, res) => {
    const userId = req.params.id

    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(userId),
        },
    });

    // If user not found, return an error message
    if (!comment) {
        return res.status(404).json({
            status: 404,
            message: "comment not found",
        });
    }
    await prisma.post.update({
        where: {
            id: Number(post_id),
        },
        data: {
            comment_count: {
                decrement: 1,
            },
        },
    });
    
    await prisma.comment.delete({
        where: {
            id: Number(userId),
        },
    });

    return res.json({
        status: 200,
        message: "comment deleted successfully"
    });

};