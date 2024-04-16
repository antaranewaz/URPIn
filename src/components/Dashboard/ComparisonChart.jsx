import { useState, useEffect } from "react";
import { Container, Grid, Loader } from "@mantine/core";
import classes from "../../styles/ComparisonChart.module.css";
import InstitutionList from "./InstitutionList";
import { LineChart } from "@mantine/charts";

const ComparisonChart = ({ iID }) => {
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedData, setselectedData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [selectedID, setSelectedID] = useState();

  const handleSelectedInstitution = (d) => {
    setSelectedInstitutions(d);
  };

  useEffect(() => {}, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `https://api.openalex.org/institutions/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      const name = jsonData.display_name
        .replace(/^"|"$/g, "")
        .replace(/\s/g, "");
      const iID = jsonData.id;

      jsonData.counts_by_year.forEach((item) => {
        const transformedData = {
          id: iID,
          name: name,
          year: item.year,
          count: item.works_count,
        };
        if (
          !selectedData.some(
            (data) =>
              data.id === transformedData.id &&
              data.name === transformedData.name &&
              data.year === transformedData.year &&
              data.count === transformedData.count
          )
        ) {
          setselectedData((prev) => [...prev, transformedData]);
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const newSelectedData = selectedData.filter((data) =>
      selectedInstitutions.includes(data.institution)
    );
    setselectedData(newSelectedData);
  }, [selectedInstitutions]);

  useEffect(() => {
    console.log(selectedData);
    selectedInstitutions.forEach((institution) => fetchData(institution));
    const aggregatedData = {};

    selectedData.forEach(({ year, name, count }) => {
      if (!aggregatedData[year]) {
        aggregatedData[year] = {};
      }
      aggregatedData[year][name] = count;
    });

    const formattedData = Object.entries(aggregatedData).map(
      ([year, universities]) => ({
        year: parseInt(year),
        ...universities,
      })
    );

    formattedData.sort((a, b) => b.year - a.year);

    setChartData(formattedData.reverse());
  }, [selectedData]);

  useEffect(() => {}, [chartData]);

  const colors = ["red", "grape", "pink", "cyan", "yellow"];

  const getRandomColor = (usedColors) => {
    const availableColors = colors.filter(
      (color) => !usedColors.includes(color)
    );
    if (availableColors.length === 0) {
      // All colors have been used, return a random color from the original array
      return colors[Math.floor(Math.random() * colors.length)];
    }
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  // Create a mapping between institution names and colors
  const getSeries = (data) => {
    const series = [];
    const colorMap = {};
    const usedColors = [];
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "year" && !colorMap[key]) {
          const color = getRandomColor(usedColors); // Assign a random color if not already assigned
          colorMap[key] = color;
          usedColors.push(color);
        }
      });
    });
    Object.keys(colorMap).forEach((institutionName) => {
      series.push({
        name: institutionName,
        color: `${colorMap[institutionName]}.6`,
      });
    });
    return series;
  };

  const getID = (n) => {
    const id = selectedData.find((d) => d.name === n).id;
    // console.log(id.split("/").pop());
    setSelectedID(id.split("/").pop());
  };

  useEffect(() => iID(selectedID), [selectedID]);

  return (
    <Container fluid className={classes.container}>
      <Grid gutter={50}>
        <Grid.Col
          span={8}
          style={{ transition: "1s ease" }}
          className={classes.loader}
        >
          {chartData.length > 0 ? (
            <LineChart
              h={400}
              data={chartData}
              dataKey="year"
              valueFormatter={(value) =>
                new Intl.NumberFormat("en-US").format(value)
              }
              withLegend
              yAxisLabel="Number of Works"
              legendProps={{
                verticalAlign: "bottom",
                height: 50,
              }}
              series={getSeries(chartData)}
              curveType="linear"
              onClick={(series) => getID(series.target.innerText)}
            />
          ) : (
            <div>
              <Loader color="blue" type="dots" size={30} />
            </div>
          )}
        </Grid.Col>
        <Grid.Col span={4} className={classes.loader}>
          <InstitutionList getData={handleSelectedInstitution} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ComparisonChart;
