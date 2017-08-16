import React from 'react';
import { TagCloud } from "react-tagcloud";
import { Modal, Button, Icon }  from 'semantic-ui-react';

{/* <Modal open={props.open} content={props.value} /> */}
const wordCloud = (props) => {
  return (
    <div>
      <Modal basic open={props.open} size='small'>
        <Modal.Header className='modalHeader'>
          {props.tag.value}
        </Modal.Header>
        <Modal.Content className='modalContent'>
          {props.tag.value} is mentioned {props.tag.count} times.
        </Modal.Content>
        <Modal.Actions>
            <Icon name='checkmark' color='green' onClick={() => {props.handleClose()}}/>
        </Modal.Actions>
      </Modal>
      <TagCloud minSize={props.minSize}
                maxSize={props.maxSize}
                tags={props.data}
                shuffle={false}
                onClick={(tag) => {props.handleClick(tag)}}
                renderer={props.customRenderer}
      />
  </div>
  )
}
export default wordCloud
