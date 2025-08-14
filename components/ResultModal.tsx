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

    const telegramLink = `https://t.me/hosein_mahmoodi32bot?text=${encodeURIComponent(keyCode)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">آزمون به پایان رسید!</h2>
                <p className="text-gray-600 mb-2">کد نهایی کلید خود را کپی کرده یا مستقیماً برای ربات تلگرام ارسال کنید.</p>
                
                <div className="my-6">
                    <div className="flex items-start gap-2">
                        <textarea
                            readOnly
                            value={keyCode}
                            className="flex-grow p-3 text-sm text-left font-mono bg-gray-100 border border-gray-300 rounded-lg resize-none"
                            dir="ltr"
                            rows={4}
                        />
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                title="کپی کردن کد"
                            >
                                <CopyIcon className="w-6 h-6 text-gray-600" />
                            </button>
                            <a
                                href={telegramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                title="ارسال به تلگرام"
                            >
                                <TelegramIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    {isCopied && <p className="text-green-600 text-sm mt-2">کد با موفقیت کپی شد!</p>}
                </div>

                <button
                    onClick={onClose}
                    className="w-full sm:w-auto mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                    بستن
                </button>
            </div>
        </div>
    );
};

export default ResultModal;