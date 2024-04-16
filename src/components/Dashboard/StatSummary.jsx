import { Container } from "@mantine/core";
import classes from "../../styles/StatSummary.module.css";

const StatSummary = ({ title, data }) => {
  return (
    <Container>
      <p className={classes.title}>{title}</p>
      <h2 className={classes.stat}>
        {
          Number.isInteger(data)
            ? (
              data.toString().length > 3
                ? Math.floor((data / 1000)) + "k"
                : data
            )
            : data.toFixed(2)
        }
      </h2>
    </Container>
  );
}

export default StatSummary;