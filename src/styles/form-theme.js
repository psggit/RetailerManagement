import styled from 'styled-components'

export const Form = styled.form`
    width: 500px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    padding: 20px;

    label {
        // display: flex;
        // flex-direction: column;
        color: #777;
        //font-family: "Raleway", sans-serif;
        font-size: 15px;
        margin: 10px 0;
        height: 40px;
        //position: relative;
    }

    input {
        width: calc(100% - 40px);
        height: 35px;
        border: 1px solid #ccc;
        background-color: #fff;
    }
`;

// export const Label = styled.label`
//   display: flex;
//   flex-direction: column;
//   color: #777;
//   font-family: "Raleway", sans-serif;
//   font-size: 0.8em;
//   margin: 0.5em 0;
//   position: relative;
// `;

// export const Input = styled.input`
//   width: calc(100% - 40px);
//   height: 35px;
//   border: 1px solid #ccc;
//   background-color: #fff;
// `;
