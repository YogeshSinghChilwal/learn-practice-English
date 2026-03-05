'use client';

import { QuizQuestion } from '@/hooks/useQuizGenerator';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface QuizInterfaceProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelectAnswer: (option: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  answered: boolean;
}

export function QuizInterface({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  onFinish,
  canGoPrevious,
  canGoNext,
  answered,
}: QuizInterfaceProps) {
  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'meaning':
        return 'bg-blue-100 text-blue-800';
      case 'synonym':
        return 'bg-purple-100 text-purple-800';
      case 'antonym':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'meaning':
        return 'Meaning';
      case 'synonym':
        return 'Synonym';
      case 'antonym':
        return 'Antonym';
      default:
        return 'Question';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-linear-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Question Type Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getQuestionTypeColor(
                question.type
              )}`}
            >
              {getQuestionTypeLabel(question.type)}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          {/* Word Highlight */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8 rounded">
            <p className="text-indigo-900 font-semibold text-lg">
              Word: <span className="text-indigo-700">{question.word}</span>
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showResult = answered && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !answered && onSelectAnswer(option)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all font-medium ${
                    showResult && isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : showResult && !isCorrect
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : answered && isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        showResult && isCorrect
                          ? 'border-green-500 bg-green-500'
                          : showResult && !isCorrect
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : answered && isCorrect
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {showResult && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showResult && !isCorrect && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      {!showResult && (isSelected || (answered && isCorrect)) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation (shown after answering) */}
          {answered && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-50 text-green-900'
                  : 'bg-blue-50 text-blue-900'
              }`}
            >
              <p className="font-semibold mb-2">Explanation:</p>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              canGoPrevious
                ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex gap-3">
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={onNext}
                disabled={!canGoNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  canGoNext
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-all"
              >
                Finish Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
