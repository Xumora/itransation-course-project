import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollectionInfoApi } from '../../shared/api/api'
import { useAddItemShow } from '../../contexts/UIContext'

import Header from '../../common/Header/Header'
import AddItem from '../../common/Modals/AddItem/AddItem'
import RenderItems from '../../common/RenderItems/RenderItems'

const Collection = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { collectionId } = useParams()
    const [addItemShow] = useAddItemShow()
    const [collectionData, setCollectionData] = useState(null)
    const [items, setItems] = useState([])

    useEffect(() => {
        const getCollectionInfo = async () => {
            let res = await getCollectionInfoApi(collectionId)
            if (res.success) {
                setItems(res.data.items)
                delete res.data.items
                setCollectionData(res.data)
            }
        }
        getCollectionInfo()
    }, [collectionId])

    return (
        <div className='page'>
            {
                addItemShow && <AddItem itemFields={collectionData?.itemFields} collectionId={collectionData?._id} />
            }
            {
                collectionData?.user?._id === userInfo.id ? <Header type='owner' /> : <Header />
            }
            <div className='page-main bg-light'>
                <RenderItems items={items} type='collectionInner' />
            </div>
        </div>
    )
}

export default Collection