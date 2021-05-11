import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

interface Props {
    label: string;
    defaultValue?: string;
    className?: string;
    control: any;
    error: boolean;
    helperText: string | undefined;
    name: string;
    rules: any;
    rows?: number;
    type?: string;
}

const ZTextField: React.FC<Props> = ({
    label,
    defaultValue,
    className,
    control,
    error,
    name,
    helperText,
    rules,
    rows,
    type,
}) => {
    return (
        <div key={name} className={className}>
            <Controller
                key={name}
                as={
                    <TextField
                        error={error}
                        helperText={helperText}
                        multiline={type ? false : true}
                        rows={type ? undefined : rows}
                        type={type}
                    />
                }
                rules={rules}
                autoComplete='false'
                label={label}
                margin='dense'
                variant='outlined'
                fullWidth
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
        </div>
    );
};

ZTextField.defaultProps = {};

export default ZTextField;
