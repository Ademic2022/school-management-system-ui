import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "../components/Table";
import { resultsData, resultColumn } from "../data/results";
import RecordResultForm from "../components/forms/CheckResultForm";
import { errorToast, successToast } from "../components/utils/toastUtils";

const CheckResult = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const handleCheckResult = async (
    selectedSession,
    selectedClassroom,
    selectedUserId,
    selectedExamType
  ) => {
    setLoading(true);
    // Handle logic for checking exam results based on selectedSession and selectedClassroom
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const fetchedData = {"mike":"ademic"};
    const fetchedData = null;
    if (fetchedData) {
      setData(fetchedData);
      console.log(
        "Checking results for Session:",
        selectedSession,
        "Classroom:",
        selectedClassroom,
        "user:",
        selectedUserId
      );
      setLoading(false);
      successToast("Success");
    } else {
      errorToast("No results found for the selected session.");
      setLoading(false);
    }
  };
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });
  return (
    <Box sx={{ pt: "80px", pb: "20px", '@media (min-width:960px)': { width: "vw" } }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Results
      </Typography>
      <ComponentWrapper>{/* <Stats /> */}</ComponentWrapper>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <RecordResultForm onSubmit={handleCheckResult} loading={loading} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}></Grid>
        </Grid>
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Student Results
        </Typography>
        {data ? (
          <Table
            data={resultsData}
            fields={resultColumn}
            numberOfRows={data.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={false}
            enableRowSelection={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        ) : (
          <Typography variant="body1">
            {loading ? "Searching for result..." : "No Result Found!"}
          </Typography>
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default CheckResult;
