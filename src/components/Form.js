import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import React from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import FormTextField from "./Form-Field";

const schema = yup.object({
  devolucoes: yup.array().of(
      yup.object().shape({
        idOrder: yup.string().required(),
        cpf: yup.string().required(),
        valor: yup.number().required()
      })
  )
});

function FormExample() {
  return (
    <Row>
      <Col>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            devolucoes: [{ idOrder: "123456789", cpf: "38937635609", valor: 1.99 }],
          }}
        >
          {({
            handleSubmit,
            values,
            errors,
            isValid,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Col></Col>
              <FieldArray
                name="devolucoes"
                render={(arrayHelpers) => (
                  <>
                    {values.devolucoes && values.devolucoes.length > 0 ? (
                      values.devolucoes.map((devolucao, index) => (
                        <Card key={index}>
                          <Card.Header>
                            <Card.Title>Devolução {index + 1}</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <Form.Row>
                              <FormTextField
                                as={Col}
                                sm="4"
                                controlId={`devolucoes.${index}.idOrder`}
                                label="Id Order"
                                type="text"
                                name={`devolucoes.${index}.idOrder`}
                              />
                              <FormTextField
                                as={Col}
                                sm="4"
                                controlId={`devolucoes.${index}.cpf`}
                                label="CPF"
                                type="text"
                                name={`devolucoes.${index}.cpf`}
                              />
                              <FormTextField
                                as={Col}
                                sm="4"
                                controlId={`devolucoes.${index}.valor`}
                                label="Valor"
                                type="number"
                                name={`devolucoes.${index}.valor`}
                              />
                            </Form.Row>
                          </Card.Body>
                          <Card.Footer>
                            <Button
                              type="button"
                              variant="outline-danger"
                              size="lg"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </Button>
                            <Button
                              type="button"
                              variant="outline-success"
                              size="lg"
                              onClick={() =>
                                arrayHelpers.push({
                                  firstName: "",
                                  lastName: "",
                                })
                              }
                            >
                              +
                            </Button>
                          </Card.Footer>
                        </Card>
                      ))
                    ) : (
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Adicionar devolução
                      </Button>
                    )}
                  </>
                )}
              />
              <Col>
                <Button
                  disabled={!isValid || isSubmitting}
                  variant="success"
                  as="input"
                  size="lg"
                  type="submit"
                  value="Submit"
                />
              </Col>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default FormExample;
