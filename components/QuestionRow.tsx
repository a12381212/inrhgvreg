
import React from 'react';
import { Answer, AnswerOption } from '../types';

interface QuestionRowProps {
    questionNumber: number;
    selectedAnswer: Answer;
    isMarked: boolean;
    onSelectAnswer: (option: AnswerOption) => void;
    onMarkQuestion: () => void;
}

const QuestionRow: React.FC<QuestionRowProps> = ({
    questionNumber,
    selectedAnswer,
    isMarked,
    onSelectAnswer,
    onMarkQuestion
}) => {
    const options: AnswerOption[] = [1, 2, 3, 4];
    const persianNumerals = ['۱', '۲', '۳', '۴'];

    const getMarkButtonClass = () => {
        let baseClass = "w-12 h-12 flex items-center justify-center text-lg font-bold rounded-lg transition-colors duration-200";
        if (isMarked) {
            return `${baseClass} bg-yellow-400 text-white hover:bg-yellow-500`;
        }
        return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
    };

    const getOptionButtonClass = (option: AnswerOption) => {
        let baseClass = "w-12 h-12 flex items-center justify-center text-lg font-bold rounded-lg transition-all duration-200 transform hover:scale-110";
        if (selectedAnswer === option) {
            return `${baseClass} bg-green-500 text-white shadow-md`;
        }
        return `${baseClass} bg-gray-100 text-gray-600 hover:bg-gray-200`;
    };

    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <button onClick={onMarkQuestion} className={getMarkButtonClass()}>
                {questionNumber}
            </button>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                {options.map((option, index) => (
                    <button
                        key={option}
                        onClick={() => onSelectAnswer(option)}
                        className={getOptionButtonClass(option)}
                    >
                        {persianNumerals[index]}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default React.memo(QuestionRow);
