import { Container, Tooltip, ActionIcon } from "@mantine/core";
import classes from "../../styles/StatSummary.module.css";
import { IconQuestionMark } from "@tabler/icons-react";

const StatSummary = ({ title, data, info }) => {
  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className={classes.title}>{title}</p>
        <Tooltip
          multiline
          w={220}
          withArrow
          position="right"
          color="#292931"
          transitionProps={{ duration: 200 }}
          label={info}
        >
          <ActionIcon variant="transparent" color="white">
            <IconQuestionMark
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      </div>

      <h2 className={classes.stat}>
        {Number.isInteger(data)
          ? data.toString().length > 3
            ? Math.floor(data / 1000) + "k"
            : data
          : data.toFixed(2)}
      </h2>
    </Container>
  );
};

export default StatSummary;
