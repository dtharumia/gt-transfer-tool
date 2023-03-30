import {
  VStack,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  Stack,
  Select,
  Box,
  Text,
} from "@chakra-ui/react";

const TableHeader = ({ total, heading, subHeading, page, setPage }) => {
    
  const onClickPrev = (e) => {
    setPage(page - 1);
  };
  const onClickNext = (e) => {
    setPage(page + 1);
  };

  return (
    <Box>
      <VStack>
        <Heading textAlign={"center"}>{heading}</Heading>
        <Text>{subHeading}</Text>
      </VStack>
      <HStack spacing={4} align="center" justify="center" pt={"2vh"} pb={"2vh"}>
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
              {[...Array(Math.ceil(total / 20))].map((_, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </Select>
          </Stack>
          <Button onClick={onClickNext} isDisabled={page * 20 >= total}>
            Next ▶
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default TableHeader;
