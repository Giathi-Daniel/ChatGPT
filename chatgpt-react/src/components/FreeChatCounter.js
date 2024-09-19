import React from 'react'

const FreeChatCounter = ({ count }) => {
  return (
    <div className='mb-4'>
      <p className='text-gray-500'>
        Free chats remaining: <strong>{count}</strong>
      </p>
    </div>
  )
}

export default FreeChatCounter