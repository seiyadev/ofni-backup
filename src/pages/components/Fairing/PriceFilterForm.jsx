import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import VerifyTheme from "../General/verifyTheme";

const validationSchema = Yup.object().shape({
  min_price: Yup.number()
    .nullable()
    .test(
      "min-price",
      "El precio mínimo debe ser menor que el precio máximo",
      function (value) {
        const maxPrice = this.parent.max_price;
        if (value && maxPrice) {
          return value <= maxPrice;
        }
        return true;
      }
    )
    .test(
      "non-zero-first-digit",
      "El primer dígito no puede ser cero",
      function (value) {
        return /^[1-9]\d*$/.test(value);
      }
    ),
  max_price: Yup.number()
    .nullable()
    .test(
      "max-price",
      "El precio máximo debe ser mayor que el precio mínimo",
      function (value) {
        const minPrice = this.parent.min_price;
        if (value && minPrice) {
          return value >= minPrice;
        }
        return true;
      }
    )
    .test(
      "non-zero-first-digit",
      "El primer dígito no puede ser cero",
      function (value) {
        return /^[1-9]\d*$/.test(value);
      }
    ),
});

export default function PriceFilterForm() {
  const router = useRouter();
  const theme = VerifyTheme();

  return (
    <Formik
      initialValues={{ min_price: "", max_price: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const priceRange = values.min_price + "-" + values.max_price;
        router.push(
          router.pathname + "?" + new URLSearchParams({ priceRange })
        );
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <ul>
          <div className="flex items-center flex-row align-middle justify-between">
            <Typography variant="body2" fontWeight={"bold"}>
              Precio
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{
                textTransform: "none",
              }}
              onClick={() => {
                if (router.query.priceRange) {
                  formik.resetForm();
                  router.push(router.pathname);
                }
              }}
            >
              Limpiar
            </Button>
          </div>
          <li className="">
            <div className="flex justify-center items-center">
              <Field
                as={TextField}
                name="min_price"
                size="small"
                placeholder="Mín"
                error={
                  formik.touched.min_price && Boolean(formik.errors.min_price)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "2rem",
                  },
                  mr: "0.5rem",
                }}
                disabled={formik.isSubmitting}
              />
              <Field
                as={TextField}
                name="max_price"
                size="small"
                placeholder="Máx"
                error={
                  formik.touched.max_price && Boolean(formik.errors.max_price)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "2rem",
                  },
                }}
                disabled={formik.isSubmitting}
              />
              <IconButton
                variant="text"
                size="small"
                sx={{
                  textTransform: "none",
                  ml: "0.5rem",
                }}
                type="submit"
                onClick={formik.submitForm}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </IconButton>
            </div>
          </li>
        </ul>
      )}
    </Formik>
  );
}
