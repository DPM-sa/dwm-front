import { faChevronLeft, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faLinkedinIn, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import moment from 'moment';


const PostScreen = () => {
    const router = useRouter()
    const { query: { id }, isReady } = router
    const [post, setPost] = useState({
        image: '',
        title: '',
        date: '',
        content: ''
    })
    const [windowUrl, setWindowUrl] = useState('')
    const { image, title, date, content } = post
    const getPost = async () => {
        if (isReady) {
            await axios.get(`https://dwm-backend.herokuapp.com/post/${id}`)
                .then(resp => {
                    console.log(resp.data.post)
                    setPost({
                        image: resp.data.post.image,
                        title: resp.data.post.title,
                        date: resp.data.post.date,
                        content: resp.data.post.content
                    })
                })
        }

    }
    useEffect(() => {
        getPost()
    }, [isReady])
    useEffect(() => {
        setWindowUrl(window.location.href)
    }, [isReady])
    const truncatePostContent = (postContent) => {
        return postContent.substring(0, 50) + "..."
    }
    const formatDate = (date) => {
        return moment(date).format('D/MM/YYYY')
    }
    return (
        <Layout>
            <div className="novedades-top">
                <FontAwesomeIcon icon={faChevronLeft} />
                <h1>Novedades</h1>
            </div>
            <div className="post-screen-content">
                <img src={image} />
                <h2>{title}</h2>
                <div className="post-screen-social-media-icons">
                    <div>
                        <FontAwesomeIcon icon={faShareAlt} />
                    </div>
                    <div>
                        <FacebookShareButton
                            url={windowUrl}
                            quote={title}
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </FacebookShareButton>
                    </div>
                    <div>
                        <WhatsappShareButton
                            url={windowUrl}
                            title={title}
                        >
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </WhatsappShareButton>
                    </div>
                    <div>
                        <LinkedinShareButton
                            url={windowUrl}
                            title={title}
                            summary={truncatePostContent(content)}
                            source={"DWM"}
                        >
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </LinkedinShareButton>
                    </div>
                </div>
                <small>{formatDate(date)}</small>
                <p>{content}</p>
            </div>
        </Layout>
    )
}

export default PostScreen
