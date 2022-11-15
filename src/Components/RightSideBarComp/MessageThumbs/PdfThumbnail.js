import React from 'react'
import './PdfThumbnail.css'
import pdf from '../../../Assets/pdf.png'


const PDFThumbnail = ({url,thumbsrc,name,size,type}) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
  return (
    <div className='thumb__main' onClick={() => openInNewTab(url)}>
        <div className="pdf__thumb__container">
          <img src={thumbsrc} alt="" className="pdf__thumb"/>
        </div>
        <div className='pdf__thumb_filename'>
                <img src={pdf} alt="" width="26px"/>
                <p>{name&&name.slice(0,40)}...</p>
        </div>
        <div className='pdf__thumb_details'>
                <p>{parseInt(size)} kB</p> 
                <p> - </p>
                <p>{type}</p>
        </div>

    </div>
  )
}

export default PDFThumbnail