import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context"
import axios from 'axios'

export default function Home() {
    const { blogList,
        setBlogList,
        pending,
        setPending } = useContext(GlobalContext)
    setPending(true);
    async function fetchListOfBlogs() {
        const res = await axios.get('http://localhost:5000/api/blogs')
        const result = res.data;

        if(result && result.blogList && result.blogList.length){
            setBlogList(result.blogList);
            setPending(false);
        }
    }
    useEffect(() => {
        fetchListOfBlogs()
    }, [])
    return <div>
        <h1>home</h1>
    </div>
}