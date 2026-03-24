import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function LiveSite() {
    const {id} = useParams()
    const [html,setHtml] = useState("")
    const [error,setError] = useState("")
    useEffect(()=>{
        const handleGetWebsite = async()=>{
            try{
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`,{withCredentials:true})
                setHtml(result.data.latestCode)
            }
            catch(err){
                setError("Site not found")
                console.log(err);
            }
        }
        handleGetWebsite()
    },[id])

    if(error){
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                {error}
            </div>
        )
    }

  return (
    <div>
        <iframe title='Live Site' srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
    </div>
  )
}

export default LiveSite