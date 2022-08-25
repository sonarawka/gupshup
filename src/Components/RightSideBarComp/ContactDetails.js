import React from 'react'
import ContactHeader from './ContactDetail/ContactHeader'
import ContactProfile from './ContactDetail/ContactProfile'
import './ContactDetails.css'

const ContactDetails = () => {
  return (
    <div className='contact-details-main'> 
      <ContactHeader/>
      <ContactProfile/>
    </div>
  )
}

export default ContactDetails