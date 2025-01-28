# deepseek-cli 🤖

🐋 **A lightweight CLI tool for interacting with the DeepSeek API**

Deepseek-CLI is a modern and easy-to-use command-line interface for interacting with the DeepSeek AI. Whether you need answers to your questions or want to configure your AI experience, this tool brings the power of DeepSeek to your terminal.

## 📑 Table of Contents

- [Features](#-features)
  - [Simple & Intuitive Commands](#-simple--intuitive-commands)
  - [AI Interaction](#-ai-interaction)
  - [Advanced Configuration](#️-advanced-configuration)
- [Quick Start](#-quick-start)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Ask Questions](#ask-questions)
- [Commands](#-commands)
  - [Ask](#ask)
  - [Config](#config)
  - [Chat (Coming Soon)](#chat-coming-soon)
- [Development & Contribution](#-development--contribution)
- [License](#-license)
- [Support](#-support)

---

## ✨ **Features**

### 🎯 **Simple & Intuitive Commands**

- Use `deepseek` or its shorter alias `ds`.
- Interactive prompts for enhanced usability.
- Beautifully styled CLI output with spinners and colors.

### 💬 **AI Interaction**

- Directly ask questions to DeepSeek AI.
- Engage in interactive chat mode.
- Supports both `deepseek-chat` and `deepseek-reasoner` models.

### ⚙️ **Advanced Configuration**

- Fully customizable API settings.
- Choose your preferred AI model (`deepseek-chat`, `deepseek-reasoner`).
- Adjustable parameters:
  - **Temperature:** Control creativity (range: 0.0 to 1.0).
  - **Max Tokens:** Define response length (default: 4000).
  - **System Prompt:** Set the system context.
  - **Base URL:** Customize the API endpoint.
  - **API Key Management:** Securely manage your credentials.

---

## 🚀 **Quick Start**

### Installation

Install Deepseek-CLI globally using npm:

```bash
npm install -g deepseek-cli
```

### Configuration

Set up your API settings:

```bash
deepseek config
```

### Ask Questions

Start querying DeepSeek AI:

```bash
deepseek ask "What is quantum computing?"
# or use shorthand syntax
deepseek "What is quantum computing?"
```

Or use the shorter alias:

```bash
ds ask "What is quantum computing?"
# or use shorthand syntax
ds "What is quantum computing?"
```

---

## 📖 **Commands**

### **Ask (**`** or **`**)**

Submit a question to DeepSeek AI and receive an intelligent response.

```bash
deepseek ask "What is quantum computing?"
```

### **Config (**`** or **`**)**

Configure your DeepSeek settings, including API key and model preferences.

```bash
deepseek config
```

### **Chat (**`** or **`**)** (Coming Soon)

Initiate an interactive chat session with DeepSeek AI.

```bash
deepseek chat
```

---

## 🛠 **Development & Contribution**

We welcome contributions to improve Deepseek-CLI! Here's how you can get started:

1. **Fork the Repository:**

   - Click the "Fork" button at the top of this page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/deepseek-cli.git
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes** and Commit:

   ```bash
   git commit -m "Add a detailed description of your changes."
   ```

5. **Push Your Changes:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request:**

   - Navigate to your forked repository on GitHub and click "New Pull Request."

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this software.

---

## 📞 **Support**

For issues or feature requests, please open an [issue](https://github.com/your-repository/deepseek-cli/issues). We'd love to hear your feedback!
