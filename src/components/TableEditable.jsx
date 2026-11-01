import React, { useState } from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer } from "react-toastify";
import { successToast } from "../components/utils/toastUtils";
import { useUser } from "./utils/userContext";

const TableEditable = ({
  myData,
  myColumns,
  enableSubmitButton,
  enableAddNewRow,
  Decision,
  defaultValues,
  onNewRowSave,
  onDeleteRow,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  // With onSubmit the rows can be submitted as loaded (e.g. a whole class marked PRESENT);
  // otherwise the button stays disabled until a row is edited
  const [submitted, setSubmitted] = useState(!onSubmit);
  const [rows, setRows] = React.useState(myData);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { userStatus } = useUser();

  const EditToolbar = (props) => {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const lastItemId = rows.length > 0 ? rows[rows.length - 1].id : 0;
      const newId = lastItemId + 1;

      setRows((oldRows) => [
        ...oldRows,
        { id: newId, ...(defaultValues || {}), isNew: true },
      ]);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit /*fieldToFocus: "name" */ },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          disabled={!userStatus.isApproved}
        >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    if (onDeleteRow) {
      onDeleteRow(id);
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);

    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const currentTime = new Date().toLocaleTimeString();
    let updatedRow;
    if (
      Decision &&
      (newRow.status === "Approved" || newRow.status === "Rejected")
    ) {
      updatedRow = {
        ...newRow,
        time: currentTime,
        approved_by: Decision,
      };
    } else {
      updatedRow = { ...newRow, isNew: false /* time: currentTime */ };
    }

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    if (onNewRowSave && newRow.isNew) {
      onNewRowSave(newRow);
    } else {
      const originalRow = rows.find((row) => row.id === newRow.id);
      const updatedFields = {};

      Object.keys(originalRow).forEach((field) => {
        if (originalRow[field] !== updatedRow[field]) {
          updatedFields[field] = updatedRow[field];
        }
      });

      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      if (onNewRowSave) {
        onNewRowSave({ id: newRow.id, updatedFields });
      }
    }

    if (enableSubmitButton) {
      setSubmitted(false);
      return updatedRow;
    } else {
      // successToast("Updated!");
      setSubmitted(true);
      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleGetAllData = async () => {
    setLoading(true);

    if (onSubmit) {
      const saved = await onSubmit(rows);
      setLoading(false);
      setSubmitted(saved);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(rows);
    successToast("Results Submitted");

    setLoading(false);
    setSubmitted(true);
  };

  const columns = [
    ...myColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
              disabled={!userStatus.isApproved}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              sx={{ "& svg": { color: "red" } }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            disabled={!userStatus.isApproved}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            disabled={!userStatus.isApproved}
          />,
        ];
      },
    },
  ];

  const MyCustomToolbar = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GridToolbar {...props} />
        {enableAddNewRow && (
          <EditToolbar
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            defaultValues={defaultValues}
          />
        )}
      </div>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        pb: "20px",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",

          padding: "16px",
        }}
      >
        <ToastContainer />

        {rows ? (
          <>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={userStatus.isApproved ? processRowUpdate : undefined}
              slots={{
                toolbar: MyCustomToolbar,
              }}
              slotProps={{
                toolbar: (
                  <MyCustomToolbar
                    setRows={setRows}
                    setRowModesModel={setRowModesModel}
                    defaultValues={defaultValues}
                  />
                ),
              }}
            />
            {enableSubmitButton ? (
              <Grid item xs={6} sm={3} lg={3}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  onClick={handleGetAllData}
                  loading={loading}
                  loadingPosition="start"
                  disabled={submitted || !userStatus.isApproved}
                  sx={{ mt: 3, mb: 2, width: "25%" }}
                >
                  {loading ? "Submitting..." : "Submit Record"}
                </LoadingButton>
              </Grid>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Typography variant="h5">
            No records available. Set a new record by making a query search
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default TableEditable;
