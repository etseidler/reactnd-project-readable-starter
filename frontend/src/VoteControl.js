import React from 'react'

function VoteControl(props) {
  const { upvote, downvote } = props
  return (
    <div className="vote-control">
      <i className="vote-icon icon ion-arrow-up-a" onClick={upvote} />
      <i className="vote-icon icon ion-arrow-down-a" onClick={downvote} />
    </div>
  )
}

export default VoteControl