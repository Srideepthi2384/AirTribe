import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const TaskDetails = ({task, updateTaskDetails}) => {

    const [data, setData] = useState({...task});

    const update=(key, value)=>{
        setData({...data, [key]: value});
    }

    const updateTask=()=>{
        console.log("updating");
        updateTaskDetails(data);
    }

  return (
    <>
    <Paper style={{width:500, padding:10}}>
        <Grid container spacing={2}>
            <Grid item sm={4}>
                <Typography>Id:</Typography>
                </Grid>
            <Grid item sm={8}>
                {data.id}
            </Grid>
            <Grid item sm={4}>
                <Typography>Name:</Typography>
                </Grid>
            <Grid item sm={8}>
                <TextField value={data.name} onChange={(e)=>update("name", e.target.value)} fullWidth></TextField>
            </Grid>
            <Grid item sm={4}>
                <Typography>Description:</Typography>
                </Grid>
            <Grid item sm={8}>
                <TextField value={data.description} onChange={(e)=>update("description", e.target.value)} fullWidth multiline></TextField>
            </Grid>
            
        </Grid>
        <hr />
        <Grid item sm={12}>
                <Button variant="contained" onClick={()=>updateTask()} style={{margin:10}} >Update</Button>
            </Grid>
            
    </Paper>
    </>
  )
}

export default TaskDetails