"use client";

import { useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const getPlainText = (parts: UIMessage["parts"]) =>
  parts
    .map((part) =>
      part.type === "text" || part.type === "reasoning" ? part.text : ""
    )
    .filter(Boolean)
    .join("\n\n");

export default function ChatPage() {
  const { messages, sendMessage, status, setMessages, error } = useChat({ 
    transport
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleClear = () => {
    setMessages([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setInput("");
    await sendMessage({ text: value });
  };

  return (
    <main className="mx-auto flex h-dvh max-w-5xl flex-col gap-6 bg-gradient-to-b from-slate-50 to-white px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'linear-gradient(to right, rgba(36, 174, 124, 0.1), rgba(36, 174, 124, 0.1))' }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#24AE7C' }}>
            مساعدك الشخصي 
          </span>
        </div>
        <h1 className="  mb-10 text-slate-700 text-4xl font-bold  sm:text-5xl">
         اي سؤال ؟
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-600">
          طرح أسئلة عن الرعاية الصحية, الاسترجاع, التغذية, أو الصح العقلي
         
        </p>
      </header>

      <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        {messages.length > 0 && (
          <div className="flex items-center justify-between border-b border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#24AE7C' }}></div>
              <span className="text-xs font-medium text-slate-600">Active</span>
            </div>
            <button
              onClick={handleClear}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 active:scale-95"
            >
              Clear chat
            </button>
          </div>
        )}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 sm:px-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center" style={{ background: 'linear-gradient(to bottom right, rgba(241, 245, 249, 0.5), rgba(36, 174, 124, 0.1))' }}>
              <div className="mb-4 text-5xl">👋</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                ابدأ المحادثة
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                حاول طرح سؤال مثل: "إنشاء خطة إسترجاع بعد تمرين شديد" أو
                "ما هي وجبة خفيفة للتغذية للعضلات؟"
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <article
              key={message.id}
              className={`group flex gap-3 transition-all duration-300 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm ${
                  message.role === "user"
                    ? "text-white"
                    : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700"
                }`}
                style={message.role === "user" ? { background: 'linear-gradient(to bottom right, #24AE7C, #1e8f6b)' } : {}}
              >
                {message.role === "user" ? "You" : "AI"}
              </div>
              <div
                className={`flex max-w-[85%] flex-col gap-1.5 rounded-2xl px-5 py-3.5 shadow-sm transition-all ${
                  message.role === "user"
                    ? "text-white"
                    : "bg-slate-50 text-slate-900 shadow-slate-200/50"
                }`}
                style={message.role === "user" ? { background: 'linear-gradient(to bottom right, #24AE7C, #1e8f6b)', boxShadow: '0 1px 3px 0 rgba(36, 174, 124, 0.3)' } : {}}
              >
                <p className="whitespace-pre-line text-sm leading-relaxed sm:text-base">
                  {getPlainText(message.parts)}
                </p>
              </div>
            </article>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                AI
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-5 py-3.5 shadow-sm">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                </div>
                <span className="ml-2 text-sm text-slate-600">جاري التفكير...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200/80 bg-gradient-to-br from-red-50/80 to-red-100/50 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-xl">⚠️</div>
                <div className="flex-1">
                  <p className="mb-1 font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-800">
                    {error.message ||
                      "Failed to get response. Please check your API key and try again."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50 p-5 sm:p-6"
        >
          <div className="flex items-end gap-3 rounded-2xl border-2 border-slate-200/60 bg-white px-4 py-3 shadow-sm transition-all has-[:focus]:border-[#24AE7C] has-[:focus]:shadow-md has-[:focus]:shadow-[rgba(36,174,124,0.2)]">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="صف ما تريد, الأعراض, أو خطة تريد المراجعة عليها…"
              rows={2}
              className="flex-1 resize-none border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.closest("form");
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-md active:scale-95"
              style={{
                background: 'linear-gradient(to right, #24AE7C, #1e8f6b)',
                boxShadow: '0 4px 6px -1px rgba(36, 174, 124, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #1e8f6b, #1a7a5a)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(36, 174, 124, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.background = 'linear-gradient(to right, #24AE7C, #1e8f6b)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(36, 174, 124, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

