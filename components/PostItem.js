import React from 'react'
import moment from 'moment'
import Router from 'next/router'

const PostItem = ({ post }) => {
    const truncatePostContent = (postContent) => {
        return postContent.substring(0, 120) + "..."
    }
    const formatDate = (date) => {
        return moment(date).format('D/MM/YYYY')
    }
    const handleRedirect = () => {
        Router.push({
            pathname: '/post/[id]',
            query: {
                id: post._id
            }
        })
    }
    return (
        <div onClick={handleRedirect} className="novedades-list-item">
            <img src={post.image} />
            <h2>{post.title}</h2>
            <small>{formatDate(post.date)}</small>
            <p>{truncatePostContent(post.content)}</p>
        </div>
    )
}

export default PostItem
