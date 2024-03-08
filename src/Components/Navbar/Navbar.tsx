import { AppBar, Avatar, Box, IconButton, InputBase, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MessageIcon from '@mui/icons-material/Message';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { MoreVertRounded } from '@mui/icons-material';
import Quill from "quill";
import "quill-mention"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {BreadCrumbContext} from '../../App'
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { BreadcrumbInterface } from '../TypesFiles/ASPType'


const atValues = [
  { id: 1, value: "NIkunj Singhania" },
  { id: 2, value: "Naman Dwivedi" },
  { id: 1, value: "Sahil" },
  { id: 2, value: "Arpit" },
  { id: 1, value: "Aditya" },
  { id: 2, value: "Aatik" }
];
const hashValues = [
    { id: 1, value: "NIkunj Singhania" },
    { id: 2, value: "Naman Dwivedi" },
    { id: 1, value: "Sahil" },
    { id: 2, value: "Arpit" },
    { id: 1, value: "Aditya" },
    { id: 2, value: "Aatik" }
  ];



function Navbar() {

    const { routeForBreadcrumb, setRouteForBreadcrumb, drawer, setDrawer, menu, setMenu } = useContext(BreadCrumbContext) as BreadcrumbInterface

    const [menuOpen, setMenuOpen] = useState(false)
    const [quillOpen, setQuillOpen] = useState(false)

    

    const ref = useRef(null)
    const quillRef = useRef(null)
    const menuQuillContainer = useRef(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleCloseMenuMobile = () => {
        setMenuOpen(false)
        setAnchorEl(null)
    }

    const handleClickAway = () => {
        setQuillOpen(false)
    }

    const handleClickAwayMenu = () => {
        setMenuOpen(false)
    }

    const checkRef = useCallback((node : any) => {
        if(node) {
            
        var quill = new Quill(node, {
            theme: "snow",
            modules: {
              mention: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                mentionDenotationChars: ["@", "#"],
                source: function(searchTerm :any, renderList :any, mentionChar :any) {
                  let values;
          
                  if (mentionChar === "@") {
                    values = atValues;
                  } else {
                    values = hashValues;
                  }
          
                  if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                  } else {
                    const matches = [];
                    for (let i = 0; i < values.length; i++)
                      if (
                        ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                      )
                        matches.push(values[i]);
                    renderList(matches, searchTerm);
                  }
                }
              }
            }
          });
        }
    }, [])

    const handleClickOnMenuButton = (e : React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleQuillOpen = (e : React.MouseEvent<HTMLElement>) => {
        setQuillOpen(!quillOpen)
    }

    return (
        <AppBar 
        position='relative'
            sx={{
                bgcolor : 'primary.dark',
                width : '100vw',
                height : '6%',
                display : 'flex',
                justifyContent : 'space-between',
                alignItems : 'center',
                '&' : {
                    flexDirection : 'row'
                }
            }}
        >
            <span
                style={{
                    width : menu ? '80%' : '40%',
                    justifyContent : 'space-around',
                    display : 'flex',
                    padding : '10px',
                    alignItems : 'center'
                }}
            >
                {
                    routeForBreadcrumb.split('/').length == 2 ? <></> : <IconButton onClick={() => setDrawer(!drawer)}>
                    
                    <ArrowBackIosNewIcon sx={{ display : drawer ? 'flex' : 'none', color : 'white' }} />
                    <MenuIcon sx={{ display : drawer ? 'none' : 'flex', color : 'white' }} />
           
            
        </IconButton>
                }
                
                
                <Typography variant='h5'
                    sx={{
                        fontFamily : 'fantasy',
                        fontWeight : 100,
                    }}
                >
                    LOGO
                </Typography>
                <Box 
                    sx={{
                        width : '70%',
                        bgcolor : 'rgba(255,255,255,0.1)',
                        borderRadius : '3px',
                        display : 'flex',
                        alignItems : 'center'
                    }}    
                >
                    <SearchIcon
                    fontSize='small'
                    sx={{
                            marginLeft : '10px'
                        }}
                    />

                    <InputBase
                        placeholder='Search'
                        sx={{
                            width : '70%',
                            bgcolor : 'transparent',
                            padding : '4px',
                            color : 'white'
                        }}    
                    />
                </Box>
            </span>
            <span id="iconsHolder" style={{
                display : 'flex',
                width : 'fit-content',
                justifyContent : 'space-around',
                marginRight : '20px'
            }}>
                {
                    !menu && <>
                        <IconButton>
                    <NotificationsNoneIcon sx={{ color : 'white' }} />
                </IconButton>
                <IconButton>
                    <ManageAccountsIcon sx={{ color : 'white' }}/>
                </IconButton>
                <IconButton>
                    <HelpOutlineIcon sx={{ color : 'white' }}/>
                </IconButton>
                <IconButton onClick={handleQuillOpen}>
                    <MessageIcon ref={quillRef} sx={{ color : 'white' }}/>
                    
                </IconButton>
                <IconButton>
                    <AppsIcon sx={{ color : 'white' }}/>
                </IconButton>
                    <Avatar alt="Travis Howard"  sizes='small' src="/static/images/avatar/2.jpg" />
                
                    </>
                }
                


                <IconButton
                    ref={ref}
                    sx = {{
                        display : menu ? 'flex' : 'none'
                    }}
                    onClick={(e) => { setMenuOpen(!menuOpen) ; handleClickOnMenuButton(e)}}
                    
                >
                    <MoreVertRounded sx={{
                        color : 'white'    
                    }}
                    />
                </IconButton>
                
                
            </span>
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
            >
                    <Menu id="editor" open={quillOpen} ref={checkRef} style={{ width : menu ? '80vw' : '20vw' }}>
                        Hello World
                    </Menu>
            </ClickAwayListener>

                <Menu 
                    open={menuOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenuMobile}
                >
                    <MenuItem>
                        <IconButton>
                            <NotificationsNoneIcon sx={{ color : 'primary.dark' }} />
                        </IconButton>
                    </MenuItem>
                    <MenuItem>
                    <IconButton>
                    <ManageAccountsIcon sx={{ color : 'primary.dark' }}/>
                    </IconButton>
                    </MenuItem>
                    <MenuItem>
                    <IconButton>
                    <HelpOutlineIcon sx={{ color : 'primary.dark' }}/>
                    </IconButton>
                    </MenuItem>
                    <MenuItem>
                    <IconButton>
                    <AppsIcon sx={{ color : 'primary.dark' }}/>
                    </IconButton>
                    </MenuItem>
                    <MenuItem>
                    <IconButton onClick={handleQuillOpen}>
                    <MessageIcon sx={{ color : 'primary.dark' }}/>
                    </IconButton>
                    </MenuItem>
                    <MenuItem>
                    <Avatar alt="Travis Howard"  sizes='small' src="/static/images/avatar/2.jpg" />

                    </MenuItem>
                    
                   
                    
                    
                </Menu>
                
        </AppBar>
    )
}

export default Navbar