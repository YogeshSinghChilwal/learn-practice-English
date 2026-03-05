'use client';

import { useState, useCallback } from 'react';

export interface QuizWord {
  id: string;
  word: string;
  meaning: string;
  synonyms: Array<{ word: string; meaning: string }>;
  antonyms: Array<{ word: string; meaning: string }>;
}

export type QuestionType = 'meaning' | 'synonym' | 'antonym';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  word: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  byType: {
    meaning: { correct: number; total: number };
    synonym: { correct: number; total: number };
    antonym: { correct: number; total: number };
  };
  answers: Array<UserAnswer & { question: QuizQuestion }>;
}

export function useQuizGenerator() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateQuestions = useCallback(
    (words: QuizWord[], count: number = 20): QuizQuestion[] => {
      const generatedQuestions: QuizQuestion[] = [];
      const questionTypesCount = Math.ceil(count / 3);
      let questionId = 0;

      // Generate meaning questions
      for (let i = 0; i < questionTypesCount && generatedQuestions.length < count; i++) {
        const word = words[Math.floor(Math.random() * words.length)];
        const incorrectWords = words
          .filter((w) => w.id !== word.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [word.meaning, ...incorrectWords.map((w) => w.meaning)]
          .sort(() => Math.random() - 0.5);

        generatedQuestions.push({
          id: `q-${questionId++}`,
          type: 'meaning',
          word: word.word,
          question: `What is the meaning of "${word.word}"?`,
          correctAnswer: word.meaning,
          options,
          explanation: `${word.word} means "${word.meaning}".`,
        });
      }

      // Generate synonym questions
      for (
        let i = 0;
        i < questionTypesCount && generatedQuestions.length < count;
        i++
      ) {
        const wordsWithSynonyms = words.filter((w) => w.synonyms.length > 0);
        if (wordsWithSynonyms.length === 0) continue;

        const word = wordsWithSynonyms[
          Math.floor(Math.random() * wordsWithSynonyms.length)
        ];
        const synonym =
          word.synonyms[Math.floor(Math.random() * word.synonyms.length)];

        const incorrectSynonyms = words
          .flatMap((w) => w.synonyms)
          .filter((s) => s.word !== synonym.word)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((s) => s.word);

        const options = [synonym.word, ...incorrectSynonyms]
          .sort(() => Math.random() - 0.5);

        generatedQuestions.push({
          id: `q-${questionId++}`,
          type: 'synonym',
          word: word.word,
          question: `Which word is a synonym of "${word.word}"?`,
          correctAnswer: synonym.word,
          options,
          explanation: `"${synonym.word}" is a synonym of "${word.word}". Both mean similar things.`,
        });
      }

      // Generate antonym questions
      for (
        let i = 0;
        i < questionTypesCount && generatedQuestions.length < count;
        i++
      ) {
        const wordsWithAntonyms = words.filter((w) => w.antonyms.length > 0);
        if (wordsWithAntonyms.length === 0) continue;

        const word = wordsWithAntonyms[
          Math.floor(Math.random() * wordsWithAntonyms.length)
        ];
        const antonym =
          word.antonyms[Math.floor(Math.random() * word.antonyms.length)];

        const incorrectAntonyms = words
          .flatMap((w) => w.antonyms)
          .filter((a) => a.word !== antonym.word)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((a) => a.word);

        const options = [antonym.word, ...incorrectAntonyms]
          .sort(() => Math.random() - 0.5);

        generatedQuestions.push({
          id: `q-${questionId++}`,
          type: 'antonym',
          word: word.word,
          question: `Which word is an antonym of "${word.word}"?`,
          correctAnswer: antonym.word,
          options,
          explanation: `"${antonym.word}" is an antonym of "${word.word}". They have opposite meanings.`,
        });
      }

      // Shuffle and limit to count
      return generatedQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    },
    []
  );

  const startQuiz = useCallback((words: QuizWord[], count: number = 20) => {
    const generatedQuestions = generateQuestions(words, count);
    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setUserAnswers([]);
    setQuizStarted(true);
    setQuizCompleted(false);
  }, [generateQuestions]);

  const answerQuestion = useCallback(
    (questionId: string, selectedOption: string) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) return;

      const isCorrect = selectedOption === question.correctAnswer;
      const existingAnswerIndex = userAnswers.findIndex(
        (a) => a.questionId === questionId
      );

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId,
          selectedOption,
          isCorrect,
        };
        setUserAnswers(updatedAnswers);
      } else {
        setUserAnswers([
          ...userAnswers,
          { questionId, selectedOption, isCorrect },
        ]);
      }
    },
    [questions, userAnswers]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const finishQuiz = useCallback(() => {
    setQuizCompleted(true);
  }, []);

  const getResults = useCallback((): QuizResult => {
    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const byType = {
      meaning: { correct: 0, total: 0 },
      synonym: { correct: 0, total: 0 },
      antonym: { correct: 0, total: 0 },
    };

    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        byType[question.type].total++;
        if (answer.isCorrect) {
          byType[question.type].correct++;
        }
      }
    });

    return {
      totalQuestions: questions.length,
      correctAnswers,
      score: Math.round((correctAnswers / questions.length) * 100),
      byType,
      answers: userAnswers.map((answer) => ({
        ...answer,
        question: questions.find((q) => q.id === answer.questionId)!,
      })),
    };
  }, [questions, userAnswers]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers([]);
    setQuizStarted(false);
    setQuizCompleted(false);
  }, []);

  return {
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex],
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
  };
}
