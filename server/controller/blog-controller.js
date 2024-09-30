

const mongoose = require("mongoose");
const Blog = require("../model/blog");



//fetch list of blogs
//add new blog
//delete a blog
//update a blog

//
const fetchListOfBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (e) {
        console.log(e)
    }
    if (!blogList) {
        return res.status(404).json({ message: "No Blogs Found" })
    }
    return res.status(200).json({ blogList })
}
//
const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreatedBlog = new Blog({ title, description, date: currentDate });

    try {
        await newlyCreatedBlog.save()
    } catch (e) {
        console.log(e)
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedBlog.save(session);
        session.commitTransaction()
    } catch (e) {
        return res.send(500).json({ message: e })
    }
    return res.status(200).json({ newlyCreatedBlog })
}
//
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: "Blog Not Found" })
        }
        return res.status(200).json({ message: " Successfully Delted" })
    } catch (e) {
        console.log(e);
        return res.status(404).json({ message: "unable to delete it, try again" });
    }
}
//
const updateBlog = async (res, req) => {
    const id = req.params.id;
    const { title, description } = req.body;
    let newBlogToUpdate;
    try {
        newBlogToUpdate = await Blog.findByIdAndUpdate(id, { title, description });
    } catch(e){
        console.log(e);
        return res.send(500).json({message: "please try again, something went wrong"})
    }
    if(!newBlogToUpdate){
        return res.send(500).json({message:"please try again, something went wrong"})
    }
    return res.send(200).json({newBlogToUpdate})
}

module.exports = {fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog}