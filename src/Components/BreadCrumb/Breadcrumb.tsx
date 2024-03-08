import { Breadcrumbs } from "@mui/material"
import Link from '@mui/material/Link';
import { useContext, useEffect } from "react";
import { BreadCrumbContext } from '../../App'
import { BreadcrumbInterface } from '../TypesFiles/ASPType'

function Breadcrumb() {

    const { routeForBreadcrumb, setRouteForBreadcrumb } = useContext(BreadCrumbContext) as BreadcrumbInterface

    const breadcrumbSplit = routeForBreadcrumb.split("/")

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                display: 'flex',
                width: '100%',
                overflow: 'hidden',
                padding: '5px'
            }}
        >


            {
                breadcrumbSplit.map((e, i) => {
                    if (i == 0) return;
                    return (
                        <Link
                            key={i + e}
                            underline="hover"
                            color="inherit"
                            href={e == 'home' || e == 'buckets' ? '/' : e}
                            sx={{
                                fontWeight: i == breadcrumbSplit.length - 1 && e != 'home' ? 900 : 100,
                                textTransform: 'capitalize',
                                color: i == breadcrumbSplit.length - 1 && breadcrumbSplit.length == 1 ? 'primary.light' : 'black'
                            }}
                        >
                            {e}
                        </Link>
                    )
                })
            }


        </Breadcrumbs>
    )
}

export default Breadcrumb