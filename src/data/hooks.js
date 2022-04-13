import React from "react";

export const useOrpData = (baseUrl) => {
  const [orpData, setOrpData] = React.useState(null);

  React.useEffect(() => {
    fetch(baseUrl + "/orp.topo.json").then((response) => {
      if (response.ok) {
        response.json().then((payload) => {
          setOrpData(payload);
        });
      }
    });
  }, []);

  return orpData;
};

export const useOkresyData = (baseUrl) => {
  const [okresyData, setOkresyData] = React.useState(null);

  React.useEffect(() => {
    fetch(baseUrl + "/okresy.topo.json").then((response) => {
      if (response.ok) {
        response.json().then((payload) => {
          setOkresyData(payload);
        });
      }
    });
  }, []);

  return okresyData;
};

export const useKrajeData = (baseUrl) => {
  const [krajeData, setKrajeData] = React.useState(null);

  React.useEffect(() => {
    fetch(baseUrl + "/kraje.topo.json").then((response) => {
      if (response.ok) {
        response.json().then((payload) => {
          setKrajeData(payload);
        });
      }
    });
  }, []);

  return krajeData;
};

export const useCapacitiesData = (baseUrl) => {
  const [capacitiesData, setCapacitiesData] = React.useState(null);

  React.useEffect(() => {
    fetch(baseUrl + "/capacities.json").then((response) => {
      if (response.ok) {
        response.json().then((payload) => {
          setCapacitiesData(payload);
        });
      }
    });
  }, []);

  return capacitiesData;
};
