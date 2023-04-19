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
import LabelsComponent from '../../common/LabelsComponent';

import { Task } from '../../../interfaces/tasks/interfaces';


interface Props {
    handleClose: () => void,
    taskModalOpen:boolean,
    selectedTaskProp: Task | undefined
}

export default function TaskDetailViewModal({handleClose,taskModalOpen,selectedTaskProp}:Props) {

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
            <DialogTitle id="scroll-dialog-title">
            {selectedTask && selectedTask.title}
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
                        <ItemLarge>{selectedTask.desc}</ItemLarge>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item>
                            <StatusChipComponent completed={selectedTask.completed} />
                        </Item>
                        <Item>
                            <b>Labels</b>
                            <LabelsComponent labels={selectedTask.labels} />
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