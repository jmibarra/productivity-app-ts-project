

import { useEffect, useRef, useState } from 'react';

import { properties } from '../../../properties';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import StatusChipComponent from '../../common/StatusChipComponent';
import LabelsComponent from '../../common/LabelsComponent';

import { Task } from '../../../interfaces/tasks/interfaces';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface Props {
    handleClose: () => void,
    taskModalOpen:boolean,
    selectedTaskId: String
}

export default function TaskDetailViewModal({handleClose,taskModalOpen,selectedTaskId}:Props) {

    const [selectedTask, setSelectedTask] = useState<Task>();
    const [loading, setLoading] = useState(true);
    
    const descriptionElementRef = useRef<HTMLElement>(null);
    
    useEffect(() => {
        if (taskModalOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [taskModalOpen]);

    useEffect(() => {
        fetchTask(selectedTaskId);
    }, [selectedTaskId]);

    async function fetchTask(id: String){
        try{
            if(id !== ""){
                setLoading(true)
                setSelectedTask(undefined);
                fetch(properties.api_url+'/todos/'+id)
                .then(response => response.json())
                .then(
                    taskResponse => {
                        setSelectedTask(taskResponse)
                        setLoading(false)
                    }
                );
            }

        }catch(response){
            console.log("Error", response);
        }
        
    }

    return (
        <div>
        <Dialog
            open={taskModalOpen}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{selectedTask != null && <>{selectedTask.title}</> }</DialogTitle>
            <DialogContent dividers={true}>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {loading && <CircularProgress /> }
                {selectedTask != null && 
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Item>
                                    {selectedTask.desc}
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    Estado: <StatusChipComponent completed={selectedTask.completed} />
                                    Labels: <LabelsComponent labels={selectedTask.labels} />
                                </Item>
                            </Grid>
                        </Grid>
                                
                    </> 
                }
                
                
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
