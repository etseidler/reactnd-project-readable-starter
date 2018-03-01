import { LOAD_CATEGORIES } from '../actions'

const defaultCategoryState = {
  byName: {},
  allNames: []
}

function categories(state = defaultCategoryState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      const allNames = action.categories.map(category => category.name)
      const byName = action.categories.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
      return {
        byName,
        allNames
      }
    }
    default:
      return state
  }
}

export default categories