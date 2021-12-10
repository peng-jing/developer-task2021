import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import styled, { createGlobalStyle } from 'styled-components'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faEye,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab)

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.5em;
    text-decoration: none;
  }
`
const Container = styled.div`
  background: #f1f5ff;
  position: relative;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const RegisterCard = styled.div`
  background: #ffffff;
  position: relative;
  padding: 75px 21px;
  @media screen and (min-width: 768px) {
    width: 610px;
    box-shadow: 0px 5px 10px 5px rgba(222, 231, 255, 0.25);
    border-radius: 20px;
    padding: 75px 110px 25px;
    margin: 50px 0;
  }
`
const TitleWrapper = styled.div`
  overflow: hidden;
`
const BackBtn = styled.div`
  cursor: pointer;
  position: absolute;
  & span {
    margin-left: 10px;
  }
  top: 41px;
  left: 19px;
  @media screen and (min-width: 768px) {
    top: 32px;
    left: 31px;
  }
  &:hover {
    font-weight: bold;
    border-bottom: solid 3px #3c71ff;
  }
`
const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`
const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`
const SocialRegister = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  & div + div {
    margin-left: 15px;
  }
  @media screen and (max-width: 360px) {
    & div + div {
      margin-left: 10px;
    }
  }
`
const SocialBtn = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px rgba(60, 113, 255, 0.5);
  border-radius: 5px;
  & span {
    font-size: 13px;
    margin-left: 5px;
    font-weight: 500;
  }
  @media screen and (min-width: 768px) {
    padding: 15px 5px;
    & span {
      margin-left: 10px;
    }
  }
  &:hover {
    background: #3c71ff;
    color: #ffffff;
    box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);
    .fa-icon {
      color: #ffffff;
    }
  }
`
const EmailRegister = styled.form``
const EmailTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  position: relative;
  margin: 30px auto;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    background: #000000;
    height: 1px;
    width: 100%;
    margin-left: 10px;
  }
`
const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  & div + div {
    margin-left: 15px;
  }
  @media screen and (max-width: 360px) {
    & div + div {
      margin-left: 10px;
    }
  }
`
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`
const InputTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  transition: transform 0.1s;
  pointer-events: none;
`
const Input = styled.input`
  width: 100%;
  border: none;
  background: #f1f5ff;
  padding: 25px 10px 10px;
  border-radius: 5px;
  margin: 10px auto;
  font-weight: 600;
  letter-spacing: 0.5px;
  &:placeholder-shown::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
  }
  &:focus + ${InputTitle}, &:not(:placeholder-shown) + ${InputTitle} {
    transform: scale(0.75) translate(-10px, -32px);
  }
`
const InputPassword = styled(Input)`
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 1.2px;
  ime-mode: active;
`
const Password = styled.div`
  position: absolute;
  font-size: 10px;
  top: 60%;
  left: 2.76%;
`
const SubmitBtn = styled.button`
  border: none;
  background: #3c71ff;
  color: #ffffff;
  width: 100%;
  padding: 19px;
  text-align: center;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 6px 15px rgba(60, 113, 255, 0.4);
  }
`
const LoginBtn = styled.div`
  cursor: pointer;
  font-size: 13px;
  color: #757575;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  &:hover {
    & a {
      border-bottom: solid #3c71ff 3px;
    }
  }
  & a {
    color: #3c71ff;
    font-weight: 700;
    margin-left: 5px;
  }
`
const FontAwesomeEye = styled(FontAwesomeIcon)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`
const PasswordCheckWrapper = styled.div`
  transition: 0.2s opacity;
  opacity: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  ${(props) => props.$active && `opacity: 1;`}
`
const PasswordCheck = styled.p`
  margin: 0px 15px 0px 5px;
  color: #ababab;
  ${(props) => props.$checked && `color: #000000;`}
`
const CheckLabel = styled.label`
  display: grid;
  grid-template-columns: 2em auto;
  gap: 0.5em;
  line-height: 1.2;
  font-size: 13px;
  color: #757575;
  font-weight: 500;
  margin: 10px 0px 25px;
  cursor: pointer;
`
const CheckInput = styled.input`
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  border: 1px solid #ababab;
  background: #ababab;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  transform: translateY(35%);
  display: grid;
  place-content: center;
  &:before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    transform: scale(0);
    clip-path: polygon(7% 50%, 34% 76%, 87% 9%, 95% 14%, 35% 91%, 0 57%);
    transform-origin: 5% 80%;
    background: #3c71ff;
  }
  &:checked {
    background: #ffffff;
    border: 1px solid #000000;
  }
  &:checked:before {
    transform: scale(2.5);
  }
`

export default function Register() {
  // const [user, setUser] = useState(null)
  const [password, setpassword] = useState('')
  const [starPassword, setStarPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [typeIsPassword, setTypeIsPassword] = useState(false)
  const [keyCode, setKeyCode] = useState('')
  // const [errMessage, setErrMessage] = useState()
  async function signUp(username, firstName, lastName, email, password) {
    try {
      const { user } = await Auth.signUp({
        username,
        firstName,
        lastName,
        password,
        attributes: {
          email
        }
      })
      console.log(user)
    } catch (error) {
      console.log('error signing up:', error)
    }
  }
  const { register, handleSubmit } = useForm()

  const onSubmit = (submitData) => {
    // setErrMessage(null)
    if (!/[0-9]/.test(password)) {
      return
    }
    const { firstName, lastName, email } = submitData
    signUp(email, firstName, lastName, email, password)
  }

  // useEffect(() => {
  //   if (error) {
  //     setErrMessage('該帳號或信箱已被註冊')
  //     console.log(error)
  //   }
  // }, [error])

  const handleKeyDown = (e) => {
    setTypeIsPassword(false)
    setKeyCode('')
    if (e.keyCode === 229) {
      return setKeyCode('chinese')
    }
    if (e.keyCode === 8) setKeyCode('backspace')
  }

  const handleChange = (e) => {
    if (keyCode === 'chinese') return
    const value = e.target.value
    setStarPassword(value.replace(/./g, '*'))
    if (keyCode === 'backspace')
      return setpassword(password.substr(0, password.length - 1))
    setpassword(password + value.substr(value.length - 1, 1))
  }

  const handleVisible = () => {
    return isVisible ? setIsVisible(false) : setIsVisible(true)
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <RegisterCard>
          <BackBtn>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </BackBtn>

          <SubTitle children={'Start from free'} />
          <Title children={'Create an account'} />
          <SocialRegister>
            <SocialBtn
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
            >
              <FontAwesomeIcon
                icon={['fab', 'google']}
                className='fa-icon'
                color='#3C71FF'
                size='lg'
              />
              <span>Sign up with Google</span>
            </SocialBtn>
            <SocialBtn
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
            >
              <FontAwesomeIcon
                icon={['fab', 'facebook-f']}
                className='fa-icon'
                color='#3C71FF'
                size='lg'
              />
              <span>Sign up with Facebook</span>
            </SocialBtn>
          </SocialRegister>

          <EmailRegister onSubmit={handleSubmit(onSubmit)}>
            <TitleWrapper>
              <EmailTitle children={'Or use your email for registration'} />
            </TitleWrapper>
            <UserName>
              <InputWrapper>
                <Input
                  placeholder='First Name'
                  type='text'
                  {...register('firstName')}
                  required='required'
                />
                <InputTitle children='First Name' />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder='Last Name'
                  type='text'
                  {...register('lastName')}
                  required='required'
                />
                <InputTitle children='Last Name' />
              </InputWrapper>
            </UserName>
            <InputWrapper>
              <Input
                placeholder='Email'
                type='email'
                {...register('email')}
                required='required'
              />
              <InputTitle children='Email' />
            </InputWrapper>
            <InputWrapper>
              <InputPassword
                type={typeIsPassword ? 'password' : 'text'}
                placeholder='Password'
                value={starPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onClick={() => !password && setTypeIsPassword(true)}
                onPaste={(e) => {
                  e.preventDefault()
                  return false
                }}
                onCopy={(e) => {
                  e.preventDefault()
                  return false
                }}
                required='required'
                pattern='.{8,}'
              />
              <InputTitle children='Password' />
              {isVisible && <Password children={password} />}
              <FontAwesomeEye
                color={isVisible ? '#3C71FF' : '#ABABAB'}
                icon={faEye}
                onClick={handleVisible}
              />
            </InputWrapper>
            <PasswordCheckWrapper $active={password}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size='sm'
                color={password.length > 7 ? '#4AE7A5' : '#ABABAB'}
              />
              <PasswordCheck $checked={password.length > 7}>
                8 Characters min.
              </PasswordCheck>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size='sm'
                color={/[0-9]/.test(password) ? '#4AE7A5' : '#ABABAB'}
              />
              <PasswordCheck $checked={/[0-9]/.test(password)}>
                One number
              </PasswordCheck>
            </PasswordCheckWrapper>

            <CheckLabel>
              <CheckInput type='checkbox' required='required' />
              By creating account, you agree to accept our Privacy Policy, Terms
              of Service and Notification settings.
            </CheckLabel>
            <SubmitBtn children='Create an Free Account!' />
          </EmailRegister>
          <LoginBtn>
            Already have an account?
            <a href='/'>Log in</a>
          </LoginBtn>
        </RegisterCard>
      </Container>
    </>
  )
}
