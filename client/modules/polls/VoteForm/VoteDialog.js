import React from 'react'
import Dialog from 'react-mdc-web/lib/Dialog/Dialog'
import DialogHeader from 'react-mdc-web/lib/Dialog/DialogHeader'
import DialogTitle from 'react-mdc-web/lib/Dialog/DialogTitle'
import DialogBody from 'react-mdc-web/lib/Dialog/DialogBody'
import DialogFooter from 'react-mdc-web/lib/Dialog/DialogFooter'
import Button from 'react-mdc-web/lib/Button/Button'
import withRelayContainer from 'utils/relay'

import { VoteFormFragmentContainer } from './VoteForm'

type VoteDialogProps = {
  viewer: {
    question: {}
  }
}
let VoteDialog = (props: VoteDialogProps) =>
  <Dialog
    open
    onClose={() => props.toggleDialog()}
  >
    <DialogHeader>
      <DialogTitle>
        Question: {props.viewer.question.questionText}
      </DialogTitle>
    </DialogHeader>
    <DialogBody>
      {console.log(props)}
      <VoteFormFragmentContainer {...props} question={props.viewer.question} />
    </DialogBody>
    <DialogFooter>
      <Button compact onClick={() => props.toggleDialog()} >Confirm</Button>
      <Button compact onClick={() => props.toggleDialog()} >Close</Button>
    </DialogFooter>
  </Dialog>

const query = graphql`
    query VoteDialogQuery($questionId: ID!) {
        viewer{
            question(id: $questionId){
                ...VoteForm_question
            }
        }
    }
`
VoteDialog = withRelayContainer(VoteDialog, query)

export default class VoteDialogButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return <div>
      <Button onClick={() => this.toggleDialog()} >Vote</Button>
      {
        this.state.isOpen ?
          <VoteDialog
            {...this.props}
            viewer={{ question: this.props.question }}
            relay={{
              ...this.props.relay,
              variables: {
                questionId: this.props.question.id
              }
            }
            }
            toggleDialog={this.toggleDialog.bind(this)}
          />
          : null}
    </div>
  }
}


