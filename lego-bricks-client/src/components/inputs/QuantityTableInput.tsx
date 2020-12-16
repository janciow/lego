import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import classNames from 'classnames';

interface QuantityTableInputProps {
    element_id: string;
    lego_set_id: string;
    updateTotalValue: (elementId: string, setId: string, quantityTotal: number) => Promise<void>;
}

const totalSchema = Yup.object().shape({
    quantity_total_value: Yup.number()
        .required('Required')
});

const QuantityTableInput: React.FC<QuantityTableInputProps> = ({ element_id, lego_set_id, updateTotalValue }) => {
    const initialValues: any = { quantity_total_value: '', element_id, lego_set_id };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={totalSchema}
            onSubmit={(values, actions) => {
                updateTotalValue(values.element_id, values.lego_set_id, values.quantity_total_value)
                actions.setSubmitting(false);
            }} >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <div className="input-group">
                        <Field
                            name="quantity_total_value"
                            className={classNames('form-control', { 'is-invalid': errors.quantity_total_value })}
                            placeholder="ile"
                            type="text"
                        />

                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" disabled={isSubmitting} >ustaw</button>
                        </div>
                        {errors.quantity_total_value && touched.quantity_total_value ? (
                            <div className="invalid-feedback">{errors.quantity_total_value}</div>
                        ) : null}
                    </div>

                </Form>
            )}
        </Formik>
    )

}

export default QuantityTableInput;