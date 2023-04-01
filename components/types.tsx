export type Course = {
  found: number;
  hits: Array<{
    id: string;
    gt_class: string;
    gt_title: string;
    transfer_state: string;
    transfer_school: string;
    transfer_class: string;
    transfer_title: string;
  }>;
};

export type CourseStorage = {
  id: string;
  gt_class: string;
  gt_title: string;
  transfer_state: string;
  transfer_school: string;
  transfer_class: string;
  transfer_title: string;
};

export default Course;