import React, { useState } from "react";
import {
	Container,
	Title,
	Options,
	Content,
	Card,
	Graph,
	Data,
} from "./styles/MetricsBoardStyles";

const MetricsBoardComponent = () => {
	const [selectedMetric, setSelectedMetric] = useState("tasks");

	const renderMetrics = () => {
		switch (selectedMetric) {
			case "tasks":
				return (
					<Content>
						<Card>
							<h3>Tareas Completadas</h3>
							<Graph>Gráfico de tareas completadas</Graph>
							<Data>80 tareas completadas</Data>
						</Card>
						<Card>
							<h3>Tareas Pendientes</h3>
							<Graph>Gráfico de tareas pendientes</Graph>
							<Data>20 tareas pendientes</Data>
						</Card>
					</Content>
				);
			case "notes":
				return (
					<Content>
						<Card>
							<h3>Notas Creadas</h3>
							<Graph>Gráfico de notas creadas</Graph>
							<Data>50 notas</Data>
						</Card>
						<Card>
							<h3>Notas Editadas</h3>
							<Graph>Gráfico de notas editadas</Graph>
							<Data>30 ediciones</Data>
						</Card>
					</Content>
				);
			case "habits":
				return (
					<Content>
						<Card>
							<h3>Racha de Hábitos</h3>
							<Graph>Gráfico de racha de hábitos</Graph>
							<Data>7 días consecutivos</Data>
						</Card>
						<Card>
							<h3>Hábitos Completados</h3>
							<Graph>Gráfico de hábitos completados</Graph>
							<Data>15 hábitos completados</Data>
						</Card>
					</Content>
				);
			default:
				return null;
		}
	};

	return (
		<Container>
			<Title>Tablero de Métricas</Title>
			<Options>
				<button
					onClick={() => setSelectedMetric("tasks")}
					className={selectedMetric === "tasks" ? "active" : ""}
				>
					Tareas
				</button>
				<button
					onClick={() => setSelectedMetric("notes")}
					className={selectedMetric === "notes" ? "active" : ""}
				>
					Notas
				</button>
				<button
					onClick={() => setSelectedMetric("habits")}
					className={selectedMetric === "habits" ? "active" : ""}
				>
					Hábitos
				</button>
			</Options>
			{renderMetrics()}
		</Container>
	);
};

export default MetricsBoardComponent;
