import React from 'react'
import { Icon, Step, Statistic } from 'semantic-ui-react'

const step = () => (
  <Step.Group className='steps' size='mini'>
    <Step className='steps'>
      <Icon name='signup'/>
      <Step.Content title='Sign up!'/>
    </Step>
    <Step className='steps'>
      <Icon name='checkmark' color='green'/>
      <Step.Content title='Choose Your Interests'/>
    </Step>
    <Step className='steps'>
      <Icon name='newspaper' />
      <Step.Content title='Enjoy!'/>
    </Step>
  </Step.Group>
)

export default step
