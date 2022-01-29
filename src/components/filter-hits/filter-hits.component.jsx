import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit.component";
import { Stack } from "@chakra-ui/react";

const FilterHits = ({ hits }) => {
    return (
        <Stack spacing={2}>
            {hits.map((hit) => (
                <FilterHit key={hit.objectID} hit={hit} />
            ))}
        </Stack>
    )
}

export default connectHits(FilterHits);
