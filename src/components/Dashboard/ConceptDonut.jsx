import { useState, useEffect } from "react";
import { Loader, Text } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import classes from "../../styles/ConceptDonut.module.css";

const d = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 100, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

const ConceptBar = (props) => {
  const [institutionID, setInstitutionID] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [donutData, setDonutData] = useState([]);

  useEffect(() => setInstitutionID(props.iID), [props]);

  const fetchData = async (iID) => {
    try {
      const response = await fetch(
        `https://api.openalex.org/works?filter=institutions.id:${iID}&group_by=concepts.id&per_page=5`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.group_by);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(institutionID);
  }, [institutionID]);

  useEffect(() => {
    if (data) {
      const colors = [
        "indigo.6",
        "yellow.6",
        "teal.6",
        "red.6",
        "pink.6",
        "grape.6",
        "cyan.6",
        "lime.6",
        "violet.6",
        "orange.6",
      ];
      const usedColors = new Set();

      const getRandomColor = () => {
        const availableColors = colors.filter(
          (color) => !usedColors.has(color)
        );
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const randomColor = availableColors[randomIndex];
        usedColors.add(randomColor);
        return randomColor;
      };

      const formattedData = data.map(({ key_display_name, count }) => ({
        name: key_display_name,
        value: count,
        color: getRandomColor(),
      }));

      setDonutData(formattedData);
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <Text className={classes.header}>Contribution Donut</Text>
      {donutData.length > 0 ? (
        <DonutChart
          withLabelsLine
          withLabels
          tooltipDataSource="segment"
          strokeWidth={0}
          thickness={25}
          data={donutData}
          // chartLabel="Concepts"
          valueFormatter={(value) =>
            new Intl.NumberFormat("en-US").format(value)
          }
          className={classes.donut}
        />
      ) : (
        <div>
          <Loader color="blue" type="dots" size={30} />
        </div>
      )}
    </div>
  );
};

export default ConceptBar;
