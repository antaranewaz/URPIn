import { useState, useEffect } from "react";
import { Checkbox, Group, ScrollArea } from "@mantine/core";
import classes from "../../styles/InstitutionList.module.css";

const InstitutionList = ({ getData }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["I194028371"]);
  const maxSelection = 5;
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const handleSelection = (e) => {
    console.log(e.length);
    if (e.length > maxSelection) {
      console.log("You can only select up to 5 institutions");
    } else {
      setSelectedCheckboxes(e);
    }
  };

  const isCheckboxDisabled = (value) => {
    return selectedCheckboxes.length == maxSelection &&
      !selectedCheckboxes.includes(value)
      ? true
      : false;
  };

  useEffect(() => {
    handleSelection(["I194028371"]);
    // getData(selectedCheckboxes);
  }, []);

  useEffect(() => {
    getData(selectedCheckboxes);
  }, [selectedCheckboxes]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.openalex.org/institutions?filter=country_code:ca&per_page=50"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.results);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Checkbox.Group
        defaultValue={["I194028371"]}
        label="Top 50 Canadian Institutions"
        onChange={(e) => handleSelection(e)}
        description="Select up to 5 institutions to compare"
      >
        <ScrollArea h={300}>
          <Group mt="xs" className={classes.listContainer}>
            {data &&
              data.map((d) => {
                return (
                  <Checkbox
                    key={d.id.split("/").pop()}
                    value={d.id.split("/").pop()}
                    label={d.display_name}
                    disabled={isCheckboxDisabled(d.id.split("/").pop())}
                  />
                );
              })}
          </Group>
        </ScrollArea>
      </Checkbox.Group>
    </div>
  );
};

export default InstitutionList;
