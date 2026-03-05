'use client';

import { QuizResult } from '@/hooks/useQuizGenerator';
import { RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
}

export function QuizResults({ result, onRetry }: QuizResultsProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Section */}
        <div className={`${getScoreBg(result.score)} rounded-lg shadow-lg p-12 mb-8 text-center`}>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Quiz Complete!</h1>
          <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-4`}>
            {result.score}%
          </div>
          <p className="text-xl text-gray-700 mb-2">
            You got <span className="font-bold">{result.correctAnswers}</span> out of{' '}
            <span className="font-bold">{result.totalQuestions}</span> questions correct
          </p>

          {/* Performance Message */}
          <p className="text-gray-600 mt-4">
            {result.score >= 80
              ? '🎉 Excellent! You have a strong grasp of these vocabulary words.'
              : result.score >= 60
              ? '👍 Good job! Keep practicing to improve further.'
              : '💪 Keep studying! Review the incorrect answers and try again.'}
          </p>
        </div>

        {/* Performance by Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Meaning */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-blue-600 mb-3">Meaning Questions</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {result.byType.meaning.correct}/{result.byType.meaning.total}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (result.byType.meaning.correct /
                      result.byType.meaning.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Synonym */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-purple-600 mb-3">Synonym Questions</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {result.byType.synonym.correct}/{result.byType.synonym.total}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{
                  width: `${
                    (result.byType.synonym.correct /
                      result.byType.synonym.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Antonym */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-orange-600 mb-3">Antonym Questions</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {result.byType.antonym.correct}/{result.byType.antonym.total}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{
                  width: `${
                    (result.byType.antonym.correct /
                      result.byType.antonym.total) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h2>
          <div className="space-y-4">
            {result.answers.map((answer, index) => {
              const isCorrect = answer.isCorrect;

              return (
                <div key={answer.questionId} className="border rounded-lg overflow-hidden">
                  {/* Question Header */}
                  <button
                    onClick={() =>
                      setExpandedReview(
                        expandedReview === answer.questionId
                          ? null
                          : answer.questionId
                      )
                    }
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-start justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1 text-left">
                      <div
                        className={`mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          Question {index + 1}: {answer.question.question}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Word: <span className="font-semibold">{answer.question.word}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 shrink-0">
                      {expandedReview === answer.questionId ? '▼' : '▶'}
                    </span>
                  </button>

                  {/* Expanded Details */}
                  {expandedReview === answer.questionId && (
                    <div className="p-4 border-t bg-white">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Your Answer:
                          </p>
                          <p
                            className={`p-3 rounded ${
                              isCorrect
                                ? 'bg-green-50 text-green-900'
                                : 'bg-red-50 text-red-900'
                            }`}
                          >
                            {answer.selectedOption}
                          </p>
                        </div>

                        {!isCorrect && (
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Correct Answer:
                            </p>
                            <p className="p-3 bg-green-50 text-green-900 rounded">
                              {answer.question.correctAnswer}
                            </p>
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Explanation:
                          </p>
                          <p className="text-gray-700 text-sm">
                            {answer.question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <RotateCcw className="h-5 w-5" />
            Try Another Quiz
          </button>
          <Link href="/">
            <button className="flex items-center gap-2 px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-all">
              <Home className="h-5 w-5" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
