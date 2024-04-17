import { useState, useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import classes from "../styles/Dashboard.module.css";

// Components
import WelcomeMessage from "../components/Dashboard/WelcomeMessage";
import StatSummary from "../components/Dashboard/StatSummary";
import ComparisonChart from "../components/Dashboard/ComparisonChart";
import InstitutionInfo from "../components/Dashboard/InstitutionInfo";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [worksCount, setWorksCount] = useState(0);
  const [citationsCount, setCitationsCount] = useState(0);
  const [impactFactor, setImpactFactor] = useState(0);
  const [hIndex, setHIndex] = useState(0);
  const [i10Index, setI10Index] = useState(0);
  const [institutionID, setInstitutionID] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.openalex.org/institutions/I194028371"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setWorksCount(data.works_count);
      setCitationsCount(data.cited_by_count);
      setImpactFactor(data.summary_stats["2yr_mean_citedness"]);
      setHIndex(data.summary_stats.h_index);
      setI10Index(data.summary_stats.i10_index);
    }
  }, [data]);

  const getIID = (id) => {
    console.log("Dashboard", id);
    setInstitutionID(id);
  };

  return (
    <Container fluid>
      <WelcomeMessage />

      <Grid grow>
        <Grid.Col span={2} className={classes.gridColumnContainer}>
          <StatSummary title="Total Publications" data={worksCount} info="" />
        </Grid.Col>
        <Grid.Col span={2} className={classes.gridColumnContainer}>
          <StatSummary title="Total Citations" data={citationsCount} info="" />
        </Grid.Col>
        <Grid.Col span={2} className={classes.gridColumnContainer}>
          <StatSummary
            title="Impact Factor"
            data={impactFactor}
            info="Impact Factor assesses the average influence of a journal's articles."
          />
        </Grid.Col>
        <Grid.Col span={2} className={classes.gridColumnContainer}>
          <StatSummary
            title="h-index"
            data={hIndex}
            info="Evaluates the cumulative impact of an individual researcher's or journal's publications."
          />
        </Grid.Col>
        <Grid.Col span={2} className={classes.gridColumnContainer}>
          <StatSummary
            title="i10-index"
            data={i10Index}
            info="The i10-index is a metric that indicates the number of academic publications an author has written that have been cited at least ten times by others."
          />
        </Grid.Col>
      </Grid>

      <ComparisonChart iID={getIID} />
      {institutionID ? <InstitutionInfo id={institutionID} /> : null}
      {/* <InstitutionInfo id={institutionID} /> */}
    </Container>
  );
};

export default Dashboard;
