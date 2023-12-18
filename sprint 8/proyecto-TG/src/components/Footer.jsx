import React from 'react';


function Footer(){
    useEffect(() => {
        fetch('localhost:3020/api/products') 
            .then(response => response.json())       
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <>
			<footer className="sticky-footer bg-white">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>Copyright &copy; Dashboard 2023</span>
					</div>
				</div>
			</footer>

        </>
    )
}
export default Footer;