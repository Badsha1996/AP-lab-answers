const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Mock Dataset acting as your local database storage layer
const postsData = [
    {
        id: 42,
        title: "Mastering Express.js",
        comments: [
            { id: 108, text: "Awesome article!" },
            { id: 109, text: "Great explanation!" }
        ]
    },
    {
        id: 43,
        title: "Node.js Architecture",
        comments: [
            { id: 201, text: "Very informative." }
        ]
    },
    {
        id: 44,
        title: "Event Loop",
        comments: [
            { id: 108, text: "Very helpful artical!" },
            { id: 109, text: "Great explanation!" }
        ]
    },
    {
        id: 45,
        title: "Building Scalable Distributed Systems",
        comments: [
            { id: 202, text: "Amazing!" }
        ]
    }
];

// TODO: Create a GET route for /posts/:postId/comments/:commentId
app.get("/posts/:postId/comments/:commentId", (req, res)=>{
    const postId = parseInt(req.params.postId)
    const commentId = parseInt(req.params.commentId)

    const post = postsData.filter((post)=>{
        if(postId!==undefined && post.id === postId) return true
        else return false
    })

    if(post.length===0) return res.status(404).send("Post not found")
    
    const comment = post[0].comments.filter((com)=>{
        if(commentId!=undefined && com.id===commentId) return true
    })

    if(comment.length===0) return res.status(404).send("Comment not found")
    res.status(200).json(comment[0])
})
// 1. Extract parameters and parse them to integers using parseInt()
// 2. Locate the target post from postsData. If missing, return 404 with "Post not found"
// 3. Locate the target comment within that post. If missing, return 404 with "Comment not found"
// 4. Return the matched comment object as a JSON payload with a 200 status code


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, postsData };