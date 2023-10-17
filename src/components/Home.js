import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const Home = () => {

    const shops = useSelector((state) => state);
    const dispatch = useDispatch();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date = Date.parse(yyyy + '-' + mm + '-' + dd);

    var open = () => {
        return <p style={{ color: "green", fontWeight: "bold" }}>Open</p>
    }

    var close = () => {
        return <p style={{ color: "red", fontWeight: "bold" }}>Close</p>
    }

    function formatDate(input) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1], day = datePart[2];

        return day + '/' + month + '/' + year;
    }

    const searchArea = () => {
        let filter = document.getElementById('myArea').value.toUpperCase();
        let myTable = document.getElementById('my_table');
        let tr = myTable.getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[2];

            if (td) {
                let textvalue = td.textContent || td.innerHTML;
                if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

    }

    const searchCategory = () => {
        let filter = document.getElementById('myCategory').value.toUpperCase();
        let myTable = document.getElementById('my_table');
        let tr = myTable.getElementsByTagName('tr');

        for (var i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[3];

            if (td) {
                let textvalue = td.textContent || td.innerHTML;
                if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

    }

    const deleteShop = (id) => {
        dispatch({ type: "DELETE_SHOP", payload: id });
        toast.success("Shop deleted successfully!!");
    }

    return (
        <div className="container">
            <div className="col-md-12 my-5 d-flex justify-content-end text-right">
                <Link to="/add" className="btn btn-outline-dark" >Add Shop</Link>
            </div>
            <div className="row">
                <div className='col-3'>
                    <div class="card shadow">
                        <div class="card-header bg-dark text-white">
                            <b>Filter</b>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <label style={{ marginLeft: "4px", marginBottom: "8px" }}><b>Area</b></label>
                                <input type="text" class="form-control" placeholder="Search..." id='myArea' onKeyUp={searchArea} />
                            </li>
                            <li class="list-group-item">
                                <label style={{ marginLeft: "4px", marginBottom: "8px" }}><b>Category</b></label>
                                <input type="text" class="form-control" placeholder="Search..." id='myCategory' onKeyUp={searchCategory} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-9'>
                    <div className="col-md-8 mx-auto" style={{ width: "1000px" }}>
                        <div class="table-responsive my-custom-scrollbar table-wrapper-scroll-">
                            <table className="table table-hover" id='my_table'>
                                <thead className="table-header bg-dark text-white">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Shop Name</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Opening Date</th>
                                        <th scope="col">Closing Date</th>
                                        <th scope='col'>Status</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shops.length > 0 ? (
                                        shops.map((shop, id) => (
                                            <tr key={id}>
                                                <td>{id + 1}</td>
                                                <td>{shop.shopName}</td>
                                                <td>{shop.area}</td>
                                                <td>{shop.category}</td>
                                                <td>{formatDate(shop.openingDate)}</td>
                                                <td>{formatDate(shop.closingDate)}</td>
                                                <td>{(date >= Date.parse(shop.openingDate) && date < Date.parse(shop.closingDate)) ? open() : close()}</td>
                                                <td className='d-flex flex-column'>
                                                    <Link
                                                        to={`/edit/${shop.id}`}
                                                        className="btn btn-sm btn-primary mb-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteShop(shop.id)}
                                                        className="btn btn-sm btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <th>No Shop found</th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home