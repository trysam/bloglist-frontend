import { useState,forwardRef,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const ToggleableButton = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisble] = useState(false)

  const hideWhenVisibile = { display : visible ? 'none' : '' }
  const displayWhenVisble = { display : visible ? '' : 'none' }

  const toggleVisibility = () => setVisble(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return <div>
    <div>
      <button style={hideWhenVisibile} onClick={toggleVisibility}>{buttonLabel}</button>
    </div>
    <div style={displayWhenVisble}>
      {children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  </div>
})

ToggleableButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}



export default ToggleableButton