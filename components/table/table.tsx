import { Box } from "@chakra-ui/react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import MaterialReactTable from "material-react-table";
import { useMemo } from "react";

const Table = ({ courses, columns }) => {
  const data = courses.hits

  const courseColumns = useMemo(() => columns, []);

  const myTheme = createTheme({});

  return (
    <Box mx="auto" overflow={"auto"} maxWidth={"6xl"}>
      <ThemeProvider theme={myTheme}>
        <MaterialReactTable
          columns={courseColumns}
          data={data}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={{ hover: false }}
        />
      </ThemeProvider>
    </Box>
  );
};

export default Table;
