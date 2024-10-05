import { useContext } from "react"
import classes from "./style.module.css"
import { GlobalContext } from "../../context"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function AddBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  const navigate = useNavigate()
  console.log(formData)
  async function handlesaveBlogToDB(){
    const response = await axios.post('http://localhost:5000/api/blogs/add',{
      title: formData.title,
      description: formData.description
    })
    const result = await response.data;
    if (result){
      setFormData({
        title:"",
        description:""
      })
      navigate('/')
    }
  }

  return (
    <div className={classes.wrapper}>
      <h1>Add a Blog</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handlesaveBlogToDB}>Add blog
        </button>
      </div>
    </div>
  )
}
