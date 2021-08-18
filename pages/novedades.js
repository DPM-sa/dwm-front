import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PostItem from '../components/PostItem'
import { useStateValue } from '../context/StateProvider'

const Novedades = () => {
    const [{ }, dispatch] = useStateValue()
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        await axios.get('http://localhost:4000/posts')
            .then(resp => {
                console.log(resp.data.posts)
                setPosts(resp.data.posts)
            })
    }
    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        dispatch({
            type: 'TRIGGER_SIDEBAR',
            isOpenSidebar: false
        })
    }, [])

    return (
        <Layout>
            <div className="novedades-top">
                <FontAwesomeIcon icon={faChevronLeft} />
                <h1>Novedades</h1>
            </div>
            <div className="novedades-list">
                {
                    posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))
                }
            </div>
        </Layout>
    )
}

export default Novedades
