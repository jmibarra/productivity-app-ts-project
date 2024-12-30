import React from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const EmptyDateComponent = () => {
	return (
		<span
			style={{
				display: "flex",
				alignItems: "center",
				color: "gray",
				fontSize: "small",
			}}
		>
			<AccessAlarmIcon fontSize="small" style={{ marginRight: 4 }} />
			Sin fecha de vencimiento
		</span>
	);
};

export default EmptyDateComponent;
