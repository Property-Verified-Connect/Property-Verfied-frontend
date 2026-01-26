"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Bot,
  Send,
  User,
  Home,
  MessageSquare,
  PieChart,
  Building2,
  MapPin,
  IndianRupee,
  TrendingUp,
  Users,
  Star,
  Circle,
  Lightbulb,
} from "lucide-react";
import inter from "@/lib/font/Inter";
import { motion } from "framer-motion";
import Link from "next/link";
import conversationFlows from "@/function/conversationFlow";
import PropertyResultComponent from "@/components/layout/AI-Layout/PropertyResultComponent";
import BudgetResultComponent from "@/components/layout/AI-Layout/BudgetResultComponent";
import CategoryResultComponent from "@/components/layout/AI-Layout/CategoryResultComponent";
import RentResultComponent from "@/components/layout/AI-Layout/RentResultComponent";
import axios from "axios";
import { getCookieValue } from "@/function/cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

type Sender = "bot" | "user" | "component";

type Message = {
  sender: Sender;
  text?: string;
  component?: React.ReactNode;
};

type AssistantMode = "budget" | "category" | "rent" | "discuss" | null;

// Session storage key
const SESSION_STORAGE_KEY = "ai_assistant_session";
const SESSION_EXPIRY_MS = 60000; // 1 minute

type SessionData = {
  currentMode: AssistantMode;
  questionIndex: number;
  userAnswers: string[];
  currentOptions: string[];
  allowTextInput: boolean;
  showOptions: boolean;
  displayback: boolean;
  timestamp: number;
  predictions?: any;
  BudgetProperties?: any;
  CategoryProperties?: any;
};

const assistantOptions = [
  { id: "budget", label: "Budget Analysis", icon: PieChart },
  { id: "category", label: "People's Category Choice", icon: User },
  { id: "rent", label: "Rent Solutions (Smart Matching)", icon: Building2 },
  { id: "discuss", label: "AI Discuss", icon: MessageSquare },
];

const triggerHapticFeedback = (pattern: number | number[] = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};


function useTypingEffect(text: string, speed = 20) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

const DiscussResultComponent = ({
  answers,
  predictions,
}: {
  answers: string[];
  predictions: any;
}) => {
  const typedText = useTypingEffect(predictions?.SHORT_ANSWER, 15);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-100 p-2 rounded-full">
          <MessageSquare className="text-orange-600" size={24} />
        </div>
        <h3 className="font-bold text-lg">AI Discussion</h3>
      </div>
      <div>
        {predictions?.SHORT_ANSWER}
        <br />
        <br />
        <hr />
        <br />
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Lightbulb className="text-amber-600" size={20} />
          </div>
          <h2 className="font-bold text-gray-800 text-base">Key Points</h2>
        </div>
        {predictions?.KEY_POINTS.map((val) => (
          <div key={val} className="flex items-start justify-start gap-2">
            <Circle size={8} fill="black" className="mt-2" /> {val} <br />
          </div>
        ))}
        <br />
        <hr />
        <br />
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <MapPin className="text-green-600" size={20} />
          </div>
          <h2 className="font-bold text-gray-800 text-base">
            Recommended Properties
          </h2>
        </div>
        {predictions?.RECOMMENDED_PROPERTIES.map((val) => (
          <div key={val} className="flex items-start justify-start gap-2">
            <Circle size={8} fill="black" className="mt-2" /> {val} <br />
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
        <p className="text-xs text-gray-700">
          💡 Ask me anything about properties, investments, or area
          recommendations!
        </p>
      </div>
    </div>
  );
};

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentMode, setCurrentMode] = useState<AssistantMode>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [displayback, setdisplayback] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [allowTextInput, setAllowTextInput] = useState<boolean>(false);
  const [storedPredictions, setStoredPredictions] = useState<any>(null);
  const [storedBudgetProperties, setStoredBudgetProperties] = useState<any>(null);
  const [storedCategoryProperties, setStoredCategoryProperties] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Save session to sessionStorage
  const saveSession = (data: Partial<SessionData>) => {
    try {
      const sessionData: SessionData = {
        currentMode,
        questionIndex,
        userAnswers,
        currentOptions,
        allowTextInput,
        showOptions,
        displayback,
        predictions: storedPredictions,
        BudgetProperties: storedBudgetProperties,
        CategoryProperties: storedCategoryProperties,
        timestamp: Date.now(),
        ...data,
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  // Load session from sessionStorage
  const loadSession = (): SessionData | null => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!stored) return null;

      const sessionData: SessionData = JSON.parse(stored);
      const now = Date.now();

      // Check if session has expired (1 minute)
      if (now - sessionData.timestamp > SESSION_EXPIRY_MS) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
      }

      return sessionData;
    } catch (error) {
      console.error("Error loading session:", error);
      return null;
    }
  };

  // Clear session
  const clearSession = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  };

  // Load session on mount
  useEffect(() => {
    const session = loadSession();
    if (session && session.currentMode) {
      setCurrentMode(session.currentMode);
      setQuestionIndex(session.questionIndex);
      setUserAnswers(session.userAnswers);
      setCurrentOptions(session.currentOptions);
      setAllowTextInput(session.allowTextInput);
      setShowOptions(session.showOptions);
      setdisplayback(session.displayback);
      setStoredPredictions(session.predictions);
      setStoredBudgetProperties(session.BudgetProperties);
      setStoredCategoryProperties(session.CategoryProperties);

      // Reconstruct messages
      reconstructMessages(session);
    }
  }, []);

  // Reconstruct messages from session data
  const reconstructMessages = (session: SessionData) => {
    const flow = conversationFlows[session.currentMode as keyof typeof conversationFlows];
    const reconstructedMessages: Message[] = [];

    // Add questions and answers
    for (let i = 0; i <= session.questionIndex && i < flow.length; i++) {
      reconstructedMessages.push({
        sender: "bot",
        text: flow[i].question,
      });

      if (session.userAnswers[i]) {
        reconstructedMessages.push({
          sender: "user",
          text: session.userAnswers[i],
        });
      }
    }

    // If we have predictions, add the result component
    if (session.predictions) {
      reconstructedMessages.push({
        sender: "bot",
        text: "Perfect! Let me analyze your responses...",
      });

      const resultComponent = getResultComponent(
        session.currentMode as string,
        session.userAnswers,
        session.predictions,
        session.BudgetProperties,
        session.CategoryProperties
      );

      reconstructedMessages.push({
        sender: "component",
        component: resultComponent,
      });
    }

    setMessages(reconstructedMessages);
  };

  // Save session whenever relevant state changes
  useEffect(() => {
    if (currentMode) {
      saveSession({
        currentMode,
        questionIndex,
        userAnswers,
        currentOptions,
        allowTextInput,
        showOptions,
        displayback,
        predictions: storedPredictions,
        BudgetProperties: storedBudgetProperties,
        CategoryProperties: storedCategoryProperties,
      });
    }
  }, [
    currentMode,
    questionIndex,
    userAnswers,
    currentOptions,
    allowTextInput,
    showOptions,
    displayback,
    storedPredictions,
    storedBudgetProperties,
    storedCategoryProperties,
  ]);

  const scrollToBottom = () => {
    const lastMsg = messages[messages.length - 1];

    if (lastMsg?.sender === "component" && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  const handleModeSelection = (mode: AssistantMode) => {
    triggerHapticFeedback(50);
    setCurrentMode(mode);
    setdisplayback(true);
    setQuestionIndex(0);
    setUserAnswers([]);
    setStoredPredictions(null);
    setStoredBudgetProperties(null);
    setStoredCategoryProperties(null);

    const flow = conversationFlows[mode as keyof typeof conversationFlows];
    const firstQuestion = flow[0];

    setMessages([{ sender: "bot", text: firstQuestion.question }]);
    setCurrentOptions(firstQuestion.options);
    setAllowTextInput(firstQuestion.allowText);
    setShowOptions(true);
  };

  const getResultComponent = (
    mode: string,
    answers: string[],
    predictions: any,
    BudgetProperties: any,
    CategoryProperties: any
  ) => {
    switch (mode) {
      case "properties":
        return <PropertyResultComponent answers={answers} />;
      case "budget":
        return (
          <BudgetResultComponent
            answers={answers}
            predictions={predictions}
            BudgetProperties={BudgetProperties}
          />
        );
      case "category":
        return (
          <CategoryResultComponent
            answers={answers}
            predictions={predictions}
            CategoryProperties={CategoryProperties}
          />
        );
      case "rent":
        return (
          <RentResultComponent answers={answers} predictions={predictions} />
        );
      case "discuss":
        return (
          <DiscussResultComponent answers={answers} predictions={predictions} />
        );
      default:
        return null;
    }
  };

  const callAPI = async (mode: string, answers: string[]) => {
    setIsProcessing(true);

    console.log(answers);
    console.log(mode);
    try {
      const questions = conversationFlows[mode].map((item) => item.question);

      const response = await axios.post(`/api/user/propertyAI`, {
        mode,
        answers,
        questions,
      });

      console.log(response.data);
      const predictions = response.data.cleanResponse || {};
      const BudgetProperties = response.data.BudgetProperties || {};
      const CategoryProperties = response.data.CategoryProperties || {};

      // Store predictions for session
      setStoredPredictions(predictions);
      setStoredBudgetProperties(BudgetProperties);
      setStoredCategoryProperties(CategoryProperties);

      console.log(predictions);
      const resultComponent = getResultComponent(
        mode,
        answers,
        predictions,
        BudgetProperties,
        CategoryProperties
      );
      setMessages((prev) => [
        ...prev,
        { sender: "component", component: resultComponent },
      ]);
      if (mode === "discuss") {
        setCurrentOptions(predictions?.SUGGESTIONS || []);
        setAllowTextInput(true);
        setShowOptions(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Gemini Too many request try again later");
      router.push("/dashboard/user");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    triggerHapticFeedback([30, 20]);
    handleAnswer(option);
    setdisplayback(true);
  };

  const handleTextSubmit = () => {
    if (input.trim() === "") return;
    handleAnswer(input);
    setInput("");
    setdisplayback(true);
  };

  const handleAnswer = (answer: string) => {
    if (!currentMode) return;

    setMessages((prev) => [...prev, { sender: "user", text: answer }]);

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    const currentFlow =
      conversationFlows[currentMode as keyof typeof conversationFlows];
    const nextIndex = questionIndex + 1;

    setShowOptions(false);
    setdisplayback(true);

    if (nextIndex < currentFlow.length) {
      setTimeout(() => {
        const nextQuestion = currentFlow[nextIndex];
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: nextQuestion.question },
        ]);
        setCurrentOptions(nextQuestion.options);
        setAllowTextInput(nextQuestion.allowText);
        setShowOptions(true);
        setQuestionIndex(nextIndex);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Perfect! Let me analyze your responses..." },
        ]);
        callAPI(currentMode, newAnswers);
      }, 500);
    }
  };

  const handleReset = () => {
      triggerHapticFeedback([50, 30, 50]);
    setMessages([]);
    setCurrentMode(null);
    setQuestionIndex(0);
    setUserAnswers([]);
    setInput("");
    setShowOptions(false);
    setdisplayback(false);
    setStoredPredictions(null);
    setStoredBudgetProperties(null);
    setStoredCategoryProperties(null);
    clearSession(); // Clear session storage when resetting
  };

  return (
    <div
      className={`${inter.className} h-screen w-full flex items-center justify-center bg-gray-100`}
    >
      <div className="flex flex-col bg-prv text-zinc-700 w-full md:w-[80%] mx-auto h-full sm:h-[600px] md:rounded-3xl overflow-hidden shadow-lg border border-[#123a57]">
        {/* Header */}
        <div className="flex items-center gap-2 bg-white px-4 w-full py-1">
          <div className="p-2">
            {displayback ? (
              <button
                onClick={handleReset}
                className="p-2 bg-prv border rounded-full hover:bg-[#b5d4f0] transition-colors"
              >
                <ArrowLeft color="black" size={20} />
              </button>
            ) : (
              <Link href="/dashboard/user">
                <button className="p-2 bg-prv border rounded-full hover:bg-[#b5d4f0] transition-colors">
                  <ArrowLeft color="black" size={20} />
                </button>
              </Link>
            )}
          </div>
          <div className="h-20 w-30">
            <img src="/image/assitant.png" alt="AI Assistant" />
          </div>
          <div className="flex-1"></div>
        </div>

        {/* Chat messages */}
        <p className="font-semibold text-xl text-center mt-3 mb-3">
          {currentMode
            ? assistantOptions.find((opt) => opt.id === currentMode)?.label
            : ""}
        </p>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg: Message, i: number) => (
            <div
              key={i}
              ref={i === messages.length - 1 ? lastMessageRef : null}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : msg.sender === "component"
                  ? "justify-start"
                  : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                  <Bot color="black" size={20} />
                </div>
              )}

              {msg.sender === "component" ? (
                <div className="w-full flex justify-start">
                  <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                    <Bot color="black" size={20} />
                  </div>
                  <div className="ml-2">{msg.component}</div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] whitespace-pre-line ${
                    msg.sender === "bot"
                      ? "bg-[#2588e3] text-white ml-2 border-gray-100 border-b-7 border-l-5"
                      : "bg-white text-black mr-2 border-sky-300 border-b-5 border-l-5"
                  }`}
                >
                  {msg.text}
                </motion.div>
              )}

              {msg.sender === "user" && (
                <div className="p-2 bg-white rounded-2xl flex-shrink-0">
                  <User color="black" size={20} />
                </div>
              )}
            </div>
          ))}

          {/* Options Display */}
          {showOptions && currentOptions.length > 0 && (
            <>
              <div className="flex justify-start animate-fadeIn">
                <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                  <Bot color="black" size={20} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="ml-2 flex flex-wrap gap-2 max-w-[75%]"
                >
                  {currentOptions.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="px-4 border-sky-400 border-b-5 border-l-5 py-2 bg-white text-[#007acc] rounded-2xl text-sm font-medium hover:bg-[#007acc] hover:text-white transition-all shadow-sm hover:shadow-md animate-slideUp"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </>
          )}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="p-2 bg-white rounded-2xl">
                <Bot color="black" size={20} />
              </div>
              <div className="px-4 py-2 rounded-2xl text-sm bg-[#003b63] text-white ml-2">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-20" />
        </div>

        {/* Assistant Options Grid */}
        {messages.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="font-bold text-3xl md:text-4xl mb-8 text-center">
              {"What can I help with?".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <div className="md:w-[26rem] w-full gap-2 flex flex-wrap items-center justify-center">
              {assistantOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={option.id}
                    onClick={() =>
                      handleModeSelection(option.id as AssistantMode)
                    }
                    className="p-3 rounded-full font-semibold gap-1 flex items-center text-[11px] shadow-2xl bg-white md:bg-none md:text-sm justify-center w-fit border-2 md:border-dashed border-gray-400 md:border-zinc-700 hover:bg-white hover:border-solid hover:shadow-md transition-all cursor-pointer"
                  >
                    <Icon size={20} /> {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-3 bg-white flex items-center gap-2 border-t border-[#0c3d5a]">
          <input
            type="text"
            placeholder={
              !currentMode
                ? "Select an option above to start"
                : allowTextInput && showOptions
                ? "Type your answer or select an option..."
                : showOptions
                ? "Select an option above..."
                : "Waiting for AI response..."
            }
            className="flex-1 bg-transparent text-zinc-700 border rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1e90ff]"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleTextSubmit()
            }
            disabled={
              !currentMode || !allowTextInput || !showOptions || isProcessing
            }
          />
          <button
            onClick={handleTextSubmit}
            disabled={
              !currentMode ||
              !allowTextInput ||
              !showOptions ||
              isProcessing ||
              input.trim() === ""
            }
            className="bg-[#007acc] hover:bg-[#0090ff] transition-all p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}