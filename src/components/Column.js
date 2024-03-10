import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, Modal, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Model from './Modal';
import TaskDetails from './TaskDetails';


const Column = ({ type, name, color, tasks, addTaskCallback, updateTaskDetails, deleteTask }) => {

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState();

  const openTaskDetailsModel = (task) => {
    setTask(task);
    setOpen(true);
  }

  const closeTaskDetailsModel = () => {
    console.log("closing model")
    setTask(null);
    setOpen(false);
  }

  const updateTaskDetailsAndCloseModel = (task) => {
    console.log("update22ew", task);
    updateTaskDetails(task);
    closeTaskDetailsModel();
  }
  return (
    <>
      <Paper style={{ padding: 5 }} >
        <div style={{ display: 'flex' }}>
          <div style={{
            width: 'max-content',
            height: 'fit-content',
            marginTop: 5,
            backgroundColor: color,
            borderRadius: 5,
            paddingLeft: 5,
            paddingRight: 5
          }} >
            {name}
          </div>
          <div style={{ width: 'max-content', padding: 5, marginLeft: 10 }} >
            {tasks.length}
          </div>
          <AddIcon style={{ marginLeft: 'auto', padding: 5 }} onClick={() => addTaskCallback(type)}></AddIcon>
          <MoreHorizIcon style={{ padding: 5 }}></MoreHorizIcon>
        </div>
      </Paper>

      <Droppable droppableId={type} type="group"  >
        {(provided) => (
          <div {...provided.dropableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => {
              return <Draggable draggableId={task.id + ""} key={task.id} index={index}>
                {(provided) => (
                  <Card
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={{ ...provided.draggableProps.style, margin: 20, height: 100 }}
                    ref={provided.innerRef}
                    key={task.id}
                  >
                    <div style={{ display: 'flex' }}>
                      <Typography style={{ height: 'fit-content', padding: '0px 5px', borderRadius: 5, backgroundColor: "#090a07", color: "#ffffff" }} >
                        {task.id}
                      </Typography>
                      <Typography style={{ height: 'fit-content', marginLeft: 5, padding: '0px 5px', borderRadius: 5, backgroundColor: "#e1e3dc" }}>
                        {task.name}
                      </Typography>
                      <DeleteIcon style={{ padding: 5, marginLeft: 'auto' }} onClick={(e) => deleteTask(task.id, type)} ></DeleteIcon>
                      <EditIcon style={{ padding: 5 }} onClick={(e) => openTaskDetailsModel(task)} > </EditIcon>
                    </div>
                    <hr />
                    <Typography style={{ height: 50, fontSize: 'smaller', textOverflow: 'ellipsis' }}>
                      {task.description}
                    </Typography>
                  </Card>
                )
                }
              </Draggable>
            })}
            <AddIcon style={{ marginLeft: 'auto', paddingTop: 25 }} onClick={() => addTaskCallback(type)}></AddIcon>

          </div>
        )
        }
      </Droppable>
      <Model
        title="Task Details" open={open} onClose={closeTaskDetailsModel}>
        <TaskDetails task={task} updateTaskDetails={updateTaskDetailsAndCloseModel} >
        </TaskDetails>
      </Model>
    </>
  )
}

export default Column