
import React, { useContext, useEffect } from 'react'
import pic1 from "../../../Assets/p1.jpeg";
import pic2 from "../../../Assets/p2.jpeg";
import pic3 from "../../../Assets/p3.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import mainContext from '../../../Context/mainContext';

const ContactProfile = (props) => {
  const context = useContext(mainContext)
  const {personDetail, getPersonDetail} = context

  useEffect(() => {
    getPersonDetail(props.email)
  }, [props.email])
  
  return (
    <div>
        <div className="profilePicSection">
        <img
          src={personDetail.profile}
          alt="profile pic"
        />
        <h2 className="PersonDetailName">{personDetail.fullName}</h2>
        <p className="PersonDetailEmail">~{personDetail.email}</p>
      </div>
      <div className="PersonDetail__media">
        <div>
          <p>Media, links and docs </p>
          <p>57 &gt;</p>
        </div>
        <div className="PersonDetail__mediaView">
          <img src={pic1} alt="PersonDetail__mediaView" />
          <img src={pic2} alt="PersonDetail__mediaView" />
          <img src={pic3} alt="PersonDetail__mediaView" />
        </div>
      </div>
      <div className="PersonDetail__statusPhone">
        <p>About and phone number</p>
        <p>{personDetail.about}</p>
        <p>{personDetail.phoneNo}</p>
      </div>
      <div className="PersonDetail__commonGroups">
        <p className="common">1 group in common</p>
        <div>
          {/* <CommonGroupContainer /> */}
        </div>
      </div>
      <div className="PersonDetail__BlockDelete">
        <div>
          
          <BlockIcon /> Block Sona Budz 💛
        </div>
        <div>
          <DeleteIcon /> Delete Chat
        </div>
      </div>
    </div>
  )
}

export default ContactProfile