// Seed script to populate the available_models table
// Run with: npx tsx scripts/seed-models.ts

const MODELS_DATA = [
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    description: "GPT-4.1 is a preview version of OpenAI's flagship model, offering improved capabilities for text and image understanding.",
    context_length: 1047576,
    pricing: { prompt: "0.000002", completion: "0.000008", image: "0.001838" }
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    description: "GPT-4.1 Mini is a smaller, faster version of GPT-4.1 optimized for quick responses while maintaining high quality.",
    context_length: 1047576,
    pricing: { prompt: "0.0000004", completion: "0.0000016", image: "0.001838" }
  },
  {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    description: "GPT-4.1 Nano is the smallest and most efficient variant of GPT-4.1, designed for lightweight tasks.",
    context_length: 1047576,
    pricing: { prompt: "0.0000001", completion: "0.0000004", image: "0.001838" }
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description: "GPT-4o is OpenAI's flagship multimodal model, capable of processing text and images with high efficiency.",
    context_length: 128000,
    pricing: { prompt: "0.0000025", completion: "0.00001", image: "0.003613" }
  },
  {
    id: "openai/gpt-4o-2024-11-20",
    name: "GPT-4o (2024-11-20)",
    description: "Updated version of GPT-4o with improved creative writing and precise instructions following.",
    context_length: 128000,
    pricing: { prompt: "0.0000025", completion: "0.00001", image: "0.003613" }
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "A smaller, more affordable version of GPT-4o for lightweight tasks.",
    context_length: 128000,
    pricing: { prompt: "0.00000015", completion: "0.0000006", image: "0.0001946" }
  },
  {
    id: "openai/gpt-4o-mini-2024-07-18",
    name: "GPT-4o Mini (2024-07-18)",
    description: "July 2024 release of GPT-4o Mini with enhanced capabilities.",
    context_length: 128000,
    pricing: { prompt: "0.00000015", completion: "0.0000006", image: "0.0001946" }
  },
  {
    id: "openai/o1",
    name: "o1",
    description: "OpenAI's reasoning model designed for complex problem-solving with extended thinking time.",
    context_length: 200000,
    pricing: { prompt: "0.000015", completion: "0.00006", image: "0.010839" }
  },
  {
    id: "openai/o1-preview",
    name: "o1 Preview",
    description: "Preview version of OpenAI's o1 reasoning model.",
    context_length: 128000,
    pricing: { prompt: "0.000015", completion: "0.00006" }
  },
  {
    id: "openai/o1-mini",
    name: "o1 Mini",
    description: "A smaller, faster version of o1 for coding, math, and science tasks.",
    context_length: 128000,
    pricing: { prompt: "0.0000011", completion: "0.0000044" }
  },
  {
    id: "openai/o3-mini",
    name: "o3 Mini",
    description: "OpenAI's latest reasoning model with adjustable thinking effort for STEM and coding.",
    context_length: 200000,
    pricing: { prompt: "0.0000011", completion: "0.0000044" }
  },
  {
    id: "openai/o3-mini-high",
    name: "o3 Mini (High)",
    description: "High reasoning effort variant of o3 Mini for complex problems.",
    context_length: 200000,
    pricing: { prompt: "0.0000011", completion: "0.0000044" }
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    description: "Anthropic's most intelligent model, offering the highest level of accuracy and performance on complex tasks.",
    context_length: 200000,
    pricing: { prompt: "0.000003", completion: "0.000015", image: "0.0048" }
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    description: "Anthropic's advanced reasoning model with extended thinking capabilities for complex tasks.",
    context_length: 200000,
    pricing: { prompt: "0.000003", completion: "0.000015", image: "0.0048" }
  },
  {
    id: "anthropic/claude-3.7-sonnet:thinking",
    name: "Claude 3.7 Sonnet (Thinking)",
    description: "Claude 3.7 Sonnet with explicit thinking tokens for improved reasoning transparency.",
    context_length: 200000,
    pricing: { prompt: "0.000003", completion: "0.000015", image: "0.0048" }
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's balanced model offering high intelligence with efficient performance.",
    context_length: 200000,
    pricing: { prompt: "0.000003", completion: "0.000015", image: "0.0048" }
  },
  {
    id: "anthropic/claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    description: "Anthropic's fastest model for quick, efficient responses.",
    context_length: 200000,
    pricing: { prompt: "0.0000008", completion: "0.000004", image: "0.0008" }
  },
  {
    id: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    description: "Anthropic's most powerful model for highly complex tasks.",
    context_length: 200000,
    pricing: { prompt: "0.000015", completion: "0.000075", image: "0.024" }
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    description: "Fast and lightweight model from Anthropic for quick interactions.",
    context_length: 200000,
    pricing: { prompt: "0.00000025", completion: "0.00000125", image: "0.0004" }
  },
  {
    id: "google/gemini-2.5-pro-preview",
    name: "Gemini 2.5 Pro Preview",
    description: "Google's most advanced AI model, designed for complex tasks with excellent reasoning and coding abilities.",
    context_length: 1048576,
    pricing: { prompt: "0.00000125", completion: "0.00001", image: "0.0006575" }
  },
  {
    id: "google/gemini-2.5-flash-preview",
    name: "Gemini 2.5 Flash Preview",
    description: "Google's balanced model offering adaptive thinking for quality, cost, and speed optimization.",
    context_length: 1048576,
    pricing: { prompt: "0.00000015", completion: "0.0000006", image: "0.00003875" }
  },
  {
    id: "google/gemini-2.5-flash-preview:thinking",
    name: "Gemini 2.5 Flash Preview (Thinking)",
    description: "Gemini 2.5 Flash with explicit thinking tokens for enhanced reasoning.",
    context_length: 1048576,
    pricing: { prompt: "0.00000015", completion: "0.000003", image: "0.00003875" }
  },
  {
    id: "google/gemini-2.0-flash-001",
    name: "Gemini 2.0 Flash",
    description: "Google's fast multimodal model with next-generation features and low latency.",
    context_length: 1048576,
    pricing: { prompt: "0.0000001", completion: "0.0000004", image: "0.0000258" }
  },
  {
    id: "google/gemini-2.0-flash-lite-001",
    name: "Gemini 2.0 Flash Lite",
    description: "Cost-efficient variant of Gemini 2.0 Flash for high-volume tasks.",
    context_length: 1048576,
    pricing: { prompt: "0.000000075", completion: "0.0000003", image: "0.00001935" }
  },
  {
    id: "google/gemini-2.0-flash-thinking-exp:free",
    name: "Gemini 2.0 Flash Thinking (Free)",
    description: "Experimental thinking variant of Gemini 2.0 Flash, available for free.",
    context_length: 1048576,
    pricing: { prompt: "0", completion: "0", image: "0" }
  },
  {
    id: "google/gemini-pro-1.5",
    name: "Gemini Pro 1.5",
    description: "Google's mid-size multimodal model optimized for a wide-range of tasks.",
    context_length: 2097152,
    pricing: { prompt: "0.00000125", completion: "0.000005", image: "0.0006575" }
  },
  {
    id: "google/gemini-flash-1.5",
    name: "Gemini Flash 1.5",
    description: "Fast multimodal model with long context support for high-volume tasks.",
    context_length: 4194304,
    pricing: { prompt: "0.000000075", completion: "0.0000003", image: "0.00003875" }
  },
  {
    id: "google/gemini-flash-1.5-8b",
    name: "Gemini Flash 1.5 8B",
    description: "Compact 8B parameter variant of Gemini Flash for cost-sensitive applications.",
    context_length: 1048576,
    pricing: { prompt: "0.0000000375", completion: "0.00000015", image: "0.000019375" }
  },
  {
    id: "meta-llama/llama-4-maverick",
    name: "Llama 4 Maverick",
    description: "Meta's experimental Llama 4 variant with enhanced creative and reasoning abilities.",
    context_length: 1048576,
    pricing: { prompt: "0.0000002", completion: "0.0000006", image: "0.000094" }
  },
  {
    id: "meta-llama/llama-4-scout",
    name: "Llama 4 Scout",
    description: "A 109B parameter multimodal model with a 17B active parameter MoE architecture.",
    context_length: 524288,
    pricing: { prompt: "0.00000015", completion: "0.0000004", image: "0.00007015" }
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    name: "Llama 3.3 70B Instruct",
    description: "Meta's latest 70B instruction-tuned model matching Llama 3.1 405B performance at lower cost.",
    context_length: 131072,
    pricing: { prompt: "0.00000012", completion: "0.0000003" }
  },
  {
    id: "meta-llama/llama-3.1-405b-instruct",
    name: "Llama 3.1 405B Instruct",
    description: "Meta's flagship open-source model for complex reasoning and multilingual tasks.",
    context_length: 131072,
    pricing: { prompt: "0.0000008", completion: "0.0000008" }
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B Instruct",
    description: "High-performance 70B model from Meta for diverse applications.",
    context_length: 131072,
    pricing: { prompt: "0.00000012", completion: "0.0000003" }
  },
  {
    id: "meta-llama/llama-3.1-8b-instruct",
    name: "Llama 3.1 8B Instruct",
    description: "Efficient 8B model from Meta for lightweight tasks.",
    context_length: 131072,
    pricing: { prompt: "0.000000012", completion: "0.000000018" }
  },
  {
    id: "deepseek/deepseek-chat-v3-0324",
    name: "DeepSeek Chat V3 (March 2024)",
    description: "Updated version of DeepSeek V3 with improved chat capabilities.",
    context_length: 131072,
    pricing: { prompt: "0.0000003", completion: "0.00000088" }
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek Chat",
    description: "DeepSeek's powerful conversational AI model.",
    context_length: 131072,
    pricing: { prompt: "0.00000014", completion: "0.00000028" }
  },
  {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1",
    description: "DeepSeek's reasoning model rivaling o1 performance on math, code, and reasoning.",
    context_length: 65536,
    pricing: { prompt: "0.00000055", completion: "0.00000219" }
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek R1 (Free)",
    description: "Free tier of DeepSeek R1 with rate limits.",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" }
  },
  {
    id: "deepseek/deepseek-r1-0528",
    name: "DeepSeek R1 (May 2024)",
    description: "Updated version of DeepSeek R1 with improved reasoning.",
    context_length: 65536,
    pricing: { prompt: "0.0000005", completion: "0.0000021" }
  },
  {
    id: "deepseek/deepseek-r1-0528:free",
    name: "DeepSeek R1 (May 2024, Free)",
    description: "Free tier of the May 2024 DeepSeek R1 update.",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" }
  },
  {
    id: "deepseek/deepseek-prover-v2",
    name: "DeepSeek Prover V2",
    description: "Specialized model for mathematical theorem proving and formal verification.",
    context_length: 163840,
    pricing: { prompt: "0.0000005", completion: "0.0000021" }
  },
  {
    id: "qwen/qwen3-235b-a22b",
    name: "Qwen3 235B A22B",
    description: "Alibaba's flagship model with hybrid thinking modes for complex tasks.",
    context_length: 131072,
    pricing: { prompt: "0.0000003", completion: "0.0000006" }
  },
  {
    id: "qwen/qwen3-32b",
    name: "Qwen3 32B",
    description: "Alibaba's 32B parameter model with strong reasoning capabilities.",
    context_length: 131072,
    pricing: { prompt: "0.0000001", completion: "0.0000003" }
  },
  {
    id: "qwen/qwen3-30b-a3b",
    name: "Qwen3 30B A3B",
    description: "Efficient 30B model from Alibaba with optimized architecture.",
    context_length: 131072,
    pricing: { prompt: "0.00000005", completion: "0.00000015" }
  },
  {
    id: "qwen/qwen3-14b",
    name: "Qwen3 14B",
    description: "Mid-size model from Alibaba for balanced performance.",
    context_length: 131072,
    pricing: { prompt: "0.00000005", completion: "0.00000015" }
  },
  {
    id: "qwen/qwen3-8b",
    name: "Qwen3 8B",
    description: "Compact 8B model from Alibaba for efficient deployments.",
    context_length: 131072,
    pricing: { prompt: "0.00000003", completion: "0.00000009" }
  },
  {
    id: "qwen/qwen-2.5-coder-32b-instruct",
    name: "Qwen 2.5 Coder 32B Instruct",
    description: "Specialized coding model from Alibaba matching GPT-4o performance.",
    context_length: 33792,
    pricing: { prompt: "0.00000007", completion: "0.00000016" }
  },
  {
    id: "qwen/qwen-2.5-72b-instruct",
    name: "Qwen 2.5 72B Instruct",
    description: "Alibaba's large instruction-tuned model for diverse tasks.",
    context_length: 33792,
    pricing: { prompt: "0.00000013", completion: "0.0000004" }
  },
  {
    id: "qwen/qwq-32b",
    name: "QwQ 32B",
    description: "Alibaba's reasoning-focused model rivaling DeepSeek R1 performance.",
    context_length: 131072,
    pricing: { prompt: "0.00000012", completion: "0.00000018" }
  },
  {
    id: "qwen/qwq-32b:free",
    name: "QwQ 32B (Free)",
    description: "Free tier of QwQ 32B with rate limits.",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" }
  },
  {
    id: "mistralai/mistral-large-2411",
    name: "Mistral Large (Nov 2024)",
    description: "Mistral's flagship model with 128K context and function calling.",
    context_length: 131072,
    pricing: { prompt: "0.000002", completion: "0.000006" }
  },
  {
    id: "mistralai/mistral-medium-3",
    name: "Mistral Medium 3",
    description: "Mistral's enterprise-grade model for coding and business applications.",
    context_length: 131072,
    pricing: { prompt: "0.0000004", completion: "0.000002" }
  },
  {
    id: "mistralai/mistral-small-3.1-24b-instruct",
    name: "Mistral Small 3.1 24B",
    description: "Compact yet powerful model from Mistral for efficient deployments.",
    context_length: 131072,
    pricing: { prompt: "0.0000001", completion: "0.0000003" }
  },
  {
    id: "mistralai/codestral-2501",
    name: "Codestral (Jan 2025)",
    description: "Mistral's specialized model for code generation and understanding.",
    context_length: 262144,
    pricing: { prompt: "0.0000003", completion: "0.0000009" }
  },
  {
    id: "mistralai/ministral-8b",
    name: "Ministral 8B",
    description: "Efficient 8B model from Mistral for edge deployments.",
    context_length: 131072,
    pricing: { prompt: "0.0000001", completion: "0.0000001" }
  },
  {
    id: "mistralai/ministral-3b",
    name: "Ministral 3B",
    description: "Ultra-compact model from Mistral for lightweight applications.",
    context_length: 131072,
    pricing: { prompt: "0.00000004", completion: "0.00000004" }
  },
  {
    id: "x-ai/grok-3-beta",
    name: "Grok 3 Beta",
    description: "xAI's flagship model with extended context and reasoning capabilities.",
    context_length: 131072,
    pricing: { prompt: "0.000003", completion: "0.000015" }
  },
  {
    id: "x-ai/grok-3-mini-beta",
    name: "Grok 3 Mini Beta",
    description: "Smaller variant of Grok 3 for cost-effective deployments.",
    context_length: 131072,
    pricing: { prompt: "0.0000003", completion: "0.0000005" }
  },
  {
    id: "x-ai/grok-2-1212",
    name: "Grok 2 (Dec 2024)",
    description: "xAI's advanced reasoning model with strong benchmark performance.",
    context_length: 131072,
    pricing: { prompt: "0.000002", completion: "0.00001" }
  },
  {
    id: "x-ai/grok-2-vision-1212",
    name: "Grok 2 Vision (Dec 2024)",
    description: "Multimodal variant of Grok 2 with image understanding.",
    context_length: 32768,
    pricing: { prompt: "0.000002", completion: "0.00001", image: "0.00544" }
  },
  {
    id: "x-ai/grok-beta",
    name: "Grok Beta",
    description: "Early access to xAI's conversational AI model.",
    context_length: 131072,
    pricing: { prompt: "0.000005", completion: "0.000015" }
  },
  {
    id: "cohere/command-r-plus-08-2024",
    name: "Command R+ (Aug 2024)",
    description: "Cohere's most powerful model for enterprise applications.",
    context_length: 128000,
    pricing: { prompt: "0.000002", completion: "0.00001" }
  },
  {
    id: "cohere/command-r-08-2024",
    name: "Command R (Aug 2024)",
    description: "Cohere's balanced model for RAG and tool use.",
    context_length: 128000,
    pricing: { prompt: "0.000000145", completion: "0.000000585" }
  },
  {
    id: "cohere/command-a",
    name: "Command A",
    description: "Cohere's agentic model for complex business automation.",
    context_length: 256000,
    pricing: { prompt: "0.0000025", completion: "0.00001" }
  },
  {
    id: "perplexity/sonar-pro",
    name: "Sonar Pro",
    description: "Perplexity's advanced search-grounded model with citations.",
    context_length: 200000,
    pricing: { prompt: "0.000003", completion: "0.000015", request: "0.005" }
  },
  {
    id: "perplexity/sonar",
    name: "Sonar",
    description: "Perplexity's fast search-powered model for real-time information.",
    context_length: 128000,
    pricing: { prompt: "0.000001", completion: "0.000001", request: "0.005" }
  },
  {
    id: "perplexity/sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    description: "Perplexity's reasoning model with extended thinking for complex searches.",
    context_length: 128000,
    pricing: { prompt: "0.000002", completion: "0.000008", request: "0.005" }
  },
  {
    id: "perplexity/sonar-reasoning",
    name: "Sonar Reasoning",
    description: "Fast reasoning model from Perplexity for quick research tasks.",
    context_length: 128000,
    pricing: { prompt: "0.000001", completion: "0.000005", request: "0.005" }
  },
  {
    id: "perplexity/sonar-deep-research",
    name: "Sonar Deep Research",
    description: "Perplexity's agentic model for comprehensive multi-step research.",
    context_length: 128000,
    pricing: { prompt: "0.000002", completion: "0.000008", request: "0.005" }
  },
  {
    id: "nvidia/llama-3.1-nemotron-70b-instruct",
    name: "Nemotron 70B Instruct",
    description: "NVIDIA's fine-tuned Llama 3.1 70B for enhanced helpfulness.",
    context_length: 131072,
    pricing: { prompt: "0.00000012", completion: "0.0000003" }
  },
  {
    id: "nvidia/llama-3.1-nemotron-nano-8b-v1:free",
    name: "Nemotron Nano 8B (Free)",
    description: "Compact model from NVIDIA optimized for efficient inference.",
    context_length: 131072,
    pricing: { prompt: "0", completion: "0" }
  },
  {
    id: "microsoft/phi-4",
    name: "Phi-4",
    description: "Microsoft's 14B parameter model with strong reasoning capabilities.",
    context_length: 16384,
    pricing: { prompt: "0.00000007", completion: "0.00000014" }
  },
  {
    id: "microsoft/phi-4-multimodal-instruct",
    name: "Phi-4 Multimodal",
    description: "Multimodal variant of Phi-4 with image understanding.",
    context_length: 131072,
    pricing: { prompt: "0.00000007", completion: "0.00000014", image: "0.000052" }
  },
  {
    id: "microsoft/mai-ds-r1:free",
    name: "MAI-DS-R1 (Free)",
    description: "Microsoft's distilled reasoning model based on DeepSeek R1.",
    context_length: 163840,
    pricing: { prompt: "0", completion: "0" }
  },
  {
    id: "amazon/nova-pro-v1",
    name: "Amazon Nova Pro",
    description: "Amazon's balanced multimodal model for diverse enterprise tasks.",
    context_length: 300000,
    pricing: { prompt: "0.0000008", completion: "0.0000032", image: "0.0012" }
  },
  {
    id: "amazon/nova-lite-v1",
    name: "Amazon Nova Lite",
    description: "Cost-efficient multimodal model from Amazon for high-volume tasks.",
    context_length: 300000,
    pricing: { prompt: "0.00000006", completion: "0.00000024", image: "0.00009" }
  },
  {
    id: "amazon/nova-micro-v1",
    name: "Amazon Nova Micro",
    description: "Amazon's fastest text-only model for latency-sensitive applications.",
    context_length: 128000,
    pricing: { prompt: "0.000000035", completion: "0.00000014" }
  }
];

async function seedModels() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  console.log("Seeding models to database...");
  console.log(`Using API endpoint: ${baseUrl}/api/models`);
  
  try {
    const response = await fetch(`${baseUrl}/api/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ models: MODELS_DATA }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to seed models: ${error}`);
    }
    
    const result = await response.json();
    console.log("✓ Successfully seeded models:", result);
  } catch (error) {
    console.error("Error seeding models:", error);
    process.exit(1);
  }
}

seedModels();

