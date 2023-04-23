import * as React from 'react';

import { format,isValid} from 'date-fns';

import { Note } from '../../interfaces/tasks/interfaces';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    note: Note;
    index: number;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function NoteComponent({note,index}:Props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                JI
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={note.title}
            subheader={note.createdAt && isValid(new Date(note.createdAt)) ? format(new Date(note.createdAt), 'dd/MM/yyyy HH:mm') : ''}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {note.content.length > 400 
                    ? (note.content.slice(0, 400).substring(0, note.content.slice(0, 400).lastIndexOf(' ')) + "...").split('\n').map((paragraph, index) => (
                        <Typography key={index} paragraph variant="body2" color="text.secondary">
                            {paragraph}
                        </Typography>
                        ))
                    :
                    note.content.split('\n').map((paragraph, index) => (
                        <Typography key={index} paragraph variant="body2" color="text.secondary">
                            {paragraph}
                        </Typography>
                    ))
                }
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
            {note.content && note.content.length > 400 && 
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
            }
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Detalle:</Typography>
                <Typography>
                    {note.content.split('\n').map((paragraph, index) => (
                        <Typography key={index} paragraph>
                        {paragraph}
                        </Typography>
                    ))}
                </Typography>
            </CardContent>
        </Collapse>
        </Card>
    );
}
