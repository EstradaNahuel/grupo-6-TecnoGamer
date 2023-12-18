import { useEffect, useState } from 'react';

function ContentRowMovies() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const responseProducts = await fetch(
          'http://localhost:3020/api/products',
        );
        const responseUsers = await fetch('http://localhost:3020/api/users');

        if (!responseProducts.ok || !responseUsers.ok) {
          throw new Error('Error al obtener los datos');
        }

        const { data: productData } = await responseProducts.json();
        const { data: usersData } = await responseUsers.json();

        if (isMounted) {
          setTotalProducts(productData.length);
          setTotalUsers(usersData.length);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Products
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {totalProducts}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-award fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Users
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {totalUsers}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-user fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentRowMovies;