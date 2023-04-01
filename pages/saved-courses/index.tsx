import Navbar from "@/components/navbar/navbar";
import SaveColumn from "@/components/table/saveColumn";
import Table from "@/components/table/table";
import { Box } from "@chakra-ui/react";

import { savedCourses } from "../../components/state";

const SavedCoursesPage = () => {
  const allSavedCourses = savedCourses.use();

  return (
    <Box backgroundColor={"white"} minHeight={"100vh"}>
      <Navbar />
      <Table
        courses={{
          hits: allSavedCourses,
        }}
        columns={[
          {
            accessorKey: "gt_class",
            header: "GT Class",
            Cell: ({ cell }) => (
              <SaveColumn
                course={cell.row.original}
                text={cell.row.original.gt_class}
              />
            ),
            muiTableHeadCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "gt_title",
            header: "GT Title",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "transfer_state",
            header: "Transfer State",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "transfer_school",
            header: "Transfer School",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "transfer_class",
            header: "Transfer Class",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "transfer_title",
            header: "Transfer Title",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
        ]}
      ></Table>
    </Box>
  );
};

export default SavedCoursesPage;
