import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollectionInfoApi } from '../../shared/api/api'
import { useAddItemShow } from '../../contexts/UIContext'
import { useAdmin } from '../../contexts/DataContext'

import Header from '../../common/Header/Header'
import AddItem from '../../common/Modals/AddItem/AddItem'
import RenderItems from '../../common/RenderItems/RenderItems'
import CollectionInfo from './components/CollectionInfo/CollectionInfo'

const Collection = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { collectionId } = useParams()
    const [addItemShow] = useAddItemShow()
    const [collectionData, setCollectionData] = useState(null)
    const [items, setItems] = useState([])
    const [admin] = useAdmin()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCollectionInfo = async () => {
            setLoading(true)
            let res = await getCollectionInfoApi(collectionId)
            if (res.success) {
                setItems(res.data.items)
                delete res.data.items
                setCollectionData(res.data)
            }
            setLoading(false)
        }
        getCollectionInfo()
    }, [collectionId])

    return (
        <div className='page'>
            {
                addItemShow && <AddItem itemFields={collectionData?.itemFields} setItems={setItems} />
            }
            {
                collectionData?.user?._id === userInfo.id || admin ? <Header type='owner' /> : <Header />
            }
            <div className='page-main bg-light'>
                <CollectionInfo user={collectionData?.user} name={collectionData?.name} itemsCount={collectionData?.itemsCount} />
                <RenderItems loading={loading} items={items} type='collectionInner' isOwner={userInfo.id === collectionData?.user?._id || admin ? true : false} setItems={setItems} />
            </div>
        </div>
    )
}

export default Collection