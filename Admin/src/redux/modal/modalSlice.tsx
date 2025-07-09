import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState: intialState,
    reducers: {
        toggleModal(state) {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleModal } = modalSlice.actions;
export default modalSlice