import React, { useEffect, useState } from 'react'
import { getCollectionsApi, getItemsApi, getTagsApi, getUsersApi } from '../../shared/api/api'
import { useMainPageSearch } from '../../contexts/DataContext'

import Header from '../../common/Header/Header'
import RenderItems from '../../common/RenderItems/RenderItems'
import RenderCollections from '../../common/RenderCollections/RenderCollections'
import MainPageNavbar from './components/MainPageNavbar/MainPageNavbar'
import RenderUsers from './components/RenderUsers/RenderUsers'
import RenderTags from './components/RenderTags/RenderTags'

const Main = () => {
    const [type, setType] = useState('items')
    const [selectedFilter, setSelectedFilter] = useState('Date')
    const [mainPageSearch] = useMainPageSearch()
    const [users, setUsers] = useState([])
    const [collections, setCollections] = useState([])
    const [items, setItems] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if (mainPageSearch.length > 1) {
                setLoading(true)
                const res = await getUsersApi(mainPageSearch)
                if (res.success) {
                    setUsers(res.data)
                }
                setLoading(false)
            } else if (mainPageSearch.length < 2) {
                setUsers([])
            }
        }
        const getCollections = async () => {
            setLoading(true)
            const res = await getCollectionsApi(mainPageSearch, selectedFilter)
            if (res.success) {
                setCollections(res.data)
            }
            setLoading(false)
        }
        const getItems = async () => {
            setLoading(true)
            const res = await getItemsApi(mainPageSearch, selectedFilter)
            if (res.success) {
                setItems(res.data)
            }
            setLoading(false)
        }
        const getTags = async () => {
            setLoading(true)
            const res = await getTagsApi(mainPageSearch)
            if (res.success) {
                setTags(res.data)
            }
            setLoading(false)
        }

        if (type === 'users') {
            getUsers()
        } else if (type === 'collections') {
            getCollections()
        } else if (type === 'items') {
            getItems()
        } else if (type === 'tags') {
            getTags()
        }
    }, [type, mainPageSearch, selectedFilter])

    return (
        <div className='page'>
            <Header type='mainPage' />
            <div className='page-main main bg-light'>
                <MainPageNavbar type={type} setType={setType} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                {
                    type === 'items' ? <RenderItems loading={loading} items={items} isOwner={false} /> :
                        type === 'collections' ? <RenderCollections loading={loading} type='mainPage' collections={collections} /> :
                            type === 'tags' ? <RenderTags tags={tags} loading={loading} /> :
                                type === 'users' ? <RenderUsers loading={loading} users={users} searchText={mainPageSearch} /> : ''
                }
            </div>
        </div>
    )
}

export default Main