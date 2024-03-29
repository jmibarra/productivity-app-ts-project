import { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import { Item,ItemLarge } from './styles/TaskDetailViewModalStyles';
import StatusChipComponent from '../../common/StatusChipComponent';
import LabelsComponent from '../../common/Labels/LabelsComponent';

import { Task } from '../../../interfaces/tasks/interfaces';
import Priority from '../../common/Priority/Priority';


interface Props {
    handleClose: () => void,
    taskModalOpen:boolean,
    selectedTaskProp: Task | undefined
    updateLabels: (id:string, labels: string[]) => void
    updatePriority: (id: string, newPriority: Number) => void;
}

export default function TaskDetailViewModal({handleClose,taskModalOpen,selectedTaskProp,updateLabels,updatePriority}:Props) {

    const [selectedTask, setSelectedTask] = useState<Task>();
    const [loading, setLoading] = useState(true);

    const descriptionElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setSelectedTask(selectedTaskProp)
        setLoading(false)
    }, [selectedTaskProp]);

    return (
        <div>
        <Dialog
            open={taskModalOpen}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {selectedTask && (
                <>
                <div style={{ alignSelf: 'flex-start' }}>{selectedTask.title}</div>
                <div style={{ alignSelf: 'flex-end' }}>
                    <Priority priority={selectedTask.priority} taskId={selectedTask._id} updatePriority={updatePriority} />
                </div>
                </>
            )}
            </DialogTitle>

            <DialogContent dividers>
            <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {loading && <CircularProgress />}
                {selectedTask && (
                <>
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <ItemLarge>{selectedTask.description}</ItemLarge>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item>
                            <StatusChipComponent completed={selectedTask.completed} />
                        </Item>
                        <Item>
                            <b>Labels</b>
                            <LabelsComponent labels={selectedTask.labels ?? []} taskId={selectedTask._id} updateLabels={updateLabels} />
                        </Item>
                    </Grid>
                    </Grid>
                </>
                )}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    
}