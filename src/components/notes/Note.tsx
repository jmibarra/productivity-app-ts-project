import * as React from "react";

import { format, isValid } from "date-fns";

import { Note } from "../../interfaces/notes";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, ColorLens } from "@mui/icons-material";
import LabelsComponent from "../common/Labels/LabelsComponent";

interface Props {
	note: Note;
	index: number;
	deleteNote: (id: string) => void;
	updateLabels: (id: string, labels: string[]) => void;
	updateFavorite: (id: string, favorite: boolean) => void;
}

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function NoteComponent({
	note,
	deleteNote,
	updateLabels,
	updateFavorite,
}: Props) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleDelete = () => {
		deleteNote(note._id);
	};

	const handleFavorite = () => {
		updateFavorite(note._id, note.favorite);
	};

	return (
		<Card
			sx={{
				maxWidth: 345,
				borderRadius: "16px",
				transition: "all 0.3s ease-in-out",
				"&:hover": {
					transform: "translateY(-4px)",
					boxShadow: 6,
				},
			}}
			style={{ backgroundColor: note.color || "inherit" }}
		>
			<CardHeader
				action={
					<IconButton aria-label="settings" size="small">
						<MoreVertIcon fontSize="small" />
					</IconButton>
				}
				title={
					<Typography
						variant="h6"
						sx={{
							fontWeight: "bold",
							fontSize: "1.1rem",
						}}
					>
						{note.title}
					</Typography>
				}
				subheader={
					note.createdAt && isValid(new Date(note.createdAt))
						? format(new Date(note.createdAt), "dd/MM/yyyy")
						: ""
				}
				sx={{ pb: 0 }}
			/>

			<CardContent>
				{/* Muestra una vista previa del contenido si es largo */}
				{note.content.length > 200 ? (
					<div
						dangerouslySetInnerHTML={{
							__html: `${note.content
								.slice(0, 200)
								.substring(
									0,
									note.content.slice(0, 200).lastIndexOf(" ")
								)}...`,
						}}
						style={{
							color: "text.secondary",
							whiteSpace: "pre-wrap",
						}}
					/>
				) : (
					<div
						dangerouslySetInnerHTML={{
							__html: note.content,
						}}
						style={{
							color: "text.secondary",
							whiteSpace: "pre-wrap",
						}}
					/>
				)}
				<LabelsComponent
					labels={note.labels ?? []}
					taskId={note._id}
					updateLabels={updateLabels}
				/>
			</CardContent>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent sx={{ pt: 0 }}>
					<div
						dangerouslySetInnerHTML={{
							__html: note.content,
						}}
						style={{ whiteSpace: "pre-wrap" }}
					/>
				</CardContent>
			</Collapse>
			<CardActions disableSpacing sx={{ justifyContent: "flex-end", pt: 0 }}>
				<IconButton
					aria-label="add to favorites"
					onClick={handleFavorite}
					size="small"
				>
					{note.favorite ? (
						<FavoriteIcon sx={{ color: red[500] }} fontSize="small" />
					) : (
						<FavoriteIcon fontSize="small" />
					)}
				</IconButton>
				<IconButton aria-label="share" onClick={handleDelete} size="small">
					<Delete fontSize="small" />
				</IconButton>
				<IconButton aria-label="share" size="small">
					<ColorLens fontSize="small" />
				</IconButton>
				{note.content && note.content.length > 200 && (
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						size="small"
					>
						<ExpandMoreIcon fontSize="small" />
					</ExpandMore>
				)}
			</CardActions>
		</Card>
	);
}
