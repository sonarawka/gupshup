
import React from 'react'
import pic1 from "../../../Assets/p1.jpeg";
import pic2 from "../../../Assets/p2.jpeg";
import pic3 from "../../../Assets/p3.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";

const ContactProfile = () => {
  return (
    <div>
        <div className="profilePicSection">
        <img
          src="https://pps.whatsapp.net/v/t61.24694-24/228818593_2417798355024822_6512361145359072319_n.jpg?ccb=11-4&oh=01_AVyiVbD5mewmIN9EyhvxU6IFh5HsSdH7T_9eJx-2xA3aOA&oe=631781F6"
          alt="profile pic"
        />
        <h2 className="PersonDetailName">Sona Rawka</h2>
        <p className="PersonDetailEmail">~sonarawka5@gmail.com</p>
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
        <p>Hey there! I am using WhatsApp.</p>
        <p>+91 97707 39554</p>
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