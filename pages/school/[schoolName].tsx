import Navbar from "@/components/navbar";
import { searchTypesense } from "@/typesense/typesenseSearch";
import Table from "@/components/table";
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
      "gt_class:asc"
    ).then((res) => {
      setCourses(res as any);
    });
  }, [schoolName, page]);

  const onClickPrev = (e) => {
    setPage(page - 1);
  };
  const onClickNext = (e) => {
    setPage(page + 1);
  };

  return courses.found > 0 ? (
    <Table
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      page={page}
      courses={courses}
      heading={schoolName}
      subHeading={"transfer_state"}
    ></Table>
  ) : (
    <></>
  );
};

export default SchoolPage;
