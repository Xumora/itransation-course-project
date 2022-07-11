import React, { createContext, useContext, useState } from 'react'
import en from '../shared/language/en'
import ru from '../shared/language/ru'
const Context = createContext()


const UIContext = ({ children }) => {
    const language = localStorage.getItem('language')
    const [createCollectionShow, setCreateCollectionShow] = useState(false)
    const [addItemShow, setAddItemShow] = useState(false)
    const [editProfileShow, setEditProfileShow] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'day')
    const [lang, setLang] = useState(language === 'en' ? en : language === 'ru' ? ru : !language ? en : '')

    const value = {
        createCollectionShow,
        setCreateCollectionShow,
        addItemShow,
        setAddItemShow,
        editProfileShow,
        setEditProfileShow,
        theme,
        setTheme,
        lang,
        setLang
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

const useTheme = (setterOnly) => {
    const { theme, setTheme } = useContext(Context)
    return setterOnly ? [setTheme] : [theme, setTheme]
}

const useLang = (setterOnly) => {
    const { lang, setLang } = useContext(Context)
    return setterOnly ? [setLang] : [lang, setLang]
}


export {
    UIContext,
    useCreateCollectionShow,
    useAddItemShow,
    useEditProfileShow,
    useTheme,
    useLang
}