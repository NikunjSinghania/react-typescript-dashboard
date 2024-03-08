import { Alert, Button, Chip, CircularProgress, Divider, Grid, Link, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyIcon from '@mui/icons-material/Key';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Modal } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {BreadCrumbContext} from '../../App'
import { BreadcrumbInterface } from '../TypesFiles/ASPType'

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(5),
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'flex-start',
    width : '100%',
}))

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display : 'flex',
    flexDirection : 'column'
  };

  
interface Bucket {
    bucketKey : string,
    policyKey : string,
    createdDate : number
}

function Buckets() {
    const { routeForBreadcrumb, setRouteForBreadcrumb, drawer, setDrawer } = useContext(BreadCrumbContext) as BreadcrumbInterface

    setRouteForBreadcrumb('/home')
    setDrawer(false)
    const [buckets, setBuckets] = useState<Bucket[]>([]  as Bucket[] )
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [submitClick, onSubmitClick] = useState(false)
    const [bucketKey, setBucketKey] = useState('')
    const [policyKey, setPolicyKey] = useState('transient')
    const [successbucketCreation, setsuccessbucketCreation] = useState(false)
    const [errorBucketCreation, seterrorBucketCreation] = useState(false)
    useEffect(() => {

        

        const temp = localStorage.getItem('access_token') as string
        const access_token = JSON.parse(temp)

        try {
            axios.get('https://developer.api.autodesk.com/oss/v2/buckets', {
                headers : {
                    Authorization : `Bearer ${access_token.access_token}`
                }
            }).then((res) => {
                setBuckets(res.data.items)
                setLoading(true)
            })
        }catch(err) {
            console.log(err);
            
        }
    }, [])

    const handleSubmit = () => {
        let ck = localStorage.getItem('access_token') as string
        let d = JSON.parse(ck)

        if(bucketKey) {
            onSubmitClick(true)
        }
        else{
            return
        }
        try {
            axios.post('https://developer.api.autodesk.com/oss/v2/buckets', {
                bucketKey,
                policyKey ,
                
            },
            {headers : {
                Authorization : `Bearer ${d.access_token}`
            }}).then((res) => {
                setsuccessbucketCreation(true)
                onSubmitClick(false)
            }).catch(err => {
                seterrorBucketCreation(true)
                onSubmitClick(false)
            })
        }catch(err) {
            console.log(err);
            
        }
    }

    return (
        <div style={{
            width : '100%',
            display : 'flex',
            flexDirection : 'column',
            padding : '10px',
            background : 'white',
            borderRadius : '10px'
        }}>
            <Button variant='contained' sx={{
                bgcolor : 'primary.dark',
                color : 'white',
                width :'fit-content'
            }}
            onClick={() => {setOpen(true)}}
            >
                Create Bucket
            </Button>

            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6">
                        New Bucket Details
                    </Typography>
                    <span style={{ margin : '10px 0' }}>
                            <TextField required onChange={(e) => setBucketKey(e.target.value)} size="small" id="filled-basic" label="Bucket Key" variant="outlined" sx={{ 
                                color : 'primary.dark',
                                width : '100%'
                            }}/>

                    </span>
                    <span>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={'transient'}
                        label="Policy Key"
                        size="small"
                        onChange={(e) => setPolicyKey(e.target.value)}
                        sx={{
                            width : '100%'
                        }}
                    >
                        <MenuItem value={'persistent'}>persistent</MenuItem>
                        <MenuItem value={'transient'}>transient</MenuItem>
                        <MenuItem value={'persistent'}>persistent</MenuItem>
                    </Select>

                    </span>
                    <Button onClick={() => handleSubmit()} variant="contained" sx={{ margin : '10px 0', width : 'fit-content', bgcolor : 'primary.dark' }}>
                        Submit
                        {
                            submitClick &&
                            <CircularProgress sx={{
                                color : 'white',
                                marginLeft : '20px',
                                '&' : {
                                    width : '20px !important',
                                    height : '20px !important'
                                }
                            }} />
                        }
                    </Button>
                </Box>
            </Modal>
                        
            <Grid sx={{ width : '100%' }} container xs={12} sm={12} lg={12} display={"flex"} justifyContent={'space-between'} flexWrap={'wrap'}>
                {
                    loading &&
                    buckets.map((bucket, index) => {

                        const bucketDate = new Date(bucket.createdDate)

                        return (
                                <Grid xs={12} sm={3.8} lg={2.8} key={index} sx={{
                                    boxShadow : '0px 0px 20px '+'primary.dark',
                                    bgcolor : 'whitesmoke',
                                    marginTop : '20px',
                                    borderRadius : '10px'
                                }}>
                                    <Item>
                                        <span style={{
                                            display : 'flex',
                                            alignItems : 'center',
                                            textOverflow : 'ellipsis',
                                            overflow : 'hidden',
                                            width : '100%'
                                        }}>
                                            <Inventory2Icon 
                                            fontSize="small"
                                            sx={{
                                                color : 'primary.dark',
                                                margin : '5px'
                                            }} />
                                            <Typography noWrap>
                                                Bucket Key : {bucket.bucketKey}
                                            </Typography>
                                        </span>
                                        <span style={{
                                            display : 'flex',
                                            alignItems : 'center'
                                        }}>
                                            <CalendarMonthIcon  
                                            fontSize="small"
                                            sx={{
                                                color : 'primary.dark',
                                                margin : '5px'
                                            }} />
                                            <Typography>
                                                Created At : {`${bucketDate.getDate()}/${bucketDate.getMonth()+1}/${bucketDate.getFullYear()}`}
                                            </Typography>
                                        </span>
                                        <span style={{
                                            margin : '10px 0'
                                        }}>
                                            <Chip icon={<KeyIcon fontSize="small" />} label={bucket.policyKey} />
                                        </span>
                                        <Divider component="li" sx={{
                                            width : '100%',
                                            marginTop : '10px',
                                            '&' : {
                                                listStyle : 'none'
                                            }
                                        }}/>
                                        <Button href={`/buckets/${bucket.bucketKey}`} sx={{ marginTop : '10px', bgcolor : 'primary.dark' }} size="small" variant="contained">
                                            Open Hub
                                        </Button>
                                    </Item>
                                       
                                        
                                    </Grid>
                            
                        )
                    })
                }
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}    
                open={successbucketCreation}
                autoHideDuration={5000}
                onClose={() => setsuccessbucketCreation(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Successfully Bucket Created
                </Alert>
                </Snackbar>
                <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}    
                open={errorBucketCreation}
                autoHideDuration={5000}
                onClose={() => seterrorBucketCreation(false)}
            >
                <Alert
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Sorry! Bucket cannot be created
                </Alert>
                </Snackbar>
        </div>
        
    )
}

export default Buckets