import { Note } from "../../interfaces/notes";

import Masonry from "@mui/lab/Masonry";
import NoteComponent from "./Note";
import { memo } from "react";

import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

interface Props {
	notes: Note[];
	deleteNote: (id: string) => void;
	updateLabels: (id: string, labels: string[]) => void;
	updateFavorite: (id: string, favorite: boolean) => void;
	onAddNote: () => void;
}

const NoteList = ({
	notes,
	deleteNote,
	updateLabels,
	updateFavorite,
	onAddNote,
}: Props) => {
	return (
		<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
			<div key="add-note">
				<Card
					sx={{
						height: "100%",
						minHeight: "150px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "16px",
						border: "2px dashed rgba(0, 0, 0, 0.12)",
						backgroundColor: "transparent",
						boxShadow: "none",
						transition: "all 0.3s ease",
						"&:hover": {
							borderColor: "primary.main",
							backgroundColor: "rgba(0, 0, 0, 0.02)",
							transform: "translateY(-4px)",
						},
					}}
				>
					<CardActionArea
						onClick={onAddNote}
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							p: 3,
						}}
					>
						<AddIcon
							sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
						/>
						<Typography
							variant="h6"
							color="text.secondary"
							sx={{ fontWeight: "medium" }}
						>
							Create Note
						</Typography>
					</CardActionArea>
				</Card>
			</div>
			{notes.map((note: Note, index) => (
				<div key={index}>
					<NoteComponent
						note={note}
						index={index}
						deleteNote={deleteNote}
						updateLabels={updateLabels}
						updateFavorite={updateFavorite}
					/>
				</div>
			))}
		</Masonry>
	);
};

export default memo(NoteList);
