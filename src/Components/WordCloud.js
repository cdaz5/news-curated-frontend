import React from 'react';
import { TagCloud } from "react-tagcloud";
import { Modal, Icon }  from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const wordCloud = ({open, tag, handleClose, minSize, maxSize, data, handleClick, customRenderer, articlesWithKeywords}) => {

  const articles= articlesWithKeywords.map((article) => {
    return <li><Link to={article.links.permalink}  target="_blank" className='modalLinks'>{article.title}</Link></li>})

  return (
    <div>
      <Modal basic open={open} size='small' onClick={() => {handleClose()}}>
        <Modal.Content className=''>
          <Modal.Header className='modalHeader'>
            {tag.value}
          </Modal.Header>
          <Modal.Description>
          <p className='modalDescription'>{tag.value} is mentioned {tag.count} times.</p>
          <p className='modalLinksLine'>Links to Articles:</p>
            <ul className='modalUl'>
              {articles}
            </ul>
        </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Icon size='large' name='close' color='pink' onClick={() => {handleClose()}}/>
        </Modal.Actions>
      </Modal>
      <TagCloud minSize={minSize}
                maxSize={maxSize}
                tags={data}
                shuffle={false}
                onClick={(tag) => {handleClick(tag)}}
                renderer={customRenderer}
      />
  </div>
  )
}
export default wordCloud
