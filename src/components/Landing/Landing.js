import React from 'react'
import axios from 'axios'

const Landing = () => {

    const getData = async() => {
        const user_id = 1
        const articleData = await axios.get(`/api/articles/${user_id}`)
    }

    return (
        <div>

        </div>
    )

}

export default Landing