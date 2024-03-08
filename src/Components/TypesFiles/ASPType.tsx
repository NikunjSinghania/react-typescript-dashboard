export interface BreadcrumbInterface {
    routeForBreadcrumb : string,
    setRouteForBreadcrumb : (value : string) => void,
    
    drawer : boolean,
    setDrawer : (value : boolean) => void,
    

  menu : boolean,
  setMenu : (value : boolean) => void
  }


export interface Object {
    "bucketKey": string
    "objectKey": string
    "objectId": string
    "sha1": string
    "size": number
    "location": string
}

export interface props {
  children : React.ReactElement
}
