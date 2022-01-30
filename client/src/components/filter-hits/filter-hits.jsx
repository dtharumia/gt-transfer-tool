import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit";
import { Container } from "@chakra-ui/react";

const FilterHits = ({ hits }) => {

    return (
        <Container position={"relative"} zIndex={"100"}>
            {
                hits.map((hit) => (
                    <FilterHit key={hit.objectID} hit={hit} />
                ))
            }
        </Container>
    )

}

export default connectHits(FilterHits);
