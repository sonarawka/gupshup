import React from 'react'
import ContactHeader from './ContactDetail/ContactHeader'
import ContactProfile from './ContactDetail/ContactProfile'
import './ContactDetails.css'

const ContactDetails = (props) => {
  return (
    <div className='contact-details-main'> 
      <ContactHeader/>
      <ContactProfile email={props.email}/>
    </div>
  )
}

export default ContactDetails