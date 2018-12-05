import styled from 'styled-components'
import React from 'react'

const CardComponent =  styled.div`
    margin-top: 40px;
    width: ${props => props.width ? props.width : '500px'};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    padding: 20px;
`;

const Card = ({width, children}) => {
    return (
        <CardComponent width={width}>
            {children}
        </CardComponent>
    )
}

export default Card