import { IconButton } from 'src/components/iconButton';
import { TextInput } from 'src/components/textInput';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles/newModelApiConfig.module.css';
import { ChangeEvent } from 'react';
import { SelectInput } from 'src/components/selectInput';
import { optionsOpenApiDataTypes } from './selectOptions';
import { BodyParam, OpenApiDataTypes } from './types';

type RequestBodyParameterInputProps = {
  isFormikBinded?: boolean;
  value: BodyParam;
  showAddBtn?: boolean;
  disabled?: boolean;
  fieldError?: string;
  typeError?: string;
  propInputName?: string;
  propTypeName?: string;
  onChange: {
    (e: ChangeEvent<HTMLInputElement>): void;
    (value: BodyParam): void;
  };
  onAddClick?: () => void;
  onDeleteClick?: (param: BodyParam) => void;
};

function RequestBodyParamsHeading() {
  return (
    <div style={{ display: 'flex', marginBottom: 4 }}>
      <div className={styles.headingName}>Property Name</div>
      <div className={styles.headingVal}>Data Type</div>
    </div>
  );
}

function RequestBodyParameterInput(props: RequestBodyParameterInputProps) {
  const {
    isFormikBinded = false,
    value,
    showAddBtn = false,
    disabled = false,
    fieldError,
    typeError,
    propInputName,
    propTypeName,
    onChange,
    onAddClick,
    onDeleteClick,
  } = props;
  const disableAddBtn = value.field.trim() === '' || value.type.trim() === '';

  function handleRemoveBtnClick(param: BodyParam) {
    return () => onDeleteClick && onDeleteClick(param);
  }

  function handleKeyChange(e: ChangeEvent<HTMLInputElement>) {
    const updatedParam: BodyParam = { ...value, field: e.target.value };
    onChange(updatedParam);
  }

  function handleTypeChange(val: OpenApiDataTypes) {
    const updatedParam = { ...value, type: val };
    onChange(updatedParam);
  }

  return (
    <div className={styles.keyValRow}>
      <div className={styles.keyValCol}>
        <TextInput
          disabled={disabled}
          value={value.field}
          name={isFormikBinded && propInputName ? propInputName : 'paramName'}
          onChange={isFormikBinded ? onChange : handleKeyChange}
          maxLength={100}
          style={{ marginBottom: 0 }}
          error={fieldError}
        />
      </div>
      <div className={styles.keyValCol}>
        <SelectInput<OpenApiDataTypes>
          disabled={disabled}
          name={isFormikBinded && propTypeName ? propTypeName : 'propDataType'}
          options={optionsOpenApiDataTypes}
          onChange={isFormikBinded ? undefined : handleTypeChange}
          onSyntheticChange={isFormikBinded ? onChange : undefined}
          value={value.type}
          style={{ marginBottom: 0 }}
          error={typeError}
        />
      </div>
      {showAddBtn ? (
        <div className={styles.iconContainer}>
          <IconButton
            iconComponent={AddIcon}
            onClick={onAddClick}
            disabled={disableAddBtn}>
            <div
              style={{
                color: '#676767',
                fontSize: 15,
                margin: '0 6px',
              }}>
              Add
            </div>
          </IconButton>
        </div>
      ) : !disabled ? (
        <div className={styles.delIconContainer}>
          <IconButton
            iconComponent={CloseIcon}
            noOutline
            onClick={handleRemoveBtnClick(value)}
          />
        </div>
      ) : null}
    </div>
  );
}

export { RequestBodyParameterInput, RequestBodyParamsHeading };
