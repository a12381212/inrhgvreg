
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Answer, AnswerOption, Booklet } from '../types';
import Timer from '../components/Timer';
import HelpSection from '../components/HelpSection';
import QuestionRow from '../components/QuestionRow';
import ResultModal from '../components/ResultModal';

const AnswerSheetPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        testCode,
        totalQuestions = 150,
        totalTime = 90,
        booklets = []
    } = location.state || {};

    const [answers, setAnswers] = useState<Answer[]>(() => Array(totalQuestions).fill(null));
    const [markedQuestions, setMarkedQuestions] = useState<boolean[]>(() => Array(totalQuestions).fill(false));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finalKey, setFinalKey] = useState('');

    useEffect(() => {
        if (!testCode) {
            alert('کد آزمون یافت نشد. به صفحه ورود بازگردانده می‌شوید.');
            navigate('/');
        }
    }, [testCode, navigate]);

    const handleSelectAnswer = useCallback((questionIndex: number, option: AnswerOption) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            // Allow deselecting by clicking the same option again
            newAnswers[questionIndex] = newAnswers[questionIndex] === option ? null : option;
            return newAnswers;
        });
    }, []);

    const handleMarkQuestion = useCallback((questionIndex: number) => {
        setMarkedQuestions(prevMarked => {
            const newMarked = [...prevMarked];
            newMarked[questionIndex] = !newMarked[questionIndex];
            return newMarked;
        });
    }, []);
    
    const handleFinishTest = () => {
        const answersString = answers.map(answer => answer ?? '').join(',');
        const generatedKey = `kelid_${testCode}_${answersString}`;
        setFinalKey(generatedKey);
        setIsModalOpen(true);
    };

    if (!testCode) {
        return null; // or a loading spinner
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="bg-white p-4 rounded-xl shadow-md mb-6 sticky top-4 z-10">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">پاسخ‌برگ آزمون</h1>
                <div className="flex flex-wrap justify-around items-center gap-4">
                    <Timer initialMinutes={totalTime} title="زمان پایان آزمون" />
                    {booklets.map((booklet: Booklet, index: number) => (
                         <Timer key={index} initialMinutes={booklet.time} title={booklet.name} />
                    ))}
                </div>
            </header>
            
            <main>
                <HelpSection />
                
                <div className="bg-white rounded-xl shadow-md p-4 mt-6">
                    <div className="space-y-2 h-[60vh] overflow-y-auto pr-2">
                       {answers.map((answer, index) => (
                           <QuestionRow
                                key={index}
                                questionNumber={index + 1}
                                selectedAnswer={answer}
                                isMarked={markedQuestions[index]}
                                onSelectAnswer={(option) => handleSelectAnswer(index, option as AnswerOption)}
                                onMarkQuestion={() => handleMarkQuestion(index)}
                           />
                       ))}
                    </div>
                </div>

                <div className="mt-8 mb-4">
                    <button
                        onClick={handleFinishTest}
                        className="w-full py-4 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                    >
                        اتمام آزمون و ارسال پاسخ‌ها
                    </button>
                </div>
            </main>

            <ResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                keyCode={finalKey}
            />
        </div>
    );
};

export default AnswerSheetPage;
