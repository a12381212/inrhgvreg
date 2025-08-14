import React, { useState, useCallback } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { TelegramIcon } from './icons/TelegramIcon';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    keyCode: string;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, keyCode }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        if (keyCode) {
            navigator.clipboard.writeText(keyCode).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    }, [keyCode]);

    if (!isOpen) return null;

    const telegramLink = `https://t.me/hosein_mahmoodi32bot?start=${encodeURIComponent(keyCode)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">آزمون به پایان رسید!</h2>
                <p className="text-gray-600 mb-6">برای ثبت نهایی، یکی از دو روش زیر را برای ارسال کلید خود انتخاب کنید.</p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            ۱. کپی کردن کد نهایی کلید:
                        </label>
                        <div className="flex items-start gap-2">
                            <textarea
                                readOnly
                                value={keyCode}
                                className="flex-grow p-3 text-sm text-left font-mono bg-gray-100 border border-gray-300 rounded-lg resize-none"
                                dir="ltr"
                                rows={4}
                            />
                            <button
                                onClick={copyToClipboard}
                                className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                title="کپی کردن کد"
                            >
                                <CopyIcon className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        {isCopied && <p className="text-green-600 text-sm mt-2 text-center">کد با موفقیت کپی شد!</p>}
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            ۲. ارسال مستقیم به تلگرام
                        </label>
                        <a
                            href={telegramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full p-3 rounded-lg font-semibold transition bg-blue-500 text-white hover:bg-blue-600"
                            title="ارسال به تلگرام"
                        >
                            <TelegramIcon />
                            <span>ارسال کلید نهایی</span>
                        </a>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full sm:w-auto mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                    بستن
                </button>
            </div>
        </div>
    );
};

export default ResultModal;