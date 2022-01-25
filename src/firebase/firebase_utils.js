import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { getDatabase, ref, child, get } from "firebase/database";

export const readCoursesfromDatabase = async () => {
  let courseData = await fetch(`https://gt-transfer-tool-default-rtdb.firebaseio.com/all_gt_courses.json`)
  let courseDataJSON = await courseData.json();
  return courseDataJSON;
}


export const readCourseFromDatabase = async (courseName) => {

  if (courseName) {
    let courseData = await fetch(`https://gt-transfer-tool-default-rtdb.firebaseio.com/${courseName}.json`)
    let courseDataJSON = await courseData.json();
    return courseDataJSON;
  }

  return { "test": courseName }

}


export default firebase;