import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'

function useGetCurrentUser() {
    useEffect(() => {
        const getCurrentUser = async()=>{
            try {
                const response = await axios.get(`${serverUrl}/api/user/me`, {
                    withCredentials: true
                })
                console.log(response)
                // console.log("Main chal raha hoon")
            } catch (error) {
                console.error('Error fetching current user:', error.response?.data || error.message)
            }
        }

        getCurrentUser()
    }, [])
}

export default useGetCurrentUser