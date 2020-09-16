import { Field, Form, Formik } from 'formik';
import React from 'react';

interface QuantityTableInputProps {
    quantity_total: number | null;
    element_id: string;
    updateTotalValu: (elementId: string, quantityTotal: number) => Promise<void>;
}

const QuantityTableInput: React.FC<QuantityTableInputProps> = ({ quantity_total, element_id, updateTotalValu }) => {
    const initialValues: any = { quantity_total_value: '', element_id };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                updateTotalValu(values.element_id, values.quantity_total_value)
                actions.setSubmitting(false);
            }} >
            {({ isSubmitting }) => (
                <Form>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">{quantity_total || '0'}</span>
                        </div>
                        <Field
                            name="quantity_total_value"
                            className="form-control"
                            placeholder="licza klockow"
                            type="text"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" disabled={isSubmitting} >zmien</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default QuantityTableInput;