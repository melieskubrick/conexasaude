import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import FeatherIcon from 'react-native-vector-icons/Ionicons';
import {TextInputProps} from 'react-native';

import {useField} from '@unform/core';

import colors from '../../config/colors';
import {
  Container,
  TextInput,
  Icon,
  Error,
  ErrorIcon,
  ErrorMessage,
} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {name, icon = '', ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputValueRef = useCallback(
    (value: string) => {
      inputValueRef.current.value = value;
    },
    [inputValueRef],
  );

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {icon !== '' ? (
          <Icon
            name={icon}
            size={20}
            color={isFocused || isFilled ? colors.blue : colors.gray}
          />
        ) : (
          <></>
        )}

        <TextInput
          ref={inputElementRef}
          keyboardAppearance="light"
          placeholderTextColor={colors.gray}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleInputValueRef}
          {...rest}
        />
      </Container>

      {!!error && (
        <Error>
          <ErrorIcon>
            <FeatherIcon name="alert" size={15} color="#fff" />
          </ErrorIcon>
          <ErrorMessage>{error}</ErrorMessage>
        </Error>
      )}
    </>
  );
};

export default forwardRef(Input);
