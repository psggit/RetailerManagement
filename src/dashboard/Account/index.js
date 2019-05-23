import React from "react"
import Layout from "Components/layout"
import ChangePassword from "./ChangePassword"

export default function Account() {
  return (
    <Layout title="Account">
      <div style={{ marginTop: "20px" }}>
        <ChangePassword />
      </div>
    </Layout>
  )
}