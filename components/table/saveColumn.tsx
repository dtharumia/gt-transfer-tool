import { Box, IconButton, useToast } from "@chakra-ui/react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

const SaveColumn = ({ course, text }) => {
  const toast = useToast();
  const [isSaved, setIsSaved] = useState(
    JSON.parse(localStorage.getItem("savedCourses") || "[]").some(
      (c) => c.id === course.id
    )
  );

  const id = course.id;

  const handleClick = () => {
    let savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");

    if (isSaved) {
      const updatedSavedCourses = savedCourses.filter((c) => c.id !== id);
      localStorage.setItem("savedCourses", JSON.stringify(updatedSavedCourses));
      setIsSaved(false);
      toast({
        title: "Course removed",
        description:
          "You can view your saved courses in the Saved Courses tab.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const updatedSavedCourses = [...savedCourses, course];
      localStorage.setItem("savedCourses", JSON.stringify(updatedSavedCourses));
      setIsSaved(true);
      toast({
        title: "Course saved",
        description:
          "You can view your saved courses in the Saved Courses tab.",
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
