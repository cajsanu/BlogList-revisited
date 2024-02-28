import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showContent}</Button>
      </div>
      <div style={showWhenVisible} className="togglable">
        {props.children}
        <Button onClick={toggleVisibility}>{props.hideContent}</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  showContent: PropTypes.string.isRequired,
  hideContent: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
