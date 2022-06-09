import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

interface Props {
    labels: any;  //Por ahora ya que mi mock data trae string y enteros
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function LabelsComponent({labels}:Props) {

//   const handleDelete = (chipToDelete: ChipData) => () => {
//     setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//   };

//TODO: dejo para despues la edición de las labels

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {labels.map((data:String, index:number) => {

        return (
          <ListItem key={index}>
            <Chip
              label={data}
            //   onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
