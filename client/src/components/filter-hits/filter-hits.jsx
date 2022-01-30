import React from "react";
import { connectHits } from "react-instantsearch-core";
import FilterHit from "../filter-hit/filter-hit";
import { Container } from "@chakra-ui/react";

const FilterHits = ({ hits, mt }) => {

    return (
        <Container position={"absolute"} px="0" mt={`${mt}px !important`} zIndex={"100"} background={'#A4925A'} width={"md"}>
            {
                hits.map((hit) => (
                    <FilterHit key={hit.objectID} hit={hit} />
                ))
            }
        </Container>
    )

}

export default connectHits(FilterHits);
