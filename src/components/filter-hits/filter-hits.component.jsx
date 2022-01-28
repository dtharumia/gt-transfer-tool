import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit.component";

const FilterHits = ({ hits }) => {
    return (
        <div className="filter-hits">
            {hits.map((hit) => (
                <FilterHit key={hit.objectID} hit={hit} />
            ))}
        </div>
    )
}

export default connectHits(FilterHits);
