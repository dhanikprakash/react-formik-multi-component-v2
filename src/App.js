import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Child from "./Child";
function App() {
  const professions = ["Developer", "Designer", "Other"];
  const initialValues = {
    name: "",
    child: {
      email: "",
      profession: professions[0],
      age: "",
    },
  };

  const [initVal, setInitVal] = useState(initialValues);
  const validationSchema = Yup.object({
    name: Yup.string().label("Full Name").min(5, "Min 5 charactors").required(),
  });
  const [childValues, setChildValues] = useState(initialValues);
  const [childState, setChildState] = useState(false);

  const onChildChange = (value) => {
    console.log(`child data ${JSON.stringify(value)}`);
    setChildValues({ ...childValues, child: value });
    setChildState(true);
  };
  const onChildStateChange = (isValid) => {
    console.log(`Inital Child State - ${isValid}`);
    setChildState(isValid);
  };

  return (
    <Formik
      initialValues={initVal}
      validateOnChange={true}
      validateOnMount={true}
      validateOnBlur={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldTouched, setSubmitting }) => {
        console.log(
          `child state ${childState}  submitted values:
          ${JSON.stringify({ ...values, child: childValues })}`
        );
      }}
    >
      {({
        values,
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        touched,
        handleChange,
        handleBlur,
        errors,
        isSubmitting,
      }) => (
        <div className="bg-blue-300 min-w-screen min-h-screen overflow-x-hidden">
          <Form className="max-w-lg mx-auto bg-white rounded shadow-lg mt-7 p-3">
            <h1 className="text-3xl mb-3 text-center">Register</h1>
            <div className="mb-4">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={`block w-full rounded border py-1 px-2 'border-red-400' : 'border-gray-300'}`}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                }}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && (
                <span className="text-red-400">{errors.name}</span>
              )}
            </div>

            <Child
              values={values.child}
              onChange={onChildChange}
              onStateChange={onChildStateChange}
            />

            <div className="text-center">
              <button
                className="bg-blue-500 rounded p-3 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default App;
