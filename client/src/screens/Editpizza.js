import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import ErrorText from "../components/ErrorText";
import Loading from "../components/Loading";

export default function Editpizza({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [errors, setErrors] = useState({});
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editloading } = editpizzastate;

  useEffect(() => {
    dispatch(getPizzaById(match.params.pizzaid));
  }, []);

  useEffect(() => {
    if (pizza) {
      setname(pizza.name);
      setdescription(pizza.description);
      setcategory(pizza.category);
      setsmallprice(pizza.prices[0]["small"]);
      setmediumprice(pizza.prices[0]["medium"]);
      setlargeprice(pizza.prices[0]["large"]);
      setimage(pizza.image);
    }
  }, [pizza, dispatch]);

  const hasFieldErrors = Object.values(errors).filter(value => value).length;

  const isEditEnabled = name && smallprice && mediumprice && largeprice && image && description && category && !hasFieldErrors;

  const validateField = (name, value) => {
    let fieldErrors = {...errors};
    switch (name) {
      case 'name':
        switch (true) {
          case !value:
            fieldErrors[name] = 'Required';
            break;
          case /[^A-Za-z0-9\s]/.test(value):
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
  };

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id: match.params.pizzaid,
      name: name.trim(),
      image: image.trim(),
      description: description.trim(),
      category: category.trim(),
      prices: {
        small: Number(smallprice),
        medium: Number(mediumprice),
        large: Number(largeprice),
      },
    };

    dispatch(editPizza(editedpizza));
  }

  return (
    <div>
      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Edit Pizza</h1>
        {(loading || editloading) && <Loading />}

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
          <button disabled={!isEditEnabled} className="btn mt-3" type="submit">
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
