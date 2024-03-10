import logo from './logo.svg';
import './App.css';
import Column from './components/Column';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {

  const [notStartedTasks, setNotStartedTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [counter, setCounter] = useState(1);

  const addNewTask = (type) => {
    let task={};
    switch (type) {
      case "NOT_STARTED":
        task = {
          id: counter,
          name: "task_"+counter,
          taskStatus: type,
          description: ""
        }
        break;
      case "IN_PROGRESS":
        task = {
          id: counter,
          name: "task_"+counter,
          taskStatus: type,
          description: ""
        }
        break;
      case "COMPLETED":
        task = {
          id: counter,
          name: "task_"+counter,
          taskStatus: type,
          description: ""
        }
        break;

    }
    handleTask(type, task);
    setCounter(counter + 1);
  }

  const handleTask=(type, task)=>{
    console.log("handle task",type, task);
    if(!task) return;

    task ={...task, taskStatus: type};
    console.log("task handleTask ", task);
    switch (type) {
      case "NOT_STARTED":
        setNotStartedTasks([...notStartedTasks, task]);
        break;
      case "IN_PROGRESS":
        setInProgressTasks([...inProgressTasks, task]);
        break;
      case "COMPLETED":
        setCompletedTasks([...completedTasks, task]);
        break;
    }
  }

  const deleteTask=(taskId, type)=>{
    console.log("delete", taskId, type);
    switch (type) {
      case "NOT_STARTED":
        setNotStartedTasks([...notStartedTasks.filter(task=>task.id!=taskId)]);
        break;
      case "IN_PROGRESS":
        setInProgressTasks([...inProgressTasks.filter(task=>task.id!=taskId)]);
        break;
      case "COMPLETED":
        completedTasks([...completedTasks.filter(task=>task.id!=taskId)]);
        break;
    }
  }


  const handleDragDrop = (res)=>{
    console.log(res);
    const {source, destination, draggableId} = res;

    console.log(source, destination, draggableId);
    if(!source || !destination || !draggableId)
      return;

      console.log("--------", source.droppableId);
      let tasks = [];
    switch(source.droppableId){
      case "NOT_STARTED":
        tasks = notStartedTasks.splice(source.index, 1);
        break;
      case "IN_PROGRESS":
        tasks = inProgressTasks.splice(source.index, 1);
        break;
      case "COMPLETED":
        tasks = completedTasks.splice(source.index, 1);
        break;
        
    }

    const task = tasks.length==1 ? tasks[0] : null;
    handleTask(destination.droppableId,task);
    
  }

  const updateTaskDetails = (task)=>{
    console.log("update", task);
    let index=0;
    switch(task.taskStatus){
      case "NOT_STARTED":
        index = notStartedTasks.findIndex(item=>item.id===task.id);
        notStartedTasks.splice(index,1, task);
        break;
      case "IN_PROGRESS":
        index = inProgressTasks.findIndex(item=>item.id===task.id);
        inProgressTasks.splice(index,1, task);
        break;
      case "COMPLETED":
        index = completedTasks.findIndex(item=>item.id===task.id);
        completedTasks.splice(index,1, task);
        break;
        
    }
      
  
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragDrop}>
       <Grid container spacing={2} style={{ padding: 10 , marginTop:20}}>
          <Grid item xs={4}>
            <Column
              type="NOT_STARTED"
              name="Not Started"
              color="#eb7e7e"
              tasks={notStartedTasks}
              addTaskCallback={addNewTask}
              updateTaskDetails={(task)=>updateTaskDetails(task)}
              deleteTask={deleteTask}
            ></Column>
          </Grid>
          <Grid item xs={4}>
            <Column
              type="IN_PROGRESS"
              name="In Progress"
              color="#daeb92"
              tasks={inProgressTasks}
              addTaskCallback={addNewTask}
              updateTaskDetails={(task)=>updateTaskDetails(task)}
              deleteTask={deleteTask}
            ></Column>
          </Grid>
          <Grid item xs={4}>
            <Column
              type="COMPLETED"
              name="Completed"
              color="#a8a9a4"
              tasks={completedTasks}
              addTaskCallback={addNewTask}
              updateTaskDetails={(task)=>updateTaskDetails(task)}
              deleteTask={deleteTask}
            ></Column>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
}

export default App;
