import React from 'react'
import { props } from '../Components/TypesFiles/ASPType'

class ErrorBoundary extends React.Component<props> {
    state = {
      hasError : false
    }
  
    static getDerivedStateFromError(  ) {
      return { hasError : true }
    }
  
    render() {
      if(this.state.hasError) return "ERROR IN SOMEWHERE"
      return this.props.children
    }
  }

  export default ErrorBoundary