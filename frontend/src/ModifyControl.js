import React from 'react'

function ModifyControl(props) {
  return (
    <div className="modify-control">
      <i className="edit-icon icon ion-edit" onClick={props.onEdit} />
      <i className="delete-icon icon ion-trash-b" onClick={props.onDelete} />
    </div>
  )
}

export default ModifyControl