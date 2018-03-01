import { OPEN_MODAL, CLOSE_MODAL } from '../actions'

const defaultModalState = {
  headerText: '',
  isOpen: false,
  post: {}
}

function modal(state = defaultModalState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        headerText: action.headerText,
        isOpen: true,
        post: { ...action.post }
      }
    }
    case CLOSE_MODAL:
      return {
        isOpen: false,
        post: {}
      }
    default:
      return state
  }
}

export default modal