"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Check, RotateCcw } from "lucide-react"
import { PaymentGate } from "@/components/PaymentGate"

interface Question {
  id: number
  subject: string
  question: string
  options: string[]
  correct: number
}

const questions: Question[] = [
  {
    id: 1,
    subject: "MATH",
    question: "What is 144 ÷ 12?",
    options: ["10", "12", "14", "16"],
    correct: 1,
  },
  {
    id: 2,
    subject: "SCIENCE",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Earth"],
    correct: 1,
  },
  {
    id: 3,
    subject: "ENGLISH",
    question: "Which word is a proper noun?",
    options: ["dog", "city", "California", "happy"],
    correct: 2,
  },
  {
    id: 4,
    subject: "HISTORY",
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    correct: 1,
  },
  {
    id: 5,
    subject: "GEOGRAPHY",
    question: "Which continent is Egypt located on?",
    options: ["Asia", "Europe", "Africa", "South America"],
    correct: 2,
  },
  {
    id: 6,
    subject: "MATH",
    question: "What is 7 × 8?",
    options: ["54", "56", "58", "64"],
    correct: 1,
  },
  {
    id: 7,
    subject: "SCIENCE",
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    correct: 1,
  },
  {
    id: 8,
    subject: "ENGLISH",
    question: "What is the past tense of 'run'?",
    options: ["runned", "ran", "running", "runs"],
    correct: 1,
  },
  {
    id: 9,
    subject: "GEOGRAPHY",
    question: "What is the capital of Texas?",
    options: ["Houston", "Dallas", "Austin", "San Antonio"],
    correct: 2,
  },
  {
    id: 10,
    subject: "MATH",
    question: "What is 3/4 as a decimal?",
    options: ["0.25", "0.5", "0.75", "1.25"],
    correct: 2,
  },
]

type GameState = "start" | "playing" | "feedback" | "results"

export default function Component() {
  const [hasAccess, setHasAccess] = useState(false)
  const [gameState, setGameState] = useState<GameState>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const startGame = () => {
    setGameState("playing")
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correct
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    setShowFeedback(true)
    setGameState("feedback")

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowFeedback(false)
        setGameState("playing")
      } else {
        setGameState("results")
      }
    }, 1000)
  }

  const resetGame = () => {
    setGameState("start")
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setShowFeedback(false)
  }

  const renderQuizContent = () => {
    if (gameState === "start") {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black leading-none mb-4 tracking-tight">ARE YOU</h1>
              <h1 className="text-6xl md:text-8xl font-black leading-none mb-4 tracking-tight text-yellow-400">
                SMARTER
              </h1>
              <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tight">THAN A</h1>
              <div className="bg-yellow-400 text-black p-6 transform -rotate-2 inline-block">
                <h1 className="text-4xl md:text-6xl font-black">5TH GRADER?</h1>
              </div>
            </div>

            <div className="mt-16">
              <Button
                onClick={startGame}
                className="bg-white text-black hover:bg-yellow-400 hover:text-black text-2xl font-black px-12 py-6 h-auto border-4 border-black transform hover:scale-105 transition-transform"
              >
                START QUIZ
              </Button>
            </div>

            <div className="mt-8 text-xl font-bold">10 QUESTIONS • 5TH GRADE LEVEL</div>
          </div>
        </div>
      )
    }

    if (gameState === "playing" || gameState === "feedback") {
      const question = questions[currentQuestion]
      return (
        <div className="min-h-screen bg-white text-black p-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-black">QUESTION {currentQuestion + 1}/10</div>
                <div className="text-2xl font-black">SCORE: {score}</div>
              </div>
              <div className="h-4 bg-black">
                <div
                  className="h-full bg-yellow-400 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-black text-white px-6 py-2 inline-block text-xl font-black transform -rotate-1">
                {question.subject}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">{question.question}</h2>
            </div>

            <div className="grid gap-4">
              {question.options.map((option, index) => {
                let buttonClass =
                  "w-full text-left p-6 text-2xl font-black border-4 border-black transition-all duration-200 text-black "

                if (showFeedback && selectedAnswer === index) {
                  if (isCorrect) {
                    buttonClass += "bg-green-400 text-black"
                  } else {
                    buttonClass += "bg-red-500 text-white"
                  }
                } else if (showFeedback && index === question.correct) {
                  buttonClass += "bg-green-400 text-black"
                } else {
                  buttonClass += "bg-white hover:bg-yellow-400 hover:text-black"
                }

                return (
                  <Button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {showFeedback && selectedAnswer === index && (
                        <div className="text-3xl">
                          {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                        </div>
                      )}
                      {showFeedback && index === question.correct && selectedAnswer !== index && (
                        <Check className="w-8 h-8" />
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>

            {showFeedback && (
              <div className="mt-8 text-center">
                <div className={`text-4xl font-black ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect ? "CORRECT!" : "WRONG!"}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (gameState === "results") {
      const percentage = Math.round((score / questions.length) * 100)
      let gradeMessage = ""

      if (percentage >= 90) gradeMessage = "GENIUS LEVEL!"
      else if (percentage >= 80) gradeMessage = "EXCELLENT!"
      else if (percentage >= 70) gradeMessage = "GOOD JOB!"
      else if (percentage >= 60) gradeMessage = "NOT BAD!"
      else gradeMessage = "STUDY MORE!"

      return (
        <div className="min-h-screen bg-red-500 text-white flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-8">RESULTS</h1>

              <div className="bg-white text-black p-8 transform rotate-1 inline-block mb-8">
                <div className="text-8xl md:text-9xl font-black">
                  {score}/{questions.length}
                </div>
              </div>

              <div className="bg-black text-white p-6 transform -rotate-1 inline-block mb-8">
                <div className="text-3xl md:text-4xl font-black">{percentage}% CORRECT</div>
              </div>

              <div className="text-4xl md:text-5xl font-black mb-12">{gradeMessage}</div>
            </div>

            <Button
              onClick={resetGame}
              className="bg-white text-black hover:bg-yellow-400 hover:text-black text-2xl font-black px-12 py-6 h-auto border-4 border-black transform hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-6 h-6 mr-3" />
              TRY AGAIN
            </Button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <PaymentGate onPaymentSuccess={() => setHasAccess(true)}>
      {hasAccess ? renderQuizContent() : null}
    </PaymentGate>
  )
}
