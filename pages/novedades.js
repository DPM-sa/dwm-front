import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import PostItem from '../components/PostItem'
import { useStateValue } from '../context/StateProvider'

const Novedades = () => {
    const [{ }, dispatch] = useStateValue()
    const [posts, setPosts] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(2)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getPosts = async () => {
        await axios.get('https://dwm-backend.herokuapp.com/posts')
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
                    currentItems.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))
                }
            </div>
            <Pagination itemsPerPage={itemsPerPage} paginate={paginate} totalItems={posts.length} />
        </Layout>
    )
}

export default Novedades
