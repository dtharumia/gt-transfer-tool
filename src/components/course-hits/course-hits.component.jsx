import React from "react";
import { connectHits } from "react-instantsearch-core";
import CourseHit from "../course-hit/course-hit.component";

const CourseHits = ({ hits }) => {
    return (
        <div className="course-hits">
            {hits.map((hit) => (
                <CourseHit key={hit.objectID} hit={hit} />
            ))}
        </div>
    )
}

export default connectHits(CourseHits);
