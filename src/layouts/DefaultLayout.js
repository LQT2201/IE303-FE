import React, { Children } from "react";
import Header from '../layouts/components/Header'
import { Box } from "@mui/material";
import Footer from "./components/Footer";

const DefaultLayout = ({children}) => {
    return (
        <Box  bgcolor="#F0F0F0">
            <Header/>
            <Box marginTop="65px">
                {children}
            </Box>
            <Footer/>
        </Box>  
    )
}

export default DefaultLayout