import Navbar from "@/components/navbar";
import Table from "@/components/table/table";
import TableHeader from "@/components/table/tableHeader";
import { searchTypesense } from "@/typesense/typesenseSearch";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Course = {
  found: number;
  hits: Array<{
    objectID: string;
    document: {
      gt_class: string;
      gt_title: string;
      transfer_state: string;
      transfer_school: string;
      transfer_class: string;
      transfer_title: string;
    };
  }>;
};

const SchoolPage = () => {
  const router = useRouter();
  const { schoolName } = router.query;
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<Course>({
    found: 0,
    hits: [
      {
        objectID: "",
        document: {
          gt_class: "",
          gt_title: "",
          transfer_state: "",
          transfer_school: "",
          transfer_class: "",
          transfer_title: "",
        },
      },
    ],
  });

  useEffect(() => {
    if (!schoolName) {
      return;
    }
    searchTypesense(
      "transfers",
      schoolName,
      "transfer_school",
      page,
      "transfer_class:asc, gt_class:asc"
    ).then((res) => {
      setCourses(res as any);
    });
  }, [schoolName, page]);

  return courses.found > 0 ? (
    <Box>
      <Navbar />
      <TableHeader
        total={courses.found}
        heading={schoolName}
        subHeading={courses.hits[0].document["transfer_state"]}
        page={page}
        setPage={setPage}
      />
      <Table
        courses={courses}
        columns={[
          {
            accessorKey: "transfer_class",
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
        ]}
      ></Table>
    </Box>
  ) : (
    <></>
  );
};

export default SchoolPage;
