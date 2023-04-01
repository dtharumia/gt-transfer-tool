import Navbar from "@/components/navbar/navbar";
import SaveColumn from "@/components/table/saveColumn";
import Table from "@/components/table/table";
import TableHeader from "@/components/table/tableHeader";
import { searchTypesense } from "@/typesense/typesenseSearch";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Course } from "../../components/types";

const SchoolPage = () => {
  const router = useRouter();
  const { schoolName } = router.query;
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<Course>({
    found: 0,
    hits: [
      {
        id: "",
        gt_class: "",
        gt_title: "",
        transfer_state: "",
        transfer_school: "",
        transfer_class: "",
        transfer_title: "",
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
      const data: Course = {
        found: res.found,
        hits:
          res.hits?.map((hit) => {
            return {
              id: hit.document["id"] as string,
              gt_class: hit.document["gt_class"] as string,
              gt_title: hit.document["gt_title"] as string,
              transfer_state: hit.document["transfer_state"] as string,
              transfer_school: hit.document["transfer_school"] as string,
              transfer_class: hit.document["transfer_class"] as string,
              transfer_title: hit.document["transfer_title"] as string,
            };
          }) ?? [],
      };
      setCourses(data);
    });
  }, [schoolName, page]);

  return courses.found > 0 ? (
    <Box>
      <Navbar />
      <TableHeader
        total={courses.found}
        heading={schoolName}
        subHeading={courses.hits[0]["transfer_state"]}
        page={page}
        setPage={setPage}
      />
      <Table
        courses={courses}
        columns={[
          {
            accessorKey: "transfer_class",
            header: "Transfer Class",
            Cell: ({ cell }) => (
              <SaveColumn
                course={cell.row.original}
                text={cell.row.original.transfer_class}
              />
            ),
            muiTableHeadCellProps: {
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
          {
            accessorKey: "gt_class",
            header: "GT Class",
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
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
        ]}
      ></Table>
    </Box>
  ) : (
    <></>
  );
};

export default SchoolPage;
