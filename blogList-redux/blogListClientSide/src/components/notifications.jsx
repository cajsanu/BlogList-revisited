import {  useSelector } from "react-redux"

export const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (message === null) {
    return null
  }
  return <div className="notification">{message}</div>
}

export const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}
