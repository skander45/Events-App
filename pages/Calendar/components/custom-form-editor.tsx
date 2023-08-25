import * as React from "react";
import { FormElement, Field, FieldRenderProps } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { TextArea, RadioGroup } from "@progress/kendo-react-inputs";
import { DatePicker, DateTimePicker } from "@progress/kendo-react-dateinputs";
import { SchedulerFormEditorProps } from "@progress/kendo-react-scheduler";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
const MyCustomInput = (fieldRenderProps: any) => {
    const { onChange, value } = fieldRenderProps;
    const data = [
        { label: "sign off celebration", value: "sign off celebration" },
        { label: "winter event", value: "winter event" },
        { label: "summer event", value: "summer event" }, { label: "other", value: "other" },
    ];
    return (
        <RadioGroup data={data} value={value} onChange={onChange} />
    );
};

const MyValidator = (value: string) =>
    value != "" ? "" : "This field is required.";
const MyInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};
export const CustomFormEditor = (props: SchedulerFormEditorProps) => {
    return (
        <FormElement horizontal={true}>
            <fieldset className={"k-form-fieldset"}>
                <div className="k-form-field">
                    <Label>Title*</Label>
                    <div className="k-form-field-wrap">
                        <Field validator={MyValidator} name={"title"} component={MyInput} rows={1} />
                    </div>
                </div>
                <div className="k-form-field">
                    <Label >Location*</Label>
                    <div className="k-form-field-wrap">
                        <Field validator={MyValidator} name={"location"} component={MyInput} rows={1} />
                    </div>
                </div>
                <div className="k-form-field">
                    <Label  >Type*</Label>
                    <div className="k-form-field-wrap">
                        <Field validator={MyValidator} name={"type"} component={MyCustomInput} rows={1} />
                    </div>
                </div>
                <div className="k-form-field">
                    <Label>Note</Label>
                    <div className="k-form-field-wrap">
                        <Field name={"description"} component={TextArea} rows={1} />
                    </div>
                </div>
                <div className="k-form-field">
                    <Label>Start</Label>
                    <div className="k-form-field-wrap">
                        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                            <Field

                                name={"start_date_and_time"}
                                component={props.startEditor || DatePicker}
                                as={DateTimePicker}
                                rows={1}
                                width={"200px"}
                                format="t"
                            />
                            &nbsp;
                            <Label>End</Label>
                            &nbsp;
                            <Field
                                name={"end_date_and_time"}
                                component={props.endEditor || DatePicker}
                                as={DateTimePicker}
                                rows={1}
                                width={"200px"}
                                format="t"
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </FormElement>
    );
};