
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

const HelpSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-lg font-semibold text-gray-700 focus:outline-none"
            >
                <span>راهنما</span>
                {isOpen ? <ChevronUpIcon className="w-6 h-6"/> : <ChevronDownIcon className="w-6 h-6"/>}
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-200">
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>با کلیک (لمس) روی گزینه مورد نظر، پاسخ خود را برای سوال مربوطه وارد کنید.</li>
                        <li>با کلیک (لمس) روی شماره سوال، می‌توانید آن را نشان‌دار کنید. با این کار رنگ شماره سوال زرد می‌شود.</li>
                        <li>با کلیک (لمس) دوباره روی گزینه انتخاب شده، می‌توانید آن را حذف کنید.</li>
                        <li>با انتخاب گزینه‌ای غیر از گزینه انتخاب شده، به طبع گزینه جدید ثبت می‌شود.</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HelpSection;
