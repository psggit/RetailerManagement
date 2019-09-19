import React, { useState } from "react"
import { Form, ButtonGroup } from "@auth0/cosmos"
import Card from "Components/card"
import CustomButton from "Components/button"
import { authChangePassword } from "../../api"
import Notify from "Components/notify"

export default function ChangePassword () {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const reset = () => {
    setOldPassword("")
    setNewPassword("")
  }

  const handleSave = e => {
    const changePasswordReq = {
      password: oldPassword,
      new_password: newPassword
    }
    authChangePassword(changePasswordReq)
      .then(res => {
        Notify("success", res.message)
        reset()
      })
      .catch(err => {
        err.response.json().then(res => {
          Notify("danger", res.message)
        })
      })
  }
  return (
    <div>
      <Card width="400px">
        <Form layout="label-on-top">
          <Form.FieldSet label="Change password">
            <Form.TextInput
              label="Old password"
              type="password"
              placeholder="Enter old password.."
              onChange={e => { setOldPassword(e.target.value) }}
              value={oldPassword}
            />
            <Form.TextInput
              label="New password"
              type="password"
              placeholder="Enter new password.."
              onChange={e => { setNewPassword(e.target.value) }}
              value={newPassword}
            />
          </Form.FieldSet>
        </Form>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <ButtonGroup align="left">
          <CustomButton
            text="Save"
            handleClick={handleSave}
            disableSave={oldPassword.length === 0 || newPassword.length === 0}
          />
        </ButtonGroup>
      </div>
    </div>
  )
}