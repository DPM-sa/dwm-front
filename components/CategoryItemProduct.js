import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import SubcategoryItemProduct from './SubcategoryItemProduct'

const CategoryItemProduct = ({ categoryId }) => {
    const [category, setCategory] = useState({})
    const [subcategories, setSubcategories] = useState([])
    const [categoryOpen, setCategoryOpen] = useState('')
    const getCategory = async () => {
        await axios.get(`https://dwm-backend.herokuapp.com/category/${categoryId}`)
            .then(resp => {
                setCategory(resp.data.categoryDB)
            })
    }
    const getSubcategories = async () => {
        await axios.get(`https://dwm-backend.herokuapp.com/category/${categoryId}/subcategories`)
            .then(resp => {
                if (resp.data.categoriesDB.length > 0) {
                    setSubcategories(resp.data.categoriesDB)
                }
            })
    }
    useEffect(() => {
        getCategory()
    }, [])

    useEffect(() => {
        getSubcategories()
    }, [])
    const handleClick = (catId) => {
        if (subcategories.length === 0) {
            Router.push({
                pathname: '/productslist/category/[category]',
                query: {
                    category: categoryId
                }
            })
            return
        }
        if (categoryOpen !== catId) {
            setCategoryOpen(catId)
        }
        if (categoryOpen === catId) {
            setCategoryOpen('')
        }
    }
    return (
        <li className="products-category-item">
            <div onClick={() => handleClick(category._id)}>{category.nombre}</div>
            {
                subcategories.length > 0
                &&
                <ul className={categoryOpen === categoryId ? 'category-list-open' : 'category-list'}>
                    {
                        subcategories.map(subcategory => (
                            <SubcategoryItemProduct subcategory={subcategory} />
                        ))
                    }
                </ul>
            }
        </li>
    )
}

export default CategoryItemProduct

