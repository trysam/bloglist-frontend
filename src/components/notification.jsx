const Notification = ({ errorMessage, successMessage}) => {
  return (
    <div>
      {errorMessage &&
        <h2 className="error" style={{ color:'red', outline:'Solid Red', backgroundColor:'#FAA0A0' }}>
          {errorMessage}
        </h2>
      }
      {successMessage &&
        <h2 className="success" style={{ color:'Green', outline:'Solid Green', backgroundColor:'#DAF7A6' }}>
          {successMessage}
        </h2>
     }
    </div>
  )
}

export default Notification