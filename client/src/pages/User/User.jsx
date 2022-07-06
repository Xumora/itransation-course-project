import React, { useEffect, useState } from 'react'
import { useCreateCollectionShow, useEditProfileShow } from '../../contexts/UIContext'
import { useParams } from 'react-router-dom'
import { getUserInfoApi } from '../../shared/api/api'

import Header from '../../common/Header/Header'
import UserImg from './components/UserImg/UserImg'
import AddCollection from '../../common/Modals/AddCollection/AddCollection'
import AboutUser from './components/AboutUser/AboutUser'
import TagsBox from './components/TagsBox/TagsBox'
import RenderCollections from '../../common/RenderCollections/RenderCollections'
import EditProfile from '../../common/Modals/EditProfile/EditProfile'

import './User.scss'

const User = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { userId } = useParams()
    const [createCollectionShow] = useCreateCollectionShow()
    const [editProfileShow] = useEditProfileShow()
    const [userData, setUserData] = useState(null)
    const [collections, setCollections] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        const getUserInfo = async () => {
            let res = await getUserInfoApi(userId)
            if (res.success) {
                setCollections(res.data.collections)
                delete res.data.collections
                setTags(res.data.followedTags)
                delete res.data.followedTags
                setUserData(res.data)
            }
        }
        getUserInfo()
    }, [userId])

    return (
        <div className='userPage bg-light'>
            {
                createCollectionShow && userId === userInfo.id && <AddCollection />
            }
            {
                editProfileShow && userId === userInfo.id && <EditProfile userData={userData} setUserData={setUserData} />
            }
            {
                userId === userInfo.id ? <Header type='user' /> : <Header />
            }
            <div className='userPage-main d-flex'>
                <div className='userPage-main-left border-end p-4 d-flex flex-column'>
                    <div className='userPage-main-left-bio rounded bg-white p-3'>
                        <AboutUser bio={userData?.bio} website={userData?.website} />
                    </div>
                    <div className='userPage-main-left-tags rounded bg-white p-3 mt-3'>
                        <TagsBox tags={tags} />
                    </div>
                </div>
                <div className='userPage-main-right'>
                    <UserImg bgImg={userData?.bgImg?.url} ava={userData?.img?.url} username={userData?.username} />
                    <RenderCollections type={userInfo?.id === userId ? 'user' : ''} collections={collections} />
                </div>
            </div>
        </div>
    )
}

export default User