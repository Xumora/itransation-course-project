import React, { useEffect, useState } from 'react'
import { getCollectionsApi, getItemsApi, getUsersApi } from '../../shared/api/api'
import { useMainPageSearch } from '../../contexts/DataContext'

import Header from '../../common/Header/Header'
import RenderItems from '../../common/RenderItems/RenderItems'
import RenderCollections from '../../common/RenderCollections/RenderCollections'
import MainPageNavbar from './components/MainPageNavbar/MainPageNavbar'
import RenderUsers from '../../common/RenderUsers/RenderUsers'

const Main = () => {
    const [type, setType] = useState('items')
    const [selectedFilter, setSelectedFilter] = useState('Date')
    const [mainPageSearch] = useMainPageSearch()
    const [users, setUsers] = useState([])
    const [collections, setCollections] = useState([])
    const [items, setItems] = useState([])

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
            const res = await getCollectionsApi(mainPageSearch)
            if (res.success) {
                setCollections(res.data)
            }
        }
        const getItems = async () => {
            const res = await getItemsApi(mainPageSearch)
            if (res.success) {
                setItems(res.data)
            }
        }

        if (type === 'users') {
            getUsers()
        } else if (type === 'collections') {
            getCollections()
        } else if (type === 'items') {
            getItems()
        }
    }, [type, mainPageSearch])

    return (
        <div className='page'>
            <Header />
            <div className='page-main bg-light'>
                <MainPageNavbar type={type} setType={setType} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
                {
                    type === 'items' ? <RenderItems items={items} /> :
                        type === 'collections' ? <RenderCollections collections={collections} /> :
                            type === 'tabs' ? '' :
                                type === 'users' ? <RenderUsers users={users} searchText={mainPageSearch} /> : ''
                }
            </div>
        </div>
    )
}

export default Main