import React from "react";
import { connectHits } from "react-instantsearch-core";
import styled from "styled-components";

const HitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

function TransferHits({ hits }) {
  console.log(hits)
  return (
    ""
  );
}

export default connectHits(TransferHits);
