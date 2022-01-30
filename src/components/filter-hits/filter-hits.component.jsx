import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit.component";
import { Stack } from "@chakra-ui/react";

const FilterHits = ({ hits }) => {

    return <div className="filters">
        {hits.map((hit) => (
            <FilterHit key={hit.objectID} hit={hit} />
        ))}
    </div>

}

export default connectHits(FilterHits);
