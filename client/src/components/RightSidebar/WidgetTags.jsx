import React from 'react'

const WidgetTags = () => {

  const tags =['c', 'css' , 'express', 'html', 'firebase', 'java', 'javascript', 'mern', 'mongodb', 'mySql', 'next.js', 'node.js', 'php', 'python', 'reactjs'    ]

  return (
    <div className='widget-tags'>
      <h4>Watched Tags</h4>
      <div className='widget-tags-div'>
        {
          tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))
        }
      </div>
    </div>
  )
}

export default WidgetTags
