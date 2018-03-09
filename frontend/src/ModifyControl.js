import React from 'react'

function ModifyControl({ onEdit, onDelete}) {
  return (
    <div className="modify-control">
      <i className="edit-icon icon ion-edit" onClick={onEdit} />
      <i className="delete-icon icon ion-trash-b" onClick={onDelete} />
    </div>
  )
}

export default ModifyControl