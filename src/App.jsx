import React, { useState } from 'react'
import './App.css'
import edit from './assets/edit-icon.png'
import del from './assets/del-icon.png'

const App = () => {
  
  const [title, setTitle]=useState("")
  const [des, setDes]=useState("")
  const [alert, setAlert]=useState({type:"",message:""})
  const [editIndex, setEditIndex]=useState(null)
  const [editName, setEditName]=useState("")
  const [editDes, setEditDes]=useState("")
  const [editTask,setEditTask]=useState(false)
  const [task, setTask]=useState([])
  
  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert({ type: "", message: "" }), 2000)
  }
  const taskAdd=()=>{
    if(!title||!des){
      showAlert("danger", "Please enter both Task & Description")
      return
    }
    setTask([...task,{title:title, des:des}])
    showAlert("success", "Task added successfully!")
    setTitle("")
    setDes("")
  }

  const taskDel=(i)=>{
    setTask(task.filter((x,index)=>index!==i))
    showAlert("success", "Task deleted successfully!")
  }

  const taskEdit=(i)=>{
    setEditIndex(i)
    setEditName(task[i].title)
    setEditDes(task[i].des)
    setEditTask(true)
  }
  
  const handleSave=()=>{
    if(!editName||!editDes){
      showAlert("danger", "Task fields cannot be empty")
      return
    }
    let editedTask=[...task]
    editedTask[editIndex]={title:editName,des:editDes}
    setTask(editedTask)
    setEditTask(false)
    showAlert("success", "Task updated successfully!")
  }
  return (
    <div className='task'>  
      <label htmlFor="title">Task</label>
      <input type="text" value={title} onChange={(x)=>setTitle(x.target.value)} required/>
      <label htmlFor="des">Description</label>
      <input type="text" value={des} onChange={(x)=>setDes(x.target.value)} required/>
      <button className='task-add' onClick={taskAdd}>Add Task</button><br />
      {task.length>0?
      <div>
        <table>
        <thead>
          <tr>
          <th>S.No</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Edit</th>
          <th>Del</th>
          </tr>
        </thead>
        <tbody>
        {
          task.map((x,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{x.title}</td>
              <td>{x.des}</td>
              <td><img src={edit} alt="" className='edit-icon' onClick={()=>taskEdit(index)}/> </td>
              <td><img src={del} alt="" className='del-icon' onClick={()=>taskDel(index)}/></td>
            </tr>
          ))
        }
        </tbody>
      </table>
      </div>:<h3 className='center'>-- No Tasks Yet --</h3>}
      {editTask?
       <div className='outer'>
          <div className='inner'>
            <h2 className='center'>Edit Task</h2>
            <p>Task Name</p>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter task Name"/>
            <p>Description</p>
            <input type="text" value={editDes} onChange={(e) => setEditDes(e.target.value)} placeholder="Enter Task Description"/>
            <br />
            <button className='save' onClick={handleSave}>Save</button>
            <button className='cancel' onClick={()=>setEditTask(false)}>Cancel</button>
          </div>
        </div>
      :null}
      {alert.message?<p className={`alertBox ${alert.type}`}>{alert.message}</p>:null}
    </div>
  )
}

export default App