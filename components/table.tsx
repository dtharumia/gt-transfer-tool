import {
  VStack,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
  Td,
  Text,
  Table as ChakraTable,
  Center,
  Select,
  Stack,
} from "@chakra-ui/react";
import Navbar from "./navbar";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useMemo } from "react";

const Table = ({
  heading,
  subHeading,
  courses,
  onClickPrev,
  onClickNext,
  page,
  setPage,
}) => {
  const data = courses.hits.map((hit) => {
    return {
      transfer_class: hit.document.transfer_class,
      transfer_title: hit.document.transfer_title,
      gt_class: hit.document.gt_class,
      gt_title: hit.document.gt_title,
      transfer_state: hit.document.transfer_state,
      transfer_school: hit.document.transfer_school,
    };
  });

  const courseColumns = useMemo(
    () => [
      {
        accessorKey: "transfer_state",
        header: "Transfer State",
      },
      {
        accessorKey: "transfer_school",
        header: "Transfer School",
      },
      {
        accessorKey: "transfer_class",
        header: "Transfer Class",
      },
      {
        accessorKey: "transfer_title",
        header: "Transfer Title",
      },
    ],
    []
  );

  const myTheme = createTheme({});

  return (
    <Box>
      <Navbar></Navbar>
      <Box>
        <VStack>
          <Heading textAlign={"center"}>{heading}</Heading>
          <Text>{courses.hits[0].document[subHeading]}</Text>
        </VStack>
        <HStack
          spacing={4}
          align="center"
          justify="center"
          pt={"2vh"}
          pb={"2vh"}
        >
          <ButtonGroup>
            <Button onClick={onClickPrev} isDisabled={page <= 1}>
              ◀ Prev
            </Button>
            <Stack direction="row" align="center">
              <Text fontWeight="bold" mr="2">
                Page:
              </Text>
              <Select
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value))}
              >
                {[...Array(Math.ceil(courses.found / 20))].map((_, i) => {
                  return (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </Select>
            </Stack>
            <Button
              onClick={onClickNext}
              isDisabled={page * 20 >= courses.found}
            >
              Next ▶
            </Button>
          </ButtonGroup>
        </HStack>
        <Box width={"5xl"} mx="auto">
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
      </Box>
    </Box>
  );
};

export default Table;
