import styled from 'styled-components'
import React from 'react'

const CardComponent =  styled.div`
    margin-top: 40px;
    width: ${props => props.width ? props.width : '500px'};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    padding: 20px;

    b {
        font-weight: bold;
    }

    h3 {
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgb(223, 223, 223);
    }
`;

const Card = (props) => {
    //console.log("card", ...props)
    return (
        <CardComponent width={props.width} className={props.className}>
            {props.children}
        </CardComponent>
    )
}

export default Card