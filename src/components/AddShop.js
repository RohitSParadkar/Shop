import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddShop = () => {

    const [shopName, setShopName] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState("");
    const [openingDate, setOpeningDate] = useState("");
    const [closingDate, setClosingDate] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const shops = useSelector((state) => state);

    const handleSubmit = (e) => {
        e.preventDefault();
        var letters = /^[A-Za-z]+$/;


        const checkName = shops.find(shop => shop.shopName === shopName && shopName);

        if (!shopName || !area || !category || !openingDate || !closingDate) {
            return toast.warning("Please fill in all fields!");
        }

        if (!shopName.match(letters)) {
            return toast.warning("Shop name should contain only alphabets!");
        }

        if (Date.parse(closingDate) <= Date.parse(openingDate)) {
            return toast.warning("Closing date should be after Opening date")
        }

        if (checkName) {
            return toast.error("Shop name already exist!")
        }

        const data = {
            id: shops[shops.length - 1].id + 1,
            shopName,
            area,
            category,
            openingDate,
            closingDate
        }

        dispatch({ type: "ADD_SHOP", payload: data });
        toast.success("Shop added successfully!!");
        navigate('/');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="display-3 text-center">
                    Add Shop
                </div>
            </div>
            <div className="col-md-6 shadow mx-auto p-5">
                <form onSubmit={handleSubmit} >
                    <div className="form-group mb-3">
                        <label for="inputName">Shop Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="Shop Name"
                            value={shopName} onChange={e => setShopName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <div className="form-row d-flex justify-content-between">
                            <div className="form-group col-md-5">
                                <label for="inputArea">Area</label>
                                <select id="inputArea" className="form-control" value={area} onChange={e => setArea(e.target.value)}>
                                    <option selected>Choose...</option>
                                    <option>Thane </option>
                                    <option> Pune </option>
                                    <option> Mumbai Suburban </option>
                                    <option> Nashik </option>
                                    <option> Nagpur </option>
                                    <option> Ahmednagar </option>
                                    <option> Solapur </option>
                                </select>
                            </div>
                            <div className="form-group col-md-5">
                                <label for="inputCategory">Category</label>
                                <select id="inputState" className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option selected>Choose...</option>
                                    <option>Grocery </option>
                                    <option> Butcher </option>
                                    <option> Baker </option>
                                    <option> Chemist </option>
                                    <option> Stationery shop </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="form-row d-flex justify-content-between">
                            <div className="form-group col-md-5">
                                <label for="inputOpeningDate">Opening Date</label>
                                <input type="date" id="openingDate" name="openingDate" value={openingDate} onChange={e => setOpeningDate(e.target.value)}></input>
                            </div>
                            <div className="form-group col-md-5">
                                <label for="inputClosingDate">Closing Date</label>
                                <input type="date" id="closingDate" name="closingDate" value={closingDate} onChange={e => setClosingDate(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            className="btn btn-block btn-dark"
                            type="submit"
                            value="Add Shop"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddShop