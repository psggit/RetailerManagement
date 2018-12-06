import React from 'react'

const Layout = ({title, children}) => {
    return (
        <div
            style={{
                marginLeft: '240px',
                marginTop: '60px',
                padding: '60px',
                width: 'calc(100% - 240px)'
            }}
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