import {
  TextInputStep,
  EmailInputStep,
  CpfInputStep,
  InputStepType,
  UrlInputStep,
  PhoneNumberInputStep,
  AskNameInputStep,
} from 'models'
import React, {
  ChangeEvent,
  ChangeEventHandler,
  RefObject,
  useEffect,
  useRef,
} from 'react'
import PhoneInput, { Value, Country } from 'react-phone-number-input'

type TextInputProps = {
  step:
    | TextInputStep
    | EmailInputStep
    | CpfInputStep
    | UrlInputStep
    | PhoneNumberInputStep
    | AskNameInputStep
  value: string
  onChange: (value: string) => void
}

export const TextInput = ({ step, value, onChange }: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value)
  }

  const handlePhoneNumberChange = (value?: Value | undefined) => {
    onChange(value as string)
  }

  switch (step.type) {
    case InputStepType.TEXT: {
      return step.options?.isLong ? (
        <LongTextInput
          ref={inputRef as unknown as RefObject<HTMLTextAreaElement>}
          value={value}
          placeholder={
            step.options?.labels?.placeholder ?? 'Digite a sua resposta...'
          }
          onChange={handleInputChange}
        />
      ) : (
        <ShortTextInput
          ref={inputRef}
          value={value}
          placeholder={
            step.options?.labels?.placeholder ?? 'Digite a sua resposta...'
          }
          onChange={handleInputChange}
        />
      )
    }
    case InputStepType.EMAIL: {
      return (
        <ShortTextInput
          ref={inputRef}
          value={value}
          placeholder={
            step.options?.labels?.placeholder ?? 'Digite o seu email...'
          }
          onChange={handleInputChange}
        />
      )
    }
    case InputStepType.CPF: {
      return (
        <ShortTextInput
          ref={inputRef}
          value={value}
          placeholder={
            step.options?.labels?.placeholder ?? 'Digite o seu cpf...'
          }
          onChange={handleInputChange}
        />
      )
    }
    case InputStepType.ASK_NAME: {
      return (
        <ShortTextInput
        ref={inputRef}
        value={value}
        placeholder={
          step.options?.labels?.placeholder ?? 'Digite o seu email...'
        }
        onChange={handleInputChange}
        />
      )
    }
    case InputStepType.URL: {
      return (
        <ShortTextInput
          ref={inputRef}
          value={value}
          placeholder={
            step.options?.labels?.placeholder ?? 'Digite a sua URL...'
          }
          onChange={handleInputChange}
          type="url"
        />
      )
    }
    case InputStepType.PHONE: {
      return (
        <PhoneInput
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={inputRef as any}
          value={value}
          onChange={handlePhoneNumberChange}
          placeholder={
            step.options.labels.placeholder ?? 'Seu número de telefone...'
          }
          defaultCountry={step.options.defaultCountryCode as Country}
        />
      )
    }
  }
}

const ShortTextInput = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <input
      ref={ref}
      className="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input"
      type="text"
      required
      style={{ fontSize: '16px' }}
      {...props}
    />
  )
)

const LongTextInput = React.forwardRef(
  (
    props: {
      placeholder: string
      value: string
      onChange: ChangeEventHandler
    },
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => (
    <textarea
      ref={ref}
      className="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input"
      rows={6}
      data-testid="textarea"
      required
      style={{ fontSize: '16px' }}
      {...props}
    />
  )
)
