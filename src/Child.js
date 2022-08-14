import { Formik, Form } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

function Child({ values, onChange, onStateChange }) {
  const professions = ["Developer", "Designer", "Other"];
  const validationSchema = Yup.object({
    age: Yup.number()
      .min(15, "You need to be older than 15 to register")
      .max(20, "You need to be less than 20 to register")
      .required(),
    email: Yup.string().email().required(),
    profession: Yup.string().oneOf(
      professions,
      "The profession you chose does not exist"
    ),
  });

  useEffect(() => {
    let isValid = validationSchema.isValidSync(values);
    onStateChange(isValid);
  }, [values]);

  const handleOnChange = (
    { target: { value: newValue, name: targetName } },
    values,
    setFieldValue
  ) => {
    setFieldValue(targetName, newValue);
    let isValid = validationSchema.isValidSync({
      ...values,
      [targetName]: newValue,
    });
    onStateChange(isValid);
    if (isValid) {
      onChange({
        ...values,
        [targetName]: newValue,
      });
    }
  };

  return (
    <Formik
      initialValues={values}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={validationSchema}
      validateOnMount={true}
      isInitialValid={() => validationSchema.isValidSync(values)}
      onSubmit={async (values, { setFieldTouched, setSubmitting }) => {
        console.log("submitted values: ", values);
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
        <>
          <div className="mb-4">
            <label>Age</label>
            <input
              type="number"
              name="age"
              id="age"
              className={`block w-full rounded border py-1 px-2 ${
                touched.age && errors.age ? "border-red-400" : "border-gray-300"
              }`}
              onChange={(e) => {
                handleOnChange(e, values, setFieldValue);
              }}
              onBlur={handleBlur}
              value={values.age}
            />
            {touched.age && errors.age && (
              <span className="text-red-400">{errors.age}</span>
            )}
          </div>

          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`block w-full rounded border py-1 px-2 ${
                touched.email && errors.email
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              onChange={(e) => {
                handleOnChange(e, values, setFieldValue);
              }}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <span className="text-red-400">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label>Profession</label>
            <select
              name="profession"
              id="profession"
              className={`block w-full rounded border py-1 px-2 ${
                touched.profession && errors.profession
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              onChange={(e) => {
                handleOnChange(e, values, setFieldValue);
              }}
              onBlur={handleBlur}
              value={values.profession}
            >
              {professions.map((profession, index) => (
                <option value={profession} key={index}>
                  {profession}
                </option>
              ))}
            </select>
            {touched.profession && errors.profession && (
              <span className="text-red-400">{errors.profession}</span>
            )}
          </div>
        </>
      )}
    </Formik>
  );
}

export default Child;
