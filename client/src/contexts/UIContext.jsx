import React, { createContext, useContext, useState } from 'react'
const Context = createContext()


const UIContext = ({ children }) => {
    const [createCollectionShow, setCreateCollectionShow] = useState(false)
    const [addItemShow, setAddItemShow] = useState(false)
    const [editProfileShow, setEditProfileShow] = useState(false)
    const [followersShow, setFollowersShow] = useState(false)
    const [followingsShow, setFollowingsShow] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'day')

    const value = {
        createCollectionShow,
        setCreateCollectionShow,
        addItemShow,
        setAddItemShow,
        editProfileShow,
        setEditProfileShow,
        followersShow,
        setFollowersShow,
        followingsShow,
        setFollowingsShow,
        theme,
        setTheme
    }

    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    () => children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useCreateCollectionShow = (setterOnly) => {
    const { createCollectionShow, setCreateCollectionShow } = useContext(Context)
    return setterOnly ? [setCreateCollectionShow] : [createCollectionShow, setCreateCollectionShow]
}

const useAddItemShow = (setterOnly) => {
    const { addItemShow, setAddItemShow } = useContext(Context)
    return setterOnly ? [setAddItemShow] : [addItemShow, setAddItemShow]
}

const useEditProfileShow = (setterOnly) => {
    const { editProfileShow, setEditProfileShow } = useContext(Context)
    return setterOnly ? [setEditProfileShow] : [editProfileShow, setEditProfileShow]
}

const useFollowersShow = (setterOnly) => {
    const { followersShow, setFollowersShow } = useContext(Context)
    return setterOnly ? [setFollowersShow] : [followersShow, setFollowersShow]
}

const useFollowingsShow = (setterOnly) => {
    const { followingsShow, setFollowingsShow } = useContext(Context)
    return setterOnly ? [setFollowingsShow] : [followingsShow, setFollowingsShow]
}

const useTheme = (setterOnly) => {
    const { theme, setTheme } = useContext(Context)
    return setterOnly ? [setTheme] : [theme, setTheme]
}


export {
    UIContext,
    useCreateCollectionShow,
    useAddItemShow,
    useEditProfileShow,
    useFollowersShow,
    useFollowingsShow,
    useTheme
}