import React, { useEffect } from 'react';
import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';
//import Footer from ';

function ContentWrapper(){
    useEffect(() => {
        fetch('localhost:3020/api/products') 
            .then(response => response.json())       
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    <ContentRowTop />
                    <Footer />
                </div>
            </div>    
        </>
    )
}
export default ContentWrapper;
