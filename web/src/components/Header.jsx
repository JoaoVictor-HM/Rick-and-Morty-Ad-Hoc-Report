import React from 'react';
import { Typography } from '@material-ui/core';

export default function Header() {
    return (
        <Container>
            <img src="./images/rick.svg"/>
            <Typography variant="h3">
                Relatório AdHOC - Rick and Morty API
            </Typography>
            <img src="./images/morty.svg"/>
        </Container>
    )
}