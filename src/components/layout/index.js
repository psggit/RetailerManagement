import React from 'react'
import "./layout.scss"
import Icon from "./../icon"
import {  Api } from 'Utils/config'

class Layout extends React.Component {

		handleLogout () {

			const fetchOptions = {
					method: 'get',
					credentials: 'include',
					mode: 'cors',
					'x-hasura-role': 'user'
			}

			fetch(`${Api.authUrl}/user/logout`, fetchOptions)
			.then((response) => {
					if (response.status !== 200) {
					console.log(`Looks like there was a problem. Status Code: ${response.status}`)
					localStorage.clear()
					location.href = '/admin/login'
					return
					}
					response.json().then((data) => {
					localStorage.clear()
					location.href = '/admin/login'
					})
			})
			.catch((err) => {
					console.log('Fetch Error :-S', err)
					localStorage.clear()
					location.href = '/admin/login'
			})

	}

   render () {
		const {title, children} = this.props
    return (
			<div className="container"
					// style={{
					//     marginLeft: '240px',
					//     marginTop: '60px',
					//     padding: '60px',
					//     width: 'calc(100% - 240px)',
					//     height: 'calc(100vh - 60px',
					//     overflow: 'auto'
					// }}
			>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #dfdfdf'}}>
							<span
									style={{
											color: '#4a4a4a',
											fontSize: '22px',
											fontWeight: '600',
											paddingBottom: '20px'
									}}
							>
									{ title }
							</span>
							<span className="logout-icon" onClick={() => this.handleLogout()}>
									<Icon name="logout" />
							</span>
					</div>
					{ children }
			</div>
    )
   }
}

export default Layout