import { Modal } from "@mui/material";
import { useEffect, useState } from "react";


function CreateBucketModel({ch} : { ch : boolean }) {

    const [currentOpen, setCurrentOpen] = useState(ch)

    return (
        <Modal
            open={currentOpen}
            onClose={() => {
                setCurrentOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <></>
        </Modal>
    )
}

export default CreateBucketModel