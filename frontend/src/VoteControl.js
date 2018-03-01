import React from 'react'

function VoteControl(props) {
  const { upvote, downvote, id } = props
  return (
    <div className="vote-control">
      <i className="vote-icon icon ion-arrow-up-a" onClick={() => upvote(id)} />
      <i className="vote-icon icon ion-arrow-down-a" onClick={() => downvote(id)} />
    </div>
  )
}

export default VoteControl