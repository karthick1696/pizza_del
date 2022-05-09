import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Pizza(props) {
  const { pizza } = props;
  AOS.init({});

  const [quantity, setquantity] = useState(1);
  const [variant, setvariant] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  function addtocart() {
    dispatch(addToCart(pizza, quantity, variant));
  }

  return (
    <div
      data-aos="zoom-in"
      className="shadow-lg p-3 mb-5 bg-white rounded"
      key={pizza._id}
    >
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          className="img-fluid"
          style={{ height: "200px", width: "200px" }}
        />
      </div>

      <div className="flex-container">
        <div className="w-100 m-1">
          <p>Variants</p>
          <select
            className="form-control"
            value={variant}
            onChange={(e) => {
              setvariant(e.target.value);
            }}
          >
            {pizza.variants.map((variant, idx) => {
              return <option key={`variant${idx}`} value={variant}>{variant}</option>;
            })}
          </select>
        </div>

        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option key={`opt${i}`} value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Price : {pizza.prices[0][variant] * quantity} Rs/-
          </h1>
        </div>
        <div className="m-1 w-100">
          <button className="btn" onClick={addtocart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            alt={pizza?.name}
            src={pizza.image}
            className="img-fluid"
            style={{ height: "400px" }}
          />
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
