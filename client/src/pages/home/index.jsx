import { useContext, useEffect, useNavigate } from "react"
import { GlobalContext } from "../../context"
import axios from 'axios'
import classes from "./style.module.css"
import {FaTrash, FaEdit} from "react-icons/fa"


export default function Home() {
    const { blogList,
        setBlogList,
        pending,
        setPending } = useContext(GlobalContext);
        
    setPending(false);
    async function fetchListOfBlogs() {
        const res = await axios.get('http://localhost:5000/api/blogs')
        const result = res.data;

        if (result && result.blogList && result.blogList.length) {
            setBlogList(result.blogList);
            setPending(false);
        } else {
            setPending(false);
            setBlogList([]);
        }
    }
    async function handleDeleteClick(currentId){
        const res = await axios.delete(`http://localhost:5000/api/blogs/delete/${currentId}`)
        const result = await res.data;
        if(result?.message){
            // navigate(0);
        }
    }
    useEffect(() => {
        fetchListOfBlogs()
    }, []);
    return (
        <div className={classes.wrapper}>
            <h1>Blog List</h1>
            {
                pending ? (<h1>loading blogs ! please wait...</h1> ):
                (<div className={classes.blogList}>
                    {blogList && blogList.length ? blogList.map(blogItem =>(
                        <div key={blogItem._id}>
                            <p>{blogItem.title}</p>
                            <p>{blogItem.description}</p>
                            <FaEdit size={30}/>
                            <FaTrash onClick={()=> handleDeleteClick(blogItem._id)} size={30}/>
                        </div>
                    )):<h1>No blogs available</h1>}
                </div>)
            }
        </div>
    )
}