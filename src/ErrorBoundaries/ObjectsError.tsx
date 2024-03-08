import React from 'react'
import { props } from '../Components/TypesFiles/ASPType'

class ObjectsError extends React.Component<props> {
    state = {
      hasError : false
    }
  
    static getDerivedStateFromError(  ) {
      return { hasError : true }
    }
  
    render() {
      if(this.state.hasError) return "Objects Error"
      return this.props.children
    }
  }

  export default ObjectsError