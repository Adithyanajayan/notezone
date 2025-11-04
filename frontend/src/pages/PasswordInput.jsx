// src/components/PasswordInput.js
import React, { useState } from 'react';

const PasswordInput = ({
    value,
    onChange,
    error,
    disabled,
    placeholder = "Enter your password",
    showStrength = true
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        const strengthMap = {
            0: { label: 'Very Weak', color: 'bg-red-500' },
            1: { label: 'Weak', color: 'bg-red-400' },
            2: { label: 'Fair', color: 'bg-yellow-500' },
            3: { label: 'Good', color: 'bg-blue-400' },
            4: { label: 'Strong', color: 'bg-green-500' },
            5: { label: 'Very Strong', color: 'bg-green-600' }
        };

        return { strength, ...strengthMap[Math.min(strength, 5)] };
    };

    const strengthInfo = getPasswordStrength(value);

    return (
        <div className="space-y-3">
            <div className={`relative group ${disabled ? 'opacity-60' : ''}`}>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    className={`
            w-full px-4 py-4 pr-12
            border-2 rounded-xl
            transition-all duration-300
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            disabled:cursor-not-allowed
            disabled:bg-gray-50
            border-gray-200
            shadow-sm
            focus:border-green-500
            focus:ring-4
            focus:ring-green-100
            ${error ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100' : ''}
            ${value.length >= 8 && !error ? 'border-green-200 focus:border-green-500 focus:ring-green-100' : ''}
            hover:border-gray-300
            ${!isFocused && !error && value.length < 8 ? 'group-hover:border-gray-300' : ''}
          `}
                    placeholder={placeholder}
                />

                {value && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {showStrength && value && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">Password strength:</span>
                        <span className={`font-semibold ${strengthInfo.strength <= 1 ? 'text-red-500' :
                                strengthInfo.strength <= 2 ? 'text-yellow-500' :
                                    strengthInfo.strength <= 3 ? 'text-blue-500' : 'text-green-500'
                            }`}>
                            {strengthInfo.label}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${strengthInfo.color} ${strengthInfo.strength <= 1 ? 'w-1/5' :
                                    strengthInfo.strength <= 2 ? 'w-2/5' :
                                        strengthInfo.strength <= 3 ? 'w-3/5' :
                                            strengthInfo.strength <= 4 ? 'w-4/5' : 'w-full'
                                }`}
                        />
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default PasswordInput;