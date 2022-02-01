import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit";
import { Stack, Box } from "@chakra-ui/react";

const FilterHits = ({ hits, mt }) => {

    return (
        <Stack background="white" position={"absolute"} mt={`${mt}px !important`} zIndex={"100"} width={"md"} >
            {
                hits.map((hit) => (
                    <FilterHit key={hit.objectID} hit={hit} />
                ))
            }
        </Stack>
    )

}

export default connectHits(FilterHits);
