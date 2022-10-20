import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../Firebase'
import NewGroupItem from './NewGroupItem'

const NewGroupContainer = () => {
    const [users, setusers] = useState()
    const [myemail, setMyemail] = useState("")
    useEffect(() => {
        setMyemail(localStorage.getItem("email"))
        const UserRef = collection(db, "Users")
        const observer = onSnapshot(UserRef, docSnapshot => {
            setusers(
                docSnapshot.docs.map((e) => ({
                    id: e.id,
                    data: e.data()
                }))
            )

            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        })

        return () => {
            observer()
        }

    }, [])
    return (
        <div className="chat-item-container">
            {users && users.map((e) => {
                return (
                    <NewGroupItem myemail={myemail} email={e.data.email} key={e.id} id={e.id} name={e.data.fullName} profile={e.data.profile} />
                )
            })}


        </div>
    )
}

export default NewGroupContainer