import React, { useLayoutEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useCreateCollectionShow, useEditProfileShow } from '../../contexts/UIContext'
import { useParams } from 'react-router-dom'
import { getUserInfoApi } from '../../shared/api/api'
import { useAdmin } from '../../contexts/DataContext'

import Header from '../../common/Header/Header'
import UserImg from './components/UserImg/UserImg'
import AddCollection from '../../common/Modals/AddCollection/AddCollection'
import AboutUser from './components/AboutUser/AboutUser'
import TagsBox from './components/TagsBox/TagsBox'
import RenderCollections from '../../common/RenderCollections/RenderCollections'
import EditProfile from '../../common/Modals/EditProfile/EditProfile'
import Shimmer from '../../common/Shimmer/Shimmer'

import './User.scss'
import { Close } from '@mui/icons-material'


const User = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { userId } = useParams()
    const [createCollectionShow] = useCreateCollectionShow()
    const [editProfileShow] = useEditProfileShow()
    const [userData, setUserData] = useState(null)
    const [collections, setCollections] = useState([])
    const [followedTags, setFollowedTags] = useState([])
    const [loading, setLoading] = useState(false)
    const [admin] = useAdmin()
    const [infoShow, setInfoShow] = useState(false)

    useLayoutEffect(() => {
        const getUserInfo = async () => {
            setLoading(true)
            let res = await getUserInfoApi(userId)
            if (res.success) {
                setCollections(res.data.collections)
                delete res.data.collections
                setFollowedTags(res.data.followedTags)
                delete res.data.followedTags
                setUserData(res.data)
            }
            setLoading(false)
        }
        getUserInfo()
    }, [userId])

    return (
        <div className='userPage bg-light'>
            {
                (admin || userId === userInfo.id) && createCollectionShow ? <AddCollection setCollections={setCollections} /> : ''
            }
            {
                editProfileShow && userId === userInfo.id && <EditProfile userData={userData} setUserData={setUserData} />
            }
            {
                userId === userInfo.id ? <Header type='profilePage' /> : admin ? <Header type='admin' /> : <Header />
            }
            <div className='userPage-main d-flex'>
                <div className={`border-end p-4 d-lg-flex flex-column userPage-main-left bg-light ${infoShow ? 'show' : ''}`}>
                    <div className='text-end closeBtn'><Button variant='text' onClick={() => setInfoShow(false)}><Close /></Button></div>
                    <div className='userPage-main-left-bio rounded bg-white p-3'>
                        {
                            loading ? <Shimmer type='aboutUserShimmer' /> : <AboutUser bio={userData?.bio} website={userData?.website} />
                        }
                    </div>
                    <div className='userPage-main-left-tags rounded bg-white p-3 mt-3'>
                        <TagsBox tags={followedTags} />
                    </div>
                </div>
                <div className='userPage-main-right'>
                    <UserImg loading={loading} bgImg={userData?.bgImg?.url} ava={userData?.img?.url} username={userData?.username} />
                    <div className='text-center infoBtn'><Button variant='contained' onClick={() => setInfoShow(true)}>Show additional information</Button></div>
                    <RenderCollections type={userInfo?.id === userId ? 'owner' : ''} collections={collections} setCollections={setCollections} />
                </div>
            </div>
        </div>
    )
}

export default User