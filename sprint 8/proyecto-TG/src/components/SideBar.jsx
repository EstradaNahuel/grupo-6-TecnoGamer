import React, { useEffect } from "react";

function SideBar(){
   useEffect(() => {
      fetch('localhost:3020/api/products') 
         .then(response => response.json())       
         .then(data => console.log(data))
         .catch(error => console.error('Error:', error));
   }, []);

   return ( 
     <>
		<ul class="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
			<a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div class="sidebar-brand-icon">
					<img class="w-100" src="assets/images/logo-DH.png" alt="Digital House"/>
				</div>
			</a>
			<hr class="sidebar-divider my-0"/>
			<li class="nav-item active">
				<a class="nav-link" href="/">
					<i class="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard - TecnoGamer</span></a>
			</li>
			<hr class="sidebar-divider"/>
			<div class="sidebar-heading">Actions</div>
			<li class="nav-item">
				<a class="nav-link collapsed" href="/">
					<i class="fas fa-fw fa-folder"></i>
					<span>Pages</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/">
					<i class="fas fa-fw fa-chart-area"></i>
					<span>Charts</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/">
					<i class="fas fa-fw fa-table"></i>
					<span>Tables</span></a>
			</li>
			<hr class="sidebar-divider d-none d-md-block"/>
		</ul>
     </>
   )
}

export default SideBar;
