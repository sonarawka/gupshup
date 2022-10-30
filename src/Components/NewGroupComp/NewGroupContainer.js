import { collection, doc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import mainContext from '../../Context/mainContext'
import db from '../../Firebase'
import NewGroupItem from './NewGroupItem'

const NewGroupContainer = () => {
    const [myemail, setMyemail] = useState("")
    const context = useContext(mainContext)
    const { setgroupUsersList, groupUsersList } = context
    
    const getGroupUsersList = async()=>{
        const UserRef = collection(db, "Users")
        const observer = await getDocs(UserRef)
        observer.forEach((docSnapshot)=>{
            let arr=groupUsersList;
            arr.push({id: docSnapshot.id,
                data: docSnapshot.data()})
            setgroupUsersList( arr )
        })
    }
    
     
    useEffect(() => {
        setMyemail(localStorage.getItem("email"))
        getGroupUsersList()

    }, [])
    return (
        <div className="chat-item-container">
            {groupUsersList && groupUsersList.map((e) => {
                return (
                    <NewGroupItem myemail={myemail} email={e.data.email} key={e.id} id={e.id} name={e.data.fullName} profile={e.data.profile} />
                )
            })}


        </div>
    )
}

export default NewGroupContainer