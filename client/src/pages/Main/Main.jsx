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

    useEffect(() => {
        const getUsers = async () => {
            if (mainPageSearch.length > 1) {
                const res = await getUsersApi(mainPageSearch)
                if (res.success) {
                    setUsers(res.data)
                }
            } else if (mainPageSearch.length < 2) {
                setUsers([])
            }
        }
        const getCollections = async () => {
            const res = await getCollectionsApi(mainPageSearch, selectedFilter)
            if (res.success) {
                setCollections(res.data)
            }
        }
        const getItems = async () => {
            const res = await getItemsApi(mainPageSearch, selectedFilter)
            if (res.success) {
                setItems(res.data)
            }
        }
        const getTags = async () => {
            const res = await getTagsApi(mainPageSearch)
            if (res.success) {
                setTags(res.data)
            }
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
                    type === 'items' ? <RenderItems items={items} isOwner={false} /> :
                        type === 'collections' ? <RenderCollections type='mainPage' collections={collections} /> :
                            type === 'tags' ? <RenderTags tags={tags} /> :
                                type === 'users' ? <RenderUsers users={users} searchText={mainPageSearch} /> : ''
                }
            </div>
        </div>
    )
}

export default Main