import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import ErrorText from "../components/ErrorText";
import Loading from "../components/Loading";

export default function Addpizza() {
  const [name, setname] = useState("");
  const [errors, setErrors] = useState({});
  const [smallprice, setsmallprice] = useState('');
  const [mediumprice, setmediumprice] = useState('');
  const [largeprice, setlargeprice] = useState('');
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState('veg');

  const dispatch = useDispatch();

  const hasFieldErrors = Object.values(errors).filter(value => value).length;

  const isAddEnabled = name && smallprice && mediumprice && largeprice && image && description && category && !hasFieldErrors;
  const validateField = (name, value) => {
    let fieldErrors = {...errors};
    switch (name) {
      case 'name':
        switch (true) {
          case !value:
            fieldErrors[name] = 'Required';
            break;
          case /[^A-Za-z0-9]/.test(value):
            fieldErrors[name] = 'Should not contain special characters';
            break;
          case `${value}`.length <= 3:
            fieldErrors[name] = 'Should contain at least four characters';
            break;
          default:
            fieldErrors[name] = '';
            break;
        }
        break;
      case 'smallPrice':
      case 'mediumPrice':
      case 'largePrice':
        switch (true) {
          case !value:
            fieldErrors[name] = 'Required';
            break;
          default:
            fieldErrors[name] = '';
            break;
        }
        break;
      case 'description':
        switch (true) {
          case !value:
            fieldErrors[name] = 'Required';
            break;
          case value.length < 50:
            fieldErrors[name] = 'Should contain at least 50 characters';
            break;
          default:
            fieldErrors[name] = '';
            break;
        }
        break;
      case 'image':
        switch (true) {
          case !value:
            fieldErrors[name] = 'Required';
            break;
          case !value.match(/^https?:\/\/.+\/.+$/):
            fieldErrors[name] = 'Enter a valid image url';
            break;
          default:
            fieldErrors[name] = '';
            break;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  }

  const addpizzastate = useSelector((state) => state.addPizzaReducer);
  const { loading } = addpizzastate;
  function formHandler(e) {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };

    console.log(pizza);
    dispatch(addPizza(pizza));
  }

  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Add Pizza</h1>
        {loading && <Loading />}
        <form onSubmit={formHandler}>
          <input
            className={`form-control ${errors['name'] ? 'border border-danger' : ''}`}
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              validateField('name', value);
              setname(value);
            }}
          />
          <ErrorText text={errors['name']} />
          <input
            className={`form-control ${errors['smallPrice'] ? 'border border-danger' : ''}`}
            type="number"
            placeholder="small variant price"
            value={smallprice}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== '' && Number(value) <= 0) {
                return;
              }
              validateField('smallPrice', value);
              setsmallprice(value);
            }}
          />
          <ErrorText text={errors['smallPrice']} />
          <input
            className={`form-control ${errors['mediumPrice'] ? 'border border-danger' : ''}`}
            type="number"
            placeholder="medium variant price"
            value={mediumprice}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== '' && Number(value) <= 0) {
                return;
              }
              validateField('mediumPrice', value);
              setmediumprice(value);
            }}
          />
          <ErrorText text={errors['mediumPrice']} />
          <input
            className={`form-control ${errors['largePrice'] ? 'border border-danger' : ''}`}
            type="number"
            placeholder="large variant price"
            value={largeprice}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== '' && Number(value) <= 0) {
                return;
              }
              validateField('largePrice', value);
              setlargeprice(value);
            }}
          />
          <ErrorText text={errors['largePrice']} />
          <select
            style={{
              borderColor: '#ced4da'
            }}
            className={`form-control mt-2 ${errors['category'] ? 'border border-danger' : ''}`}
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
          <ErrorText text={errors['category']} />
          <input
            className={`form-control ${errors['description'] ? 'border border-danger' : ''}`}
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              validateField('description', value);
              setdescription(value);
            }}
          />
          <ErrorText text={errors['description']} />
          <input
            className={`form-control ${errors['image'] ? 'border border-danger' : ''}`}
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => {
              const value = e.target.value;
              validateField('image', value);
              setimage(value);
            }}
          />
          <ErrorText text={errors['image']} />
          <button disabled={!isAddEnabled} className="btn mt-3" type="submit">
            Add Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
