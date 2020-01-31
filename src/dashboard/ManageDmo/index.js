import React from "react";
import { NavLink } from 'react-router-dom';
import Layout from 'Components/layout';
import CustomButton from 'Components/button';

class ManageDMO extends React.Component {
  render() {
    return (
      <Layout title="Manage DMO">
        <div style={{ width: '200px', marginTop: '20px' }}>
          <NavLink to={`/admin/dmo/create`}>
            <CustomButton text="CREATE DMO" />
          </NavLink>
        </div>
      </Layout>
    );
  }
}

export default ManageDMO;