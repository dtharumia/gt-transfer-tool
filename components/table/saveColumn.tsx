import { Box, IconButton, useToast } from "@chakra-ui/react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";

import { addSavedCourse, removeSavedCourse, savedCourses } from "../state";

const SaveColumn = ({ course, text }) => {
  const toast = useToast();

  const allSavedCourses = savedCourses.use();
  const isSaved = allSavedCourses.some((c) => c.id === course.id);

  const handleClick = () => {
    if (isSaved) {
      removeSavedCourse(course);
      toast({
        title: "Course removed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      addSavedCourse(course);
      toast({
        title: "Course saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box>
        <IconButton
          aria-label={isSaved ? "remove" : "save"}
          icon={isSaved ? <RemoveCircleIcon /> : <SaveIcon />}
          onClick={handleClick}
        />
        <Box minWidth={"80%"} display={"inline-block"} textAlign={"center"}>
          {text}
        </Box>
      </Box>
    </>
  );
};

export default SaveColumn;
