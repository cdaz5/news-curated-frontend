import React from 'react';
import { TagCloud } from "react-tagcloud";
import { Modal, Icon }  from 'semantic-ui-react';

const wordCloud = ({open, tag, handleClose, minSize, maxSize, data, handleClick, customRenderer}) => {
  return (
    <div>
      <Modal basic open={open} size='small'>
        <Modal.Header className='modalHeader'>
          {tag.value}
        </Modal.Header>
        <Modal.Content className='modalContent'>
          {tag.value} is mentioned {tag.count} times.
        </Modal.Content>
        <Modal.Actions>
            <Icon size='massive' name='checkmark' color='green' onClick={() => {handleClose()}}/>
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
