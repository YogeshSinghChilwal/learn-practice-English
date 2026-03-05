'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuizGenerator, QuizWord } from '@/hooks/useQuizGenerator';
import { useRootWordTracking } from '@/hooks/useRootWordTracking';
import { useVocabularyData } from '@/hooks/useVocabularyData';
import { QuizModeSelector } from '@/components/quiz/QuizModeSelector';
import { QuizInterface } from '@/components/quiz/QuizInterface';
import { QuizResults } from '@/components/quiz/QuizResults';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

// Inner component that uses useSearchParams — must be inside Suspense
function QuizPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as 'all' | 'visited' | null;

  const showModeSelector = !mode;

  const { getStatus, loaded: trackingLoaded } = useRootWordTracking();
  const { data: vocabularyData, loading } = useVocabularyData();

  const {
    questions,
    currentIndex,
    currentQuestion,
    userAnswers,
    quizStarted,
    quizCompleted,
    startQuiz,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    finishQuiz,
    getResults,
    resetQuiz,
  } = useQuizGenerator();

  const visitedCount = useMemo(() => {
    if (!trackingLoaded || !vocabularyData?.rootWords?.length) return 0;
    return vocabularyData.rootWords.filter(
      (root) => getStatus(root.id) === 'visited'
    ).length;
  }, [trackingLoaded, vocabularyData, getStatus]);

  useEffect(() => {
    if (mode && vocabularyData && vocabularyData.rootWords.length > 0 && !quizStarted) {
      const quizWords: QuizWord[] = [];

      vocabularyData.rootWords.forEach((root) => {
        const rootShouldInclude =
          mode === 'all' || (mode === 'visited' && getStatus(root.id) === 'visited');

        if (rootShouldInclude) {
          root.words.forEach((word) => {
            quizWords.push({
              id: word.id,
              word: word.word,
              meaning: word.meaning,
              synonyms: word.synonyms || [],
              antonyms: word.antonyms || [],
            });
          });
        }
      });

      if (quizWords.length > 0) {
        startQuiz(quizWords, 20);
      }
    }
  }, [mode, vocabularyData, quizStarted, startQuiz, getStatus]);

  const handleAnswerQuestion = (option: string) => {
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, option);
    }
  };

  const handleRetryQuiz = () => {
    resetQuiz();
    router.push('/quiz');
  };

  const currentAnswer = currentQuestion
    ? userAnswers.find((a) => a.questionId === currentQuestion.id)
    : null;
  const isAnswered = !!currentAnswer;

  if (loading || !trackingLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {showModeSelector && (
        <QuizModeSelector
          onSelectMode={(selectedMode) => {
            router.push(`/quiz?mode=${selectedMode}`);
          }}
          onClose={() => router.push('/')}
          visitedCount={visitedCount}
        />
      )}

      {quizStarted && !quizCompleted && currentQuestion && (
        <>
          <div className="absolute top-4 left-4 z-10">
            <Link href="/">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-white px-4 py-2 rounded-lg shadow-md">
                <ChevronLeft className="h-5 w-5" />
                Back to Home
              </button>
            </Link>
          </div>
          <QuizInterface
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            selectedAnswer={currentAnswer?.selectedOption || null}
            onSelectAnswer={handleAnswerQuestion}
            onPrevious={goToPreviousQuestion}
            onNext={goToNextQuestion}
            onFinish={finishQuiz}
            canGoPrevious={currentIndex > 0}
            canGoNext={isAnswered}
            answered={isAnswered}
          />
        </>
      )}

      {quizCompleted && (
        <QuizResults result={getResults()} onRetry={handleRetryQuiz} />
      )}
    </main>
  );
}

// Outer component wraps with Suspense — required by Next.js for useSearchParams
export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <QuizPageInner />
    </Suspense>
  );
}