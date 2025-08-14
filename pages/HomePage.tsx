import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyIcon } from '../components/icons/CopyIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { Booklet } from '../types';

const HomePage: React.FC = () => {
    const [testCode, setTestCode] = useState<string>('');
    const [totalQuestions, setTotalQuestions] = useState<string>('150');
    const [totalTime, setTotalTime] = useState<string>('90');
    const [booklets, setBooklets] = useState<Booklet[]>([]);
    const [newBookletName, setNewBookletName] = useState<string>('');
    const [newBookletTime, setNewBookletTime] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const questionBookletCode = testCode ? `soal_${testCode}` : '';

    const copyToClipboard = useCallback(() => {
        if (questionBookletCode) {
            navigator.clipboard.writeText(questionBookletCode).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    }, [questionBookletCode]);
    
    const handleAddBooklet = () => {
        const timeNumber = parseInt(newBookletTime, 10);
        if (newBookletName.trim() && !isNaN(timeNumber) && timeNumber > 0) {
            setBooklets([...booklets, { name: newBookletName.trim(), time: timeNumber }]);
            setNewBookletName('');
            setNewBookletTime('');
        } else {
            alert('لطفاً نام و زمان معتبر (بیشتر از صفر) برای دفترچه وارد کنید.');
        }
    };

    const handleRemoveBooklet = (indexToRemove: number) => {
        setBooklets(booklets.filter((_, index) => index !== indexToRemove));
    };

    const handleStartTest = () => {
        if (!testCode || !totalQuestions || !totalTime) {
            alert('لطفاً کد آزمون، تعداد سوالات و زمان کل را وارد کنید.');
            return;
        }
        
        const questions = parseInt(totalQuestions, 10);
        const time = parseInt(totalTime, 10);

        if (isNaN(questions) || questions <= 0 || isNaN(time) || time <= 0) {
             alert('تعداد سوالات و زمان کل باید اعداد مثبت باشند.');
             return;
        }

        navigate('/answersheet', {
            state: {
                testCode,
                totalQuestions: questions,
                totalTime: time,
                booklets,
            },
        });
    };

    const telegramLink = questionBookletCode ? `https://t.me/hosein_mahmoodi32bot?text=${encodeURIComponent(questionBookletCode)}` : '#';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
            <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">ورود به آزمون</h1>
                    <p className="mt-2 text-sm text-gray-600">برای شروع، اطلاعات زیر را کامل کنید.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="test-code" className="block text-sm font-medium text-gray-700 mb-2">
                            لطفاً کد آزمون را در خانه پایین وارد کن 👇
                        </label>
                        <input
                            id="test-code"
                            type="text"
                            inputMode="numeric"
                            value={testCode}
                            onChange={handleNumericInputChange(setTestCode)}
                            placeholder="کد آزمون عددی"
                            className="w-full px-4 py-3 text-lg text-center border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           برای دریافت دفترچه سوال، کد پایینی را کپی کن و برای ربات بفرست
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={questionBookletCode}
                                placeholder="کد دفترچه اینجا نمایش داده می‌شود"
                                className="flex-grow px-4 py-3 text-lg text-left font-mono bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed"
                                dir="ltr"
                            />
                            <button
                                onClick={copyToClipboard}
                                disabled={!questionBookletCode}
                                className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                title="کپی کردن کد"
                            >
                                <CopyIcon className="w-6 h-6 text-gray-600" />
                            </button>
                            <a
                                href={telegramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 rounded-lg transition ${
                                    !questionBookletCode
                                    ? 'bg-blue-300 opacity-50 cursor-not-allowed pointer-events-none'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                                title="ارسال به تلگرام"
                                aria-disabled={!questionBookletCode}
                                onClick={(e) => !questionBookletCode && e.preventDefault()}
                            >
                                <TelegramIcon className="w-6 h-6" />
                            </a>
                        </div>
                        {isCopied && <p className="text-green-600 text-sm mt-2 text-center">کد با موفقیت کپی شد!</p>}
                    </div>
                </div>

                <div className="space-y-4 border-t-2 border-gray-100 pt-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">تنظیمات آزمون</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="total-questions" className="block text-sm font-medium text-gray-700 mb-1">
                                تعداد کل سوالات
                            </label>
                            <input
                                id="total-questions"
                                type="text"
                                inputMode="numeric"
                                value={totalQuestions}
                                onChange={handleNumericInputChange(setTotalQuestions)}
                                placeholder="مثال: 150"
                                className="w-full px-3 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="total-time" className="block text-sm font-medium text-gray-700 mb-1">
                                زمان کل آزمون (دقیقه)
                            </label>
                            <input
                                id="total-time"
                                type="text"
                                inputMode="numeric"
                                value={totalTime}
                                onChange={handleNumericInputChange(setTotalTime)}
                                placeholder="مثال: 90"
                                className="w-full px-3 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">دفترچه‌ها (اختیاری)</h3>
                        <div className="mt-2 space-y-2 max-h-32 overflow-y-auto pr-2">
                            {booklets.map((booklet, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                                    <p className="text-gray-800">{booklet.name} <span className="text-gray-500 text-sm">({booklet.time} دقیقه)</span></p>
                                    <button onClick={() => handleRemoveBooklet(index)} className="text-red-500 hover:text-red-700 font-semibold px-2">حذف</button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-2 mt-3">
                            <input
                                type="text"
                                value={newBookletName}
                                onChange={(e) => setNewBookletName(e.target.value)}
                                placeholder="نام دفترچه"
                                className="w-full sm:w-1/2 px-3 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                value={newBookletTime}
                                onChange={handleNumericInputChange(setNewBookletTime)}
                                placeholder="زمان (دقیقه)"
                                className="w-full sm:w-1/4 px-3 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                            <button
                                onClick={handleAddBooklet}
                                className="w-full sm:w-auto flex-grow px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-lg hover:bg-indigo-200 transition"
                            >
                                افزودن
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleStartTest}
                        disabled={!testCode}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                    >
                        ورود به پاسخ‌برگ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;