import React from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";

const CompanyMatchingPage = () => {
    const { providerId } = useParams;

    return (
        <Container>
            12
        </Container>
    )
}

const Container = styled.div`
background-color: green;
`
export default CompanyMatchingPage;