import { useState, useEffect } from "react";
import { Text, Grid } from "@mantine/core";
import classes from "../../styles/InstitutionInfo.module.css";
import ConceptDonut from "./ConceptDonut";

const InstitutionInfo = (props) => {
  const [institutionID, setInstitutionID] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [iName, setIName] = useState("");
  const [iWorkCount, setIWorkCount] = useState(0);
  const [iCitationsCount, setICitationsCount] = useState(0);
  const [iImpactFactor, setIImpactFactor] = useState(0);
  const [iHIndex, setIHIndex] = useState(0);
  const [iI10Index, setII10Index] = useState(0);
  const [iWorksAPI, setIWorksAPI] = useState("");

  const fetchData = async (iID) => {
    try {
      const response = await fetch(
        `https://api.openalex.org/institutions/${iID}`
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
    fetchData(institutionID);
  }, [institutionID]);

  useEffect(() => {
    if (data) {
      setIName(data.display_name);
      setIWorkCount(data.works_count);
      setICitationsCount(data.cited_by_count);
      setIImpactFactor(data.summary_stats["2yr_mean_citedness"]);
      setIHIndex(data.summary_stats.h_index);
      setII10Index(data.summary_stats.i10_index);
      setIWorksAPI(data.works_api_url);
    }
    // console.log("Data: ", data);
  }, [data]);

  useEffect(() => {
    setInstitutionID(props.id);
  }, [props]);

  useEffect(() => console.log("Props: ", institutionID), [institutionID]);
  return (
    <div className={classes.container}>
      <Text
        size="lg"
        fw={300}
        style={{
          color:
            "light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1))",
        }}
      >
        Institution Info
      </Text>
      <Grid>
        <Grid.Col span={6}>
          <h2>{iName}</h2>
          <Grid grow>
            <Grid.Col span={5} className={classes.infoColumn}>
              <Text size="xs" fw={400}>
                Works Count
              </Text>
              <Text size="xl" mt="sm" fw={700}>
                {Math.floor(iWorkCount / 1000)}k
              </Text>
            </Grid.Col>
            <Grid.Col span={5} className={classes.infoColumn}>
              <Text size="xs" fw={400}>
                Citation Count
              </Text>
              <Text size="xl" mt="sm" fw={700}>
                {Math.floor(iCitationsCount / 1000)}k
              </Text>
            </Grid.Col>
          </Grid>
          <Grid grow>
            <Grid.Col span={3} className={classes.infoColumn}>
              <Text size="xs" fw={400}>
                Impact Factor
              </Text>
              <Text size="xl" mt="sm" fw={700}>
                {iImpactFactor.toFixed(2)}
              </Text>
            </Grid.Col>
            <Grid.Col span={3} className={classes.infoColumn}>
              <Text size="xs" fw={400}>
                <i>h</i>-index
              </Text>
              <Text size="xl" mt="sm" fw={700}>
                {iHIndex}
              </Text>
            </Grid.Col>
            <Grid.Col span={3} className={classes.infoColumn}>
              <Text size="xs" fw={400}>
                <i>i10</i>-index
              </Text>
              <Text size="xl" mt="sm" fw={700}>
                {Math.floor(iI10Index / 1000)}k
              </Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6} className={classes.donut}>
          <ConceptDonut iID={institutionID} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default InstitutionInfo;
