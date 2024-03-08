import Breadcrumb from "../BreadCrumb/Breadcrumb"
import { Route, Routes } from "react-router-dom"
import Buckets from "../Sections/Buckets"
import Objects from "../Sections/Objects"
import { Drawer, List, ListItem, ListItemButton, Typography } from "@mui/material"

import { useContext } from "react";
import {BreadCrumbContext} from '../../App'
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { BreadcrumbInterface } from '../TypesFiles/ASPType'
import BreadcrumbError from "../../ErrorBoundaries/BreadcrumbError"
import BucketsError from "../../ErrorBoundaries/BucketsError"

function Main() {

    
    const { routeForBreadcrumb, setRouteForBreadcrumb, drawer, setDrawer, menu, setMenu } = useContext(BreadCrumbContext) as BreadcrumbInterface

    const breadcrumbSplit = routeForBreadcrumb.split("/")

    const ListItemButtonStyle = {
        paddingTop : '15px',
        paddingBottom : '15px'
    }

    
    

    return (
        <div style={{
            height : '94%',
            display : 'flex',
            width : '100vw'
        }}>
            <Drawer
                sx={{
                    position : menu ? 'absolute' : 'relative',
                    display : breadcrumbSplit.length == 2 ? 'none' : 'flex',
                    height : '100%',
                    bgcolor : '#E7E7E7',
                    width: drawer ? menu ? '100%' : '20%' : menu ? '0%' : '0%',
                    maxWidth : drawer ? menu ? '100%' : '20%' : menu ? '0%' : '0%',
                    overflow : 'hidden',
                    transitionDuration : '1s',
                    '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper' : {
                        height : '100%',
                        bgcolor : '#E7E7E7',
                        position : 'relative'
                    }
                  }}
                  variant="persistent"
                  anchor="left"
                  open={true}
            >
                <List>
                    <ListItemButton component="a" href="#simple-list" sx={ListItemButtonStyle}>
                        <HomeIcon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Home
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="hubs"  sx={ListItemButtonStyle}>
                        <TakeoutDiningIcon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Hubs
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="#simple-list"  sx={ListItemButtonStyle}>
                        <AccountTreeIcon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Projects
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="#simple-list"  sx={ListItemButtonStyle}>
                        <FolderIcon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Folders
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="#simple-list"  sx={ListItemButtonStyle}>
                        <TurnedInNotIcon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Items
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="#simple-list"  sx={ListItemButtonStyle}>
                        <Diversity2Icon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Versions
                        </Typography>
                    </ListItemButton>
                    <ListItemButton component="a" href="/"  sx={ListItemButtonStyle}>
                        <Inventory2Icon sx={{
                            textAlign : 'start',
                            display : 'flex',
                            alignItems : 'flex-start',
                            color : 'black'
                        }}/>
                        <Typography  sx={{
                            color : 'black',
                            marginLeft : '30px'
                        }}>
                            Buckets
                        </Typography>
                    </ListItemButton>
                </List>
            </Drawer>
            <div style={{
                padding : '15px',
                width : drawer ? menu ? '0%' : '80%' : menu ? '100%' : '100%',
                height : '100%',
                transitionDuration : '1s'
            }}>
                <BreadcrumbError>
                    <Breadcrumb />
                </BreadcrumbError>
                
                <BucketsError>
                    <Routes>
                        <Route path='/' element={<Buckets />} />
                        <Route path='/buckets/:bucketkey' element={<Objects />} />
                        <Route path='/buckets' element={<Buckets />} />
                    </Routes>
                </BucketsError>
                
                
            </div>
            
        </div>
    )
}

export default Main