# MultiModel GPT

A powerful web application to compare responses from multiple AI models side-by-side, with **persistent conversation history** and **project-level memory** that preserves context across sessions.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)

## ✨ Features

### 📁 Project-Based Workflow
- **Create Projects**: Organize your AI comparisons into separate projects
- **Conversation Threads**: Multiple conversations within each project
- **Full History Persistence**: Every question, every model response, and every verdict is saved
- **Resume Anytime**: Open a thread and see your complete conversation history
- **Context Preservation**: All models receive project context for more relevant responses

### 🔄 MultiAsk Mode
- **Parallel Querying**: Send your question to multiple LLM models simultaneously
- **Streaming Responses**: Watch responses appear in real-time as models generate them
- **Side-by-Side Comparison**: View all model responses in a responsive grid layout
- **Verdict Synthesis**: An optional verdict model analyzes all responses to identify consensus and differences
- **Follow-up Conversations**: Continue asking questions with full conversation context
- **Complete History**: See all past turns with questions, responses from every model, and verdicts

### 🔍 Critique Chain Mode
A structured workflow for thoroughly vetted answers:

| Step | Description |
|------|-------------|
| 1. **Primary Model** | Answers your question first |
| 2. **Critique Models** | Multiple models critically evaluate the primary response for accuracy, completeness, and reasoning |
| 3. **Reviewer Model** | Synthesizes all critiques, identifies consensus/disagreements, and provides a final verdict |

- **Visual Progress**: See which step is currently active
- **Follow-up Support**: Continue with follow-up questions that include full context
- **History Persistence**: All steps are saved and visible when you return to the thread

### 🧠 Smart Memory System
- **Automatic Summarization**: Every 10 messages, an AI analyzes conversations and extracts:
  - **Summary**: Overview of project status and goals
  - **Key Facts**: Important information established in conversations
  - **Decisions**: Choices made with reasoning and dates
  - **Open Questions**: Unresolved items to address
- **Context Injection**: Project memory is included in prompts to all models
- **Manual Refresh**: Trigger memory updates on demand

### 🎨 Modern UI/UX
- Beautiful dark theme with gradient accents
- Responsive sidebar with project and thread navigation
- Markdown rendering with syntax highlighting
- Real-time streaming animations
- Auto-expanding text input
- Loading states and smooth transitions

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsk003/multimodelGPT.git
   cd multimodelGPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

5. **Configure your API key**
   - Click the **Settings** button (top right)
   - Paste your OpenRouter API key
   - Add model IDs for the modes you want to use

6. **Create a Project & Start Comparing**
   - Click the **+** button in the sidebar to create a project
   - Click **MultiAsk** or **Critique Chain** to start a conversation
   - Ask your question and watch the magic happen!

## ⚙️ Configuration

### Setting Up Models

Click **Settings** in the top right corner to configure:

#### API Key
| Setting | Description |
|---------|-------------|
| **OpenRouter API Key** | Your API key from [openrouter.ai/keys](https://openrouter.ai/keys) |

#### MultiAsk Tab
| Setting | Description |
|---------|-------------|
| **Models to Query** | Add model IDs to compare (e.g., `openai/gpt-4o`). Add multiple models to see responses side-by-side. |
| **Verdict Model** | (Optional) A model that synthesizes all responses and identifies consensus/differences |

#### Critique Chain Tab
| Setting | Description |
|---------|-------------|
| **Primary Model** | The model that answers your question first |
| **Critique Models** | Models that critically evaluate the primary response (add 2-3 for diverse perspectives) |
| **Reviewer Model** | Model that synthesizes all critiques into a final assessment |

### Finding Model IDs

Browse available models at [openrouter.ai/models](https://openrouter.ai/models). Click any model to see its ID.

#### Popular Model IDs

| Model | ID | Best For |
|-------|-----|----------|
| GPT-4o | `openai/gpt-4o` | Complex reasoning, analysis |
| GPT-4o Mini | `openai/gpt-4o-mini` | Fast, cost-effective responses |
| Claude 3.5 Sonnet | `anthropic/claude-3.5-sonnet` | Writing, coding, analysis |
| Claude 3.5 Haiku | `anthropic/claude-3.5-haiku` | Fast, concise responses |
| Gemini 2.0 Flash | `google/gemini-2.0-flash-exp:free` | Free tier, general use |
| Gemini 1.5 Pro | `google/gemini-pro-1.5` | Long context, detailed responses |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct` | Open source, capable |
| DeepSeek V3 | `deepseek/deepseek-chat` | Coding, reasoning |
| Qwen 2.5 72B | `qwen/qwen-2.5-72b-instruct` | Multilingual, reasoning |

## 📖 How to Use

### Creating a Project

1. Click the **+** button in the sidebar
2. Enter a project name (e.g., "Research on AI", "Code Review", "Writing Help")
3. Click **Create**

### Starting a Conversation

1. Select your project in the sidebar
2. Click **MultiAsk** or **Critique Chain** button
3. Enter a title for your conversation
4. Start asking questions!

### MultiAsk Workflow

1. **Type your question** in the input box
2. **Press Enter** or click the send button
3. **Watch responses stream** in from all configured models
4. **Review the verdict** (if configured) for synthesis
5. **Ask follow-ups** to continue the conversation

### Critique Chain Workflow

1. **Type your question** in the input box
2. **Watch the primary model** answer first
3. **See critiques** from each critique model
4. **Read the final review** synthesizing all perspectives
5. **Ask follow-ups** for deeper exploration

### Viewing History

- **Select any thread** in the sidebar to see its complete history
- **All turns are preserved**: questions, model responses, verdicts/reviews
- **Continue where you left off** by asking a new question

### Managing Projects

- **Switch projects**: Click a project name in the sidebar
- **View threads**: Threads appear under the selected project
- **Delete threads**: Hover over a thread and click the trash icon
- **Delete projects**: Hover over a project and click the trash icon (deletes all threads too)

## 🧠 Project Memory System

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Conversations                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Message │  │ Message │  │ Message │  │ Message │  ...    │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
│       └────────────┴────────────┴────────────┘              │
│                          │                                   │
│                          ▼                                   │
│              ┌───────────────────────┐                      │
│              │   Every 10 Messages   │                      │
│              │   AI Summarization    │                      │
│              └───────────┬───────────┘                      │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Project Memory                       │  │
│  │  • Summary: Project overview and status               │  │
│  │  • Facts: Key information established                 │  │
│  │  • Decisions: Choices made with reasoning             │  │
│  │  • Open Questions: Items to address                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│              ┌───────────────────────┐                      │
│              │   Injected into all   │                      │
│              │   future prompts      │                      │
│              └───────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### Memory Display

- **View memory** in the sidebar under the current project
- **Refresh memory** by clicking the refresh button
- **Memory updates** automatically every 10 messages

## 📁 Project Structure

```
multimodelGPT/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts              # OpenRouter API proxy
│   │   │   ├── projects/                  # Project CRUD endpoints
│   │   │   │   ├── route.ts               # List/Create projects
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts           # Get/Update/Delete project
│   │   │   │       ├── threads/route.ts   # List/Create threads
│   │   │   │       └── memory/route.ts    # Get/Refresh memory
│   │   │   └── threads/
│   │   │       └── [id]/
│   │   │           ├── route.ts           # Get/Update/Delete thread
│   │   │           └── messages/route.ts  # Get/Save messages
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                       # Main app with routing
│   ├── components/
│   │   ├── CritiqueChain.tsx              # Critique Chain workflow
│   │   ├── FollowUpInput.tsx              # Follow-up input component
│   │   ├── NewThreadModal.tsx             # Create thread modal
│   │   ├── ProjectSidebar.tsx             # Sidebar navigation
│   │   ├── ResponsePanel.tsx              # Model response display
│   │   ├── SettingsModal.tsx              # Settings configuration
│   │   └── VerdictPanel.tsx               # Verdict/synthesis display
│   ├── context/
│   │   ├── ModelsContext.tsx              # Model settings state
│   │   └── ProjectContext.tsx             # Project/thread state
│   ├── db/
│   │   ├── index.ts                       # SQLite connection & migrations
│   │   └── schema.ts                      # Drizzle ORM schema
│   ├── lib/
│   │   ├── context-manager.ts             # Memory management
│   │   └── conversation-utils.ts          # History reconstruction
│   └── types/
│       └── index.ts                       # TypeScript types
├── data/                                  # SQLite database (auto-created)
│   └── multimodel.db
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🗄️ Database Schema

```sql
-- Projects: Top-level organization
projects (id, name, created_at, updated_at)

-- Project Memory: AI-generated context
project_memory (id, project_id, summary, facts, decisions, open_questions, updated_at)

-- Threads: Conversations within projects
threads (id, project_id, title, mode, created_at, updated_at)

-- Messages: Individual messages with turn grouping
messages (id, thread_id, project_id, role, content, model_used, turn_number, metadata, created_at)
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [SQLite](https://www.sqlite.org/) | Local database storage |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | SQLite driver |
| [Drizzle ORM](https://orm.drizzle.team/) | Type-safe database queries |
| [OpenRouter](https://openrouter.ai/) | Unified LLM API access |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | GitHub Flavored Markdown |

## 📝 Usage Tips

### For Best Results

| Tip | Description |
|-----|-------------|
| **Diverse Models** | Use models from different providers for varied perspectives |
| **Capable Verdict** | Use a strong model (GPT-4o, Claude 3.5 Sonnet) as verdict/reviewer |
| **Project Per Topic** | Create separate projects for different research topics |
| **Clear Questions** | Be specific in your questions for better responses |
| **Follow Up** | Use follow-up questions to drill deeper into topics |

### Recommended Model Combinations

**For MultiAsk Comparison:**
- GPT-4o + Claude 3.5 Sonnet + Gemini 1.5 Pro
- GPT-4o-mini + Claude 3.5 Haiku + Llama 3.3 70B (cost-effective)

**For Critique Chain:**
- Primary: GPT-4o or Claude 3.5 Sonnet
- Critics: 2-3 models from different providers
- Reviewer: GPT-4o or Claude 3.5 Sonnet

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **"API key invalid"** | Ensure key starts with `sk-or-` and has credits |
| **Models not responding** | Check model ID is correct at openrouter.ai/models |
| **Database errors** | Delete `data/multimodel.db` to reset |
| **Slow responses** | Some models are slower; try faster variants |
| **Memory not updating** | Click "Refresh Memory" in sidebar |

### Reset Everything

```bash
# Delete the database to start fresh
rm -rf data/multimodel.db*

# Restart the server
npm run dev
```

## 🔮 Future Ideas

- [ ] Export conversations to Markdown/PDF
- [ ] Custom system prompts per project
- [ ] Model response rating/feedback
- [ ] Cost tracking per conversation
- [ ] Sharing threads with others
- [ ] Custom themes

## 📄 License

MIT License - feel free to use this project for any purpose.

---

<p align="center">
  <strong>Made with ❤️ for the AI community</strong>
  <br>
  <a href="https://github.com/dsk003/multimodelGPT">GitHub</a> •
  <a href="https://openrouter.ai/">OpenRouter</a>
</p>
