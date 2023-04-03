import Navbar from "@/components/navbar/navbar";
import SaveColumn from "@/components/table/saveColumn";
import Table from "@/components/table/table";
import TableHeader from "@/components/table/tableHeader";
import { searchTypesense } from "@/typesense/typesenseSearch";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Course } from "../../components/types";

const CoursePage = () => {
  const router = useRouter();
  const { courseName } = router.query;
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
    if (!courseName) {
      return;
    }
    searchTypesense(
      "transfers",
      courseName,
      "gt_class",
      page,
      "transfer_state:asc, transfer_school:asc, transfer_class:asc",
      20
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
  }, [courseName, page]);

  return courses.found > 0 ? (
    <Box>
      <Head>
        <title>{courseName} | GT Transfer Tool</title>
        <meta
          name="description"
          content={`Transfer equivalencies for ${courseName} at Georgia Tech`}
        />
      </Head>
      <Navbar></Navbar>
      <TableHeader
        total={courses.found}
        heading={courseName}
        subHeading={courses.hits[0]["gt_title"]}
        page={page}
        setPage={setPage}
      />
      <Table
        courses={courses}
        columns={[
          {
            accessorKey: "transfer_state",
            header: "Transfer State",
            Cell: ({ cell }) => (
              <SaveColumn
                course={cell.row.original}
                text={cell.row.original.transfer_state}
              />
            ),
            muiTableHeadCellProps: {
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
  ) : (
    <></>
  );
};

export default CoursePage;
