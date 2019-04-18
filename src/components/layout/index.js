import React from 'react'
import "./layout.scss"

const Layout = ({title, children}) => {
    return (
        <div className='container'
            // style={{
            //     marginLeft: '240px',
            //     marginTop: '60px',
            //     padding: '60px',
            //     width: 'calc(100% - 240px)',
            //     height: 'calc(100vh - 60px',
            //     overflow: 'auto'
            // }}
        >
            <p
                style={{
                color: '#4a4a4a',
                fontSize: '22px',
                fontWeight: '600',
                paddingBottom: '20px',
                borderBottom: '1px solid #dfdfdf'
                }}
            >
                { title }
            </p>
            { children }
        </div>
    )
}

export default Layout