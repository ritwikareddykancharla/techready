from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import os
import json
import re

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "openai/gpt-4o-mini"  # cost-effective, fast — change to any OpenRouter model

SYSTEM_PROMPT = """You are TechReady — a sharp, encouraging mock interview coach for women and underrepresented engineers breaking into tech.

Your role:
- Ask ONE technical interview question at a time based on the chosen topic and difficulty
- After the candidate responds, give structured feedback:
  1. ✅ What they got RIGHT (be specific)
  2. 🔧 What to IMPROVE (concrete, actionable)
  3. 💡 IDEAL ANSWER (concise model answer they can learn from)
  4. ⭐ SCORE: X/10 with a brief reason
- Then ask if they want to continue with the next question or try the same topic again
- Be warm, direct, and confidence-building — never condescending
- For coding questions, ask them to explain their approach in plain English (no need to write actual code)
- Always remind them: "You belong in tech."

Topics you can interview on: Python, Data Structures & Algorithms, System Design, SQL, Machine Learning basics, Behavioral (STAR method), Web APIs, OOP concepts."""

def call_openrouter(messages):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://techready-interview.app",
        "X-Title": "TechReady Mock Interview"
    }
    payload = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 800
    }
    response = requests.post(OPENROUTER_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/start", methods=["POST"])
def start_interview():
    data = request.json
    topic = data.get("topic", "Python")
    difficulty = data.get("difficulty", "Medium")
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Start a {difficulty} difficulty mock interview on the topic: {topic}. Ask me the first question. Keep it focused and clear."}
    ]
    
    reply = call_openrouter(messages)
    return jsonify({"message": reply, "messages": messages + [{"role": "assistant", "content": reply}]})

@app.route("/api/respond", methods=["POST"])
def respond():
    data = request.json
    user_answer = data.get("answer", "")
    history = data.get("messages", [])
    
    history.append({"role": "user", "content": user_answer})
    reply = call_openrouter(history)
    history.append({"role": "assistant", "content": reply})
    
    return jsonify({"message": reply, "messages": history})

@app.route("/api/hint", methods=["POST"])
def hint():
    data = request.json
    history = data.get("messages", [])
    
    hint_request = history + [{"role": "user", "content": "I'm stuck. Can you give me a small hint without revealing the full answer? Just a nudge in the right direction."}]
    reply = call_openrouter(hint_request)
    
    return jsonify({"message": reply})

@app.route("/api/skip", methods=["POST"])
def skip():
    data = request.json
    history = data.get("messages", [])
    topic = data.get("topic", "the same topic")
    
    skip_msg = history + [{"role": "user", "content": f"Skip this question and give me a new {topic} question please."}]
    reply = call_openrouter(skip_msg)
    history.append({"role": "assistant", "content": reply})
    
    return jsonify({"message": reply, "messages": history})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
