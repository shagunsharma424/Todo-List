import React,{useState} from "react";
import "./TodoList.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function TodoList()
{
    const[showDay,setshowDay]=useState(true)
    const[enteredData,setEnteredData]=useState("")
    const data = [
        { content: "Complete online JavsScript course", checked: true },
        { content: "Jog around the park 3x", checked: false },
        { content: "10 minutes meditation", checked: false },
        { content: "Read for 1 hour", checked: false },
        { content: "Pick up groceries", checked: false },
        { content: "Complete Todo App on Frontend Mentor", checked: false }
      ];
      const[todoList,setTodoList]=useState(data)

    const toggleDayFun=()=>{ setshowDay(!showDay)}

    const onChekboxChange=(eventData,eventId)=>{
        const Value=eventData?.target?.checked
        setTodoList((prev) => 
            prev.map((item,index) => 
              index === eventId ? { ...item, checked: !item.checked } : item
            )
          );
        console.log("Value",Value,"eventId",eventId)
    }
    const onTodoValueChange=(eventData)=>{
        const Value=eventData?.target?.value
        setEnteredData(Value)
        console.log("eventData.keyCode ",eventData.keyCode )
        // if(enteredData==""){toast("Add something first");return}
        if(eventData.keyCode =="13" && enteredData!="")
        {
            onAddTodoList() 
        }
        console.log("Value",Value)
    }
    const onAddTodoList=()=>{
        if(enteredData==""){toast("Add something first");return}
        setTodoList((prev) => [{content: enteredData,checked: false},...prev]);
        setEnteredData("")
        toast("Note added successfully");
    }

    console.log("todoList",todoList)
    return(
       <div className={`${(showDay)?"mainTodoDiv":"mainTodoDivNightImage"}`} >
            <div className="row justify-content-between">
                <div className="col-2">
                    <p className="todoPara m-2 mt-4">TODO</p>
                </div>
                <div className="col-1 m-2 mt-4 cursorpointer d-flex align-items-center">
                    {showDay?<i class="fa fa-sun-o icons " aria-hidden="true" onClick={toggleDayFun}></i>: <i class="fa fa-moon-o icons " aria-hidden="true" onClick={toggleDayFun}></i>}
                </div>
            </div>
            <div className="todoListInputAndTableDiv">
            <div class="input-group mb-3">
                <input type="text" 
                class={`form-control`}
                value={enteredData} placeholder="Create a new todo" aria-label="Username" aria-describedby="basic-addon1"   
                onChange={onTodoValueChange}
                onKeyDown={onTodoValueChange}
                />           
                <div class="input-group-prepend ">
                    <span class="input-group-text cursorpointer" id={`${(!showDay)?"basic-addon1":"basic-addon2"}`} onClick={onAddTodoList}><i className={`fa fa-plus addIcon ${(!showDay)?"":"addIconDark"}`} aria-hidden="true"></i></span>
                </div>
            </div>

            <div className={`todoListDiv ${(!showDay)?"":"todoListDivDark"}`}>
               
                <ul>
                    <p className="d-inline-block"><span>Completed : {todoList.filter(data=>data.checked==true).length}</span></p>
                    <p className="d-inline-block"><span>Pending : {todoList.filter(data=>data.checked!=true).length}</span></p>
                    {todoList && todoList.map((data,index)=> <li><input type="checkbox"  checked={data.checked} onChange={(event)=>{onChekboxChange(event,index)}}/><span className={`${(data.checked)?"checkedSpan":""}`}>{data.content}</span> </li>)}
                </ul>
               
            </div>

            </div>
            <ToastContainer />
       </div> 
    )
}