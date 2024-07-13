import { useEffect } from "react"
import { useState } from "react"
import Success from "./Success"


let initialFormData = {
    email: "",
    password: "",
    terms: false
}

export default function Login() {
    const [formData, setFormData] = useState(initialFormData)
    const [isFormValid, setIsFormValid] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        terms: null
    })

    function inputChangeHandler(event) {
        const { name, value, checked, type } = event.target
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
    }

    function loginFormSubmit(event) {
        event.preventDefault()

        if (isFormValid) {
            setIsSubmitted(true)
        }
    }

    const runValidations = () => {
        const newErrors = {
            email: null,
            password: null,
            terms: null
        };

        // email check
        const emailValid = String(formData.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!emailValid) {
            newErrors.email = "Lütfen geçerli bir email adresi giriniz!";
        } else {
            newErrors.email = null;
        }

        // password check
        const passwordValid = String(formData.password).match(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        );
        if (!passwordValid) {
            newErrors.password = "Lütfen büyük/küçük harflerden ve en az bir rakamdan oluşan bir şifre giriniz!";
        } else {
            newErrors.password = null;
        }

        // terms check
        const termsValid = formData.terms;
        if (!termsValid) {
            newErrors.terms = "Lütfen koşulları onaylayınız!";
        } else {
            newErrors.terms = null;
        }

        setErrors(newErrors);

        return emailValid && passwordValid && termsValid;
    };


    useEffect(() => {
        setIsFormValid(runValidations())
    }, [formData])

    return isSubmitted ? (<Success />) 
        : (
            <form onSubmit={loginFormSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={inputChangeHandler}
                        data-cy = "email-input" />
                        {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={inputChangeHandler}
                        data-cy = "password-input" />
                        {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="terms">Terms</label>
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={inputChangeHandler}
                        data-cy = "terms-input" />
                        {errors.terms && <p className="error">{errors.terms}</p>}
                </div>
                <div>
                    <button type="submit" disabled={!isFormValid} data-cy = "submit-btn">
                        Login
                    </button>
                </div>
            </form>
        )
}