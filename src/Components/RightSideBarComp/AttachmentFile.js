import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import mainContext from '../../Context/mainContext';
import generatePdfThumbnails from 'pdf-thumbnails-generator';

import './AttachmentFile.css'
const AttachmentFile = () => {
  const context = useContext(mainContext)
  const { attachfilesrc, attachToggle, attachedFileSize, attachedFileName, attachedFileType, setattachedthumb } = context
  const [pdfThumbnail, setpdfThumbnail] = useState("")
  async function generateThumbnails() {
    try {
        const thumbnails = await generatePdfThumbnails(attachfilesrc, 800);
        console.log(thumbnails);
        setpdfThumbnail(thumbnails[0])
        setattachedthumb(thumbnails[0].thumbnail)
    } catch (err) {
        console.error(err);
        setattachedthumb("No preview available")

    }
}
useEffect(() => {
  if (attachedFileType.split("/")[1] === "pdf") 
  generateThumbnails() 
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [attachedFileType])

  return (
    <div className='attachment-main-area'>
      <div className='attachment-header'><CloseIcon onClick={attachToggle} /></div>
      <div className='attachment-main'>
        <p>{attachedFileName}</p>
        
        {attachedFileType.split("/")[0] === "image" && (
          <img width="270px" alt="" src={attachfilesrc} />
        )}
        {attachedFileType.split("/")[1] === "pdf" && (
          <img
            className="attachmet__pdf__thumb"
            src={pdfThumbnail.thumbnail}
            alt=""
          />
        )}

        {attachedFileType.split("/")[0] !== "image" &&
          attachedFileType.split("/")[1] !== "pdf" && (
            <span data-testid="preview-generic" data-icon="preview-generic" className=""><svg viewBox="0 0 88 110" height="110" width="88" preserveAspectRatio="xMidYMid meet" className=""><g transform="translate(4 3)"><path stroke-opacity="0.08" stroke="#000" d="M3-.5h56.929a5.5 5.5 0 0 1 3.889 1.61l15.071 15.072a5.5 5.5 0 0 1 1.611 3.89V101a3.5 3.5 0 0 1-3.5 3.5H3A3.5 3.5 0 0 1-.5 101V3A3.5 3.5 0 0 1 3-.5z" fill="#FFF" fill-rule="evenodd"></path></g><path d="M65.5 3.5v15a3 3 0 0 0 3 3h15" stroke-opacity="0.12" stroke="#000" fill="#FFF"></path></svg></span>
          )}

        <p>{attachedFileSize} kB</p>
      </div>

    </div>
  )
}

export default AttachmentFile