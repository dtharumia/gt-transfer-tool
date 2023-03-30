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
} from "@chakra-ui/react";
import Navbar from "./navbar";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import MaterialReactTable from "material-react-table";
import Example from './table_test'
import { useMemo } from "react";

const Table = ({
  heading,
  subHeading,
  courses,
  onClickPrev,
  onClickNext,
  page,
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

  console.log(data)

  const columns = useMemo(
    () => [
      {
        accessorKey: "transfer_class", //access nested data with dot notation
        header: "Transfer Class",
      },
      {
        accessorKey: "transfer_title",
        header: "Transfer Title",
      },
      {
        accessorKey: "gt_class",
        header: "GT Class",
      },
      {
        accessorKey: "gt_title",
        header: "GT Title",
      },
      {
        accessorKey: "transfer_state",
        header: "State",
      },
      {
        accessorKey: "transfer_school",
        header: "School",
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
            <Button disabled>Page {page}</Button>
            <Button
              onClick={onClickNext}
              isDisabled={page * 20 >= courses.found}
            >
              Next ▶
            </Button>
          </ButtonGroup>
        </HStack>
          {/* <Example /> */}
          <ThemeProvider theme={myTheme}>
            <MaterialReactTable
              columns={columns}
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
          {/* <TableContainer>
            <ChakraTable variant="striped" layout="fixed" maxW={"6xl"}>
              <Thead>
                <Tr>
                  {subHeading === "gt_title" ? (
                    <>
                      <Th width="10%" textAlign={"center"}>
                        Transfer State
                      </Th>
                      <Th width="40%" textAlign={"center"}>
                        Transfer School
                      </Th>
                      <Th width="10%" textAlign={"center"}>
                        Transfer Class
                      </Th>
                      <Th width="40%" textAlign={"center"}>
                        Transfer Title
                      </Th>
                    </>
                  ) : (
                    <>
                      <Th width="10%" textAlign={"center"}>
                        Transfer Class
                      </Th>
                      <Th width="23%" textAlign={"center"}>
                        Transfer Title
                      </Th>
                      <Th width="10%" textAlign={"center"}>
                        GT Class
                      </Th>
                      <Th width="23%" textAlign={"center"}>
                        GT Title
                      </Th>
                    </>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(courses).length > 0 &&
                  courses.hits.map((hit) => {
                    const doc = hit.document;
                    return (
                      <Tr key={hit.objectID}>
                        {subHeading === "gt_title" ? (
                          <>
                            <Td textAlign={"center"}>{doc.transfer_state}</Td>
                            <Td textAlign={"center"}>{doc.transfer_school}</Td>
                            <Td textAlign={"center"}>{doc.transfer_class}</Td>
                            <Td textAlign={"center"}>{doc.transfer_title}</Td>
                          </>
                        ) : (
                          <>
                            <Td textAlign={"center"}>{doc.transfer_class}</Td>
                            <Td textAlign={"center"}>{doc.transfer_title}</Td>
                            <Td textAlign={"center"}>{doc.gt_class}</Td>
                            <Td textAlign={"center"}>{doc.gt_title}</Td>
                          </>
                        )}
                      </Tr>
                    );
                  })}
              </Tbody>
            </ChakraTable>
          </TableContainer> */}
      </Box>
    </Box>
  );
};

export default Table;
