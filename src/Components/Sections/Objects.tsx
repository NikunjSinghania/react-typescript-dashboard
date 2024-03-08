import { ReactEventHandler, useContext, useEffect, useRef, useState } from 'react'
import {BreadCrumbContext} from '../../App'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert, MenuItem, Select, SelectChangeEvent, Snackbar } from '@mui/material'
import { BreadcrumbInterface, Object } from '../TypesFiles/ASPType'
import ObjectsError from '../../ErrorBoundaries/ObjectsError'


var viewer : { start: () => any; loadDocumentNode: (arg0: any, arg1: any) => void };

function Objects() {

    
    const { bucketkey } = useParams()
    const { routeForBreadcrumb, setRouteForBreadcrumb, drawer, setDrawer } = useContext(BreadCrumbContext) as BreadcrumbInterface

    const [bucketNF, setBucketNF] = useState(false)
    const [currentObject, setCurrentObject] = useState('')
    const viewerRef = useRef(null)
    const dataParams = useParams()
    const [objects, setObjects] = useState<Object[] | null>(
    //[
    //         {
    //             "bucketKey": "2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app",
    //             "objectKey": "bottom_plate.dwg",
    //             "objectId": "urn:adsk.objects:os.object:2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app/bottom_plate.dwg",
    //             "sha1": "6f19d99ec64a9a50ab50cb9522e98185942c570d",
    //             "size": 91738,
    //             "location": "https://developer.api.autodesk.com/oss/v2/buckets/2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app/objects/bottom_plate.dwg"
    //         },
    //         {
    //             "bucketKey": "2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app",
    //             "objectKey": "rstbasicsampleproject.rvt",
    //             "objectId": "urn:adsk.objects:os.object:2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app/rstbasicsampleproject.rvt",
    //             "sha1": "606edc40add7451c4a7d6d260b5d33cb729e0cf0",
    //             "size": 6344704,
    //             "location": "https://developer.api.autodesk.com/oss/v2/buckets/2qhdaypfsllkrm6wtygtjqtyaxtpb75jy5x9ynlikhtay2pp-basic-app/objects/rstbasicsampleproject.rvt"
    //         }
    //     ]
    )

    useEffect(() => {
    
        setRouteForBreadcrumb(`/home/buckets/${bucketkey}`)


        const temp = localStorage.getItem('access_token') as string
        const access_token = JSON.parse(temp)
        let t = `Bearer ${access_token.access_token}`
        axios.get(`https://developer.api.autodesk.com/oss/v2/buckets/${dataParams.bucketkey}/objects`, {
            headers : {
                Authorization : t
            }
        } ).then(res => {
            setObjects(res.data.items)
        }).catch(err => {
            setBucketNF(true)
            
        })



        var options = {
            env: 'AutodeskProduction2',
            api: 'streamingV2',  // for models uploaded to EMEA change this option to 'streamingV2_EU'
            getAccessToken: function(onTokenReady : any) {
                var token = access_token.access_token;
                var timeInSeconds = 3600; // Use value provided by APS Authentication (OAuth) API
                onTokenReady(token, timeInSeconds);
            }
        };

        if((window as any).Autodesk) {
            (window as any).Autodesk.Viewing.Initializer(options, function() {
        
                var htmlDiv = document.getElementById('forgeViewer');
                viewer = new (window as any).Autodesk.Viewing.GuiViewer3D(htmlDiv)
                var startedCode = viewer.start();
                if (startedCode > 0) {
                    console.error('Failed to create a Viewer: WebGL not supported.');
                    return;
                }
            
                console.log('Initialization complete, loading a model next...');
                var htmlDiv = document.getElementById('forgeViewer');
                viewer = new (window as any).Autodesk.Viewing.GuiViewer3D(htmlDiv, {});
                viewer.start()
            });
        }

        
    }, [])

    useEffect(() => {

        function onDocumentLoadSuccess(viewerDocument : any) {
            
            var defaultModel = viewerDocument.getRoot().getDefaultGeometry();

            viewer.loadDocumentNode(viewerDocument, defaultModel);
        }
        
        function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
        }
        

        

        if(currentObject !== '') {

            var documentId = btoa(currentObject);
            (window as any).Autodesk.Viewing.Document.load('urn:'+documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        }
    }, [currentObject])

    const handleObjectChange = (e : SelectChangeEvent<string>) => {
        setCurrentObject(e.target.value);
        
    }

    return (
        <ObjectsError>
                <div style={{
            display : 'flex',
            flexDirection : 'column',
            padding : '10px',
            backgroundColor : 'white',
            borderRadius : '10px'
        }}>
            <Select
                value={currentObject}
                size='small'
                sx={{
                    width : '20vw',
                    border : '2px solid primary.dark',
                }}
                onChange={handleObjectChange}
            >
                {
                    objects && 
                    objects.map((e, i) => {
                        return (
                            <MenuItem 
                                key={e.sha1}
                                value={e.objectId}
                            >
                                {e.objectKey}
                            </MenuItem>
                        )
                    })
                }
                
            </Select>
            <div id="forgeViewer"></div>
            <Snackbar open={bucketNF} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}    
                    autoHideDuration={5000}
                    onClose={() => setBucketNF(false)}
            >
                <Alert
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Sorry! Bucket not found
                </Alert>
            </Snackbar>
        </div>
        </ObjectsError>
        
    )
}

export default Objects