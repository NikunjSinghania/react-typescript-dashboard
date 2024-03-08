import React from 'react'
import { props } from '../Components/TypesFiles/ASPType'

class BreadcrumbError extends React.Component<props> {
    state = {
        hasError : false
    }

    staticGetDerivedError() {
        return { hasError : true }
    }

    
    render() {
        if(this.state.hasError) return "Breadcrumb Error"
        return this.props.children
      }
}

export default BreadcrumbError