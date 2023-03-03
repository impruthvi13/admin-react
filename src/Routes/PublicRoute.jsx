import PropTypes from 'prop-types'
// import ls from 'localstorage-slim'
// import localStorage from 'react-secure-storage'

function PublicRoute ({ element: Component }) {
  return Component
}

PublicRoute.propTypes = {
  element: PropTypes.element.isRequired
}
export default PublicRoute
